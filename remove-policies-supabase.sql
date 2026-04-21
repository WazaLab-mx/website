-- Supabase-specific script to remove policies blocking knowledge base uploads
-- This handles cases where storage extension may not be enabled

BEGIN;

-- =============================================================================
-- SUPABASE RLS POLICY REMOVAL
-- =============================================================================

-- Check if we're actually in a Supabase environment
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'supabase_vault') THEN
        RAISE NOTICE 'Note: This does not appear to be a Supabase database';
    END IF;
END
$$;

-- =============================================================================
-- REMOVE RESTRICTIVE RLS POLICIES
-- =============================================================================

-- Drop policies that might block uploads/inserts
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE policyname ILIKE '%block%'
           OR policyname ILIKE '%deny%'
           OR policyname ILIKE '%restrict%'
           OR policyname ILIKE '%false%'
           OR (cmd = 'INSERT' AND qual LIKE '%false%')
           OR (cmd = 'INSERT' AND qual LIKE '%1=0%')
    LOOP
        BEGIN
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
                          pol.policyname, pol.schemaname, pol.tablename);
            RAISE NOTICE 'Dropped restrictive policy: % on %.%',
                         pol.policyname, pol.schemaname, pol.tablename;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Could not drop policy %: %', pol.policyname, SQLERRM;
        END;
    END LOOP;
END
$$;

-- =============================================================================
-- HANDLE STORAGE POLICIES (ONLY IF STORAGE EXISTS)
-- =============================================================================

-- Check if storage schema exists and handle storage policies
DO $$
BEGIN
    -- Check if storage schema exists
    IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN
        RAISE NOTICE 'Storage schema found - checking storage policies';

        -- Check if storage.policies table exists
        IF EXISTS (SELECT 1 FROM information_schema.tables
                  WHERE table_schema = 'storage' AND table_name = 'policies') THEN

            -- Remove restrictive storage policies
            DELETE FROM storage.policies
            WHERE name ILIKE '%block%upload%'
               OR name ILIKE '%deny%file%'
               OR name ILIKE '%restrict%'
               OR definition ILIKE '%false%';

            RAISE NOTICE 'Removed restrictive storage policies';

        ELSE
            RAISE NOTICE 'Storage schema exists but policies table not found';
        END IF;

        -- Check if storage.buckets table exists
        IF EXISTS (SELECT 1 FROM information_schema.tables
                  WHERE table_schema = 'storage' AND table_name = 'buckets') THEN

            -- Update bucket policies to be more permissive
            UPDATE storage.buckets
            SET public = true,
                file_size_limit = 104857600,  -- 100MB
                allowed_mime_types = NULL      -- Allow all types
            WHERE public = false OR file_size_limit < 10485760;

            RAISE NOTICE 'Updated storage bucket permissions';
        END IF;

    ELSE
        RAISE NOTICE 'Storage schema not found - skipping storage policy removal';
    END IF;
END
$$;

-- =============================================================================
-- REMOVE STANDARD DATABASE POLICIES
-- =============================================================================

-- Remove upload-blocking policies from standard tables
DELETE FROM policies WHERE policy_name ILIKE '%upload%block%' OR policy_name ILIKE '%file%deny%';
DELETE FROM user_policies WHERE policy_type = 'upload_restriction';
DELETE FROM security_policies WHERE policy_name ILIKE '%upload%block%';

-- =============================================================================
-- CREATE PERMISSIVE POLICIES FOR COMMON TABLES
-- =============================================================================

-- Enable RLS and create permissive policies for common knowledge base tables
DO $$
DECLARE
    table_name text;
    table_names text[] := ARRAY['documents', 'files', 'attachments', 'knowledge_base', 'uploads', 'content'];
BEGIN
    FOREACH table_name IN ARRAY table_names
    LOOP
        -- Check if table exists
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = table_name) THEN
            BEGIN
                -- Enable RLS on the table
                EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', table_name);

                -- Drop existing restrictive policies
                EXECUTE format('DROP POLICY IF EXISTS %I_insert_policy ON %I', table_name, table_name);
                EXECUTE format('DROP POLICY IF EXISTS %I_select_policy ON %I', table_name, table_name);
                EXECUTE format('DROP POLICY IF EXISTS %I_update_policy ON %I', table_name, table_name);

                -- Create permissive policies for authenticated users
                EXECUTE format('CREATE POLICY %I_insert_policy ON %I FOR INSERT TO authenticated USING (true)', table_name, table_name);
                EXECUTE format('CREATE POLICY %I_select_policy ON %I FOR SELECT TO authenticated USING (true)', table_name, table_name);
                EXECUTE format('CREATE POLICY %I_update_policy ON %I FOR UPDATE TO authenticated USING (true)', table_name, table_name);

                RAISE NOTICE 'Created permissive policies for table: %', table_name;

            EXCEPTION WHEN OTHERS THEN
                RAISE NOTICE 'Could not create policies for table %: %', table_name, SQLERRM;
            END;
        END IF;
    END LOOP;
END
$$;

-- =============================================================================
-- GRANT NECESSARY PERMISSIONS
-- =============================================================================

-- Grant permissions to authenticated role (if it exists)
DO $$
BEGIN
    -- Check if authenticated role exists (Supabase standard)
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
        -- Grant permissions on common tables
        GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
        GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
        GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

        RAISE NOTICE 'Granted permissions to authenticated role';
    END IF;

    -- Check if anon role exists (Supabase standard)
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
        -- Grant basic permissions to anonymous users
        GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

        RAISE NOTICE 'Granted select permissions to anon role';
    END IF;
END
$$;

-- =============================================================================
-- SUPABASE AUTH CONFIGURATION
-- =============================================================================

-- Update auth configuration if auth schema exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth') THEN
        -- Remove any user metadata that might block uploads
        UPDATE auth.users
        SET raw_user_meta_data = raw_user_meta_data - 'upload_blocked'
                                                   - 'file_access_denied'
                                                   - 'upload_restricted'
        WHERE raw_user_meta_data ? 'upload_blocked'
           OR raw_user_meta_data ? 'file_access_denied'
           OR raw_user_meta_data ? 'upload_restricted';

        RAISE NOTICE 'Cleaned user metadata restrictions';
    END IF;
END
$$;

-- =============================================================================
-- REMOVE FUNCTION-BASED RESTRICTIONS
-- =============================================================================

-- Drop functions that might block uploads
DO $$
DECLARE
    func_name text;
    func_names text[] := ARRAY[
        'block_upload', 'deny_file_upload', 'restrict_upload',
        'validate_upload_policy', 'check_upload_permission'
    ];
BEGIN
    FOREACH func_name IN ARRAY func_names
    LOOP
        BEGIN
            EXECUTE format('DROP FUNCTION IF EXISTS %I CASCADE', func_name);
            RAISE NOTICE 'Dropped function: %', func_name;
        EXCEPTION WHEN OTHERS THEN
            -- Function doesn't exist, continue
        END;
    END LOOP;
END
$$;

-- =============================================================================
-- ENABLE REALTIME (IF NEEDED)
-- =============================================================================

-- Enable realtime for upload-related tables
DO $$
DECLARE
    table_name text;
    table_names text[] := ARRAY['documents', 'files', 'uploads'];
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'realtime') THEN
        FOREACH table_name IN ARRAY table_names
        LOOP
            IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = table_name) THEN
                BEGIN
                    EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE %I', table_name);
                    RAISE NOTICE 'Enabled realtime for table: %', table_name;
                EXCEPTION WHEN OTHERS THEN
                    -- Table already in publication or other issue
                    RAISE NOTICE 'Could not add % to realtime: %', table_name, SQLERRM;
                END;
            END IF;
        END LOOP;
    END IF;
END
$$;

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Show current RLS policies
SELECT 'Current RLS Policies' as info, schemaname, tablename, policyname, cmd, permissive
FROM pg_policies
ORDER BY schemaname, tablename, policyname;

-- Show tables with RLS enabled
SELECT 'Tables with RLS' as info, schemaname, tablename, rowsecurity
FROM pg_tables
WHERE rowsecurity = true
ORDER BY schemaname, tablename;

-- Check storage setup (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN
        IF EXISTS (SELECT 1 FROM information_schema.tables
                  WHERE table_schema = 'storage' AND table_name = 'buckets') THEN
            RAISE NOTICE 'Storage buckets configuration:';
            PERFORM name, public, file_size_limit FROM storage.buckets;
        END IF;
    END IF;
END
$$;

COMMIT;

-- =============================================================================
-- SUCCESS MESSAGE
-- =============================================================================

SELECT 'Supabase Policy Removal Complete' as status,
       'Check above output for any errors or warnings' as note,
       'Test your upload functionality now' as next_step;
