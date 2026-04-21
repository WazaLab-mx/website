-- Supabase Policy Check - Safe diagnostic script
-- This identifies upload restrictions without making any changes

-- =============================================================================
-- BASIC SUPABASE ENVIRONMENT CHECK
-- =============================================================================

-- Check if this is a Supabase database
SELECT 'Database Type' as check_type,
       CASE
           WHEN EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'supabase_vault') THEN 'Supabase'
           ELSE 'Standard PostgreSQL'
       END as result;

-- =============================================================================
-- RLS POLICY CHECK
-- =============================================================================

-- Check for potentially restrictive RLS policies
SELECT 'Restrictive RLS Policies' as check_type,
       COUNT(*) as count,
       string_agg(schemaname || '.' || tablename || '.' || policyname, ', ') as policies
FROM pg_policies
WHERE policyname ILIKE '%block%'
   OR policyname ILIKE '%deny%'
   OR policyname ILIKE '%restrict%'
   OR policyname ILIKE '%false%'
   OR (cmd = 'INSERT' AND qual LIKE '%false%')
   OR (cmd = 'INSERT' AND qual LIKE '%1=0%');

-- Show all policies on common upload tables
SELECT 'Upload Table Policies' as check_type,
       schemaname,
       tablename,
       policyname,
       cmd,
       permissive,
       roles,
       qual
FROM pg_policies
WHERE tablename IN ('documents', 'files', 'attachments', 'knowledge_base', 'uploads', 'content')
ORDER BY tablename, cmd;

-- =============================================================================
-- TABLE RLS STATUS
-- =============================================================================

-- Check which tables have RLS enabled
SELECT 'RLS Status' as check_type,
       tablename,
       CASE
           WHEN rowsecurity THEN 'RLS Enabled'
           ELSE 'RLS Disabled'
       END as status
FROM pg_tables
WHERE tablename IN ('documents', 'files', 'attachments', 'knowledge_base', 'uploads', 'content')
   AND schemaname = 'public'
ORDER BY tablename;

-- =============================================================================
-- STORAGE SCHEMA CHECK
-- =============================================================================

-- Check if storage schema exists
SELECT 'Storage Schema' as check_type,
       CASE
           WHEN EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN 'Exists'
           ELSE 'Not Found'
       END as result;

-- Check storage tables (only if storage schema exists)
SELECT 'Storage Tables' as check_type,
       CASE
           WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'storage' AND table_name = 'buckets') THEN 'Buckets table exists'
           ELSE 'Buckets table not found'
       END as buckets_status,
       CASE
           WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'storage' AND table_name = 'policies') THEN 'Policies table exists'
           ELSE 'Policies table not found'
       END as policies_status;

-- =============================================================================
-- STORAGE CONFIGURATION (SAFE CHECK)
-- =============================================================================

-- Only check storage if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'storage' AND table_name = 'buckets') THEN
        RAISE NOTICE 'Storage buckets found - checking configuration...';

        -- This will show bucket configuration if storage exists
        PERFORM 'Bucket: ' || name ||
                ', Public: ' || public::text ||
                ', Size Limit: ' || COALESCE(file_size_limit::text, 'No limit') ||
                ', File Types: ' || COALESCE(array_to_string(allowed_mime_types, ', '), 'All types allowed')
        FROM storage.buckets;

    ELSE
        RAISE NOTICE 'Storage extension not enabled or buckets table does not exist';
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Could not check storage configuration: %', SQLERRM;
END
$$;

-- =============================================================================
-- ROLES AND PERMISSIONS CHECK
-- =============================================================================

-- Check Supabase standard roles
SELECT 'Supabase Roles' as check_type,
       rolname,
       CASE
           WHEN rolcanlogin THEN 'Can Login'
           ELSE 'No Login'
       END as login_status
FROM pg_roles
WHERE rolname IN ('authenticated', 'anon', 'service_role')
ORDER BY rolname;

-- =============================================================================
-- AUTH SCHEMA CHECK
-- =============================================================================

-- Check if auth schema exists
SELECT 'Auth Schema' as check_type,
       CASE
           WHEN EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth') THEN 'Exists'
           ELSE 'Not Found'
       END as result;

-- =============================================================================
-- EXTENSION CHECK
-- =============================================================================

-- Check relevant extensions
SELECT 'Extensions' as check_type,
       extname,
       extversion
FROM pg_extension
WHERE extname IN ('supabase_vault', 'pgjwt', 'uuid-ossp', 'pgcrypto')
ORDER BY extname;

-- =============================================================================
-- FUNCTION CHECK
-- =============================================================================

-- Check for functions that might block uploads
SELECT 'Upload Blocking Functions' as check_type,
       COUNT(*) as count,
       string_agg(proname, ', ') as function_names
FROM pg_proc
WHERE proname ILIKE '%block%upload%'
   OR proname ILIKE '%deny%file%'
   OR proname ILIKE '%restrict%upload%'
   OR proname ILIKE '%validate%upload%policy%';

-- =============================================================================
-- TRIGGER CHECK
-- =============================================================================

-- Check for triggers that might interfere with uploads
SELECT 'Upload Related Triggers' as check_type,
       trigger_name,
       event_object_table,
       action_timing,
       event_manipulation
FROM information_schema.triggers
WHERE trigger_name ILIKE '%upload%'
   OR trigger_name ILIKE '%file%'
   OR trigger_name ILIKE '%document%'
   OR trigger_name ILIKE '%block%'
   OR trigger_name ILIKE '%restrict%'
ORDER BY event_object_table, trigger_name;

-- =============================================================================
-- SUMMARY AND RECOMMENDATIONS
-- =============================================================================

SELECT '=== SUMMARY ===' as section;

-- Count potential issues
WITH issue_count AS (
    SELECT COUNT(*) as restrictive_policies
    FROM pg_policies
    WHERE policyname ILIKE '%block%'
       OR policyname ILIKE '%deny%'
       OR policyname ILIKE '%restrict%'
       OR (cmd = 'INSERT' AND qual LIKE '%false%')
)
SELECT 'Potential Issues' as metric,
       CASE
           WHEN restrictive_policies > 0 THEN restrictive_policies::text || ' restrictive policies found'
           ELSE 'No obvious policy restrictions found'
       END as result
FROM issue_count;

-- Recommendations
SELECT 'Recommendations' as section,
       CASE
           WHEN EXISTS (SELECT 1 FROM pg_policies WHERE policyname ILIKE '%block%' OR policyname ILIKE '%deny%')
           THEN 'Run remove-policies-supabase.sql to remove blocking policies'
           WHEN NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage')
           THEN 'Consider enabling Supabase Storage for file uploads'
           ELSE 'No immediate policy issues detected - check application-level restrictions'
       END as action;
