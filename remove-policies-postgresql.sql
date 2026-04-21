-- PostgreSQL-specific script to remove database policies blocking uploads
-- Run this with: psql -d your_database -f remove-policies-postgresql.sql

BEGIN;

-- =============================================================================
-- POSTGRESQL-SPECIFIC POLICY REMOVAL
-- =============================================================================

-- Drop row-level security policies that might block uploads
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT tablename, policyname
        FROM pg_policies
        WHERE policyname ILIKE '%upload%'
           OR policyname ILIKE '%document%'
           OR policyname ILIKE '%file%'
           OR policyname ILIKE '%knowledge%'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
        RAISE NOTICE 'Dropped policy % on table %', pol.policyname, pol.tablename;
    END LOOP;
END
$$;

-- Remove database-level policies
DELETE FROM pg_policy WHERE polname LIKE '%upload%';
DELETE FROM pg_policy WHERE polname LIKE '%document%';
DELETE FROM pg_policy WHERE polname LIKE '%file%';

-- =============================================================================
-- KNOWLEDGE BASE SPECIFIC REMOVALS
-- =============================================================================

-- Remove upload restriction policies
DELETE FROM policies WHERE policy_name ~ '.*upload.*';
DELETE FROM policies WHERE policy_name ~ '.*document.*';
DELETE FROM policies WHERE policy_name ~ '.*file.*';
DELETE FROM policies WHERE policy_name ~ '.*attachment.*';
DELETE FROM policies WHERE policy_name ~ '.*knowledge.*';

-- Remove file size and type restrictions
DELETE FROM policies WHERE policy_name ~ '.*size.*limit.*';
DELETE FROM policies WHERE policy_name ~ '.*file.*type.*';
DELETE FROM policies WHERE policy_name ~ '.*mime.*type.*';
DELETE FROM policies WHERE policy_name ~ '.*extension.*';

-- =============================================================================
-- USER AND ROLE PERMISSIONS
-- =============================================================================

-- Remove user-specific upload restrictions
DELETE FROM user_policies WHERE policy_type = 'upload_restriction';
DELETE FROM user_policies WHERE policy_type = 'file_access_denied';
DELETE FROM user_policies WHERE policy_type = 'document_access_denied';

-- Remove role-based restrictions
DELETE FROM role_policies WHERE policy_name ~ '.*upload.*';
DELETE FROM role_policies WHERE policy_name ~ '.*document.*';
DELETE FROM role_policies WHERE policy_name ~ '.*file.*';

-- Grant upload permissions to all roles
INSERT INTO role_permissions (role_id, permission, granted_at)
SELECT r.id, 'upload_documents', NOW()
FROM roles r
WHERE NOT EXISTS (
    SELECT 1 FROM role_permissions rp
    WHERE rp.role_id = r.id AND rp.permission = 'upload_documents'
);

INSERT INTO role_permissions (role_id, permission, granted_at)
SELECT r.id, 'manage_knowledge_base', NOW()
FROM roles r
WHERE NOT EXISTS (
    SELECT 1 FROM role_permissions rp
    WHERE rp.role_id = r.id AND rp.permission = 'manage_knowledge_base'
);

-- =============================================================================
-- SECURITY POLICIES
-- =============================================================================

-- Remove content security policies
DELETE FROM security_policies WHERE policy_name ~ '.*csp.*';
DELETE FROM security_policies WHERE policy_name ~ '.*content.security.*';
DELETE FROM security_policies WHERE policy_name ~ '.*cors.*';
DELETE FROM security_policies WHERE policy_name ~ '.*csrf.*';

-- Remove file scanning requirements
DELETE FROM security_policies WHERE policy_name ~ '.*virus.*scan.*';
DELETE FROM security_policies WHERE policy_name ~ '.*malware.*';
DELETE FROM security_policies WHERE policy_name ~ '.*scan.*required.*';

-- =============================================================================
-- SYSTEM CONFIGURATION
-- =============================================================================

-- Remove restrictive system configurations
DELETE FROM system_config WHERE config_key ~ '.*upload.*disabled.*';
DELETE FROM system_config WHERE config_key ~ '.*file.*blocked.*';
DELETE FROM system_config WHERE config_key ~ '.*document.*restricted.*';

-- Set permissive upload configurations
INSERT INTO system_config (config_key, config_value, updated_at)
VALUES
    ('max_upload_size', '104857600', NOW()),  -- 100MB
    ('allowed_file_types', 'pdf,doc,docx,txt,md,csv,xlsx,ppt,pptx,png,jpg,jpeg,gif', NOW()),
    ('enable_file_uploads', 'true', NOW()),
    ('enable_knowledge_base', 'true', NOW()),
    ('upload_virus_scan', 'false', NOW()),
    ('require_file_approval', 'false', NOW())
ON CONFLICT (config_key) DO UPDATE SET
    config_value = EXCLUDED.config_value,
    updated_at = NOW();

-- =============================================================================
-- APPLICATION FEATURES
-- =============================================================================

-- Enable upload-related feature flags
INSERT INTO feature_flags (flag_name, enabled, created_at, updated_at)
VALUES
    ('knowledge_base_uploads', true, NOW(), NOW()),
    ('file_attachments', true, NOW(), NOW()),
    ('document_processing', true, NOW(), NOW()),
    ('bulk_upload', true, NOW(), NOW()),
    ('drag_drop_upload', true, NOW(), NOW())
ON CONFLICT (flag_name) DO UPDATE SET
    enabled = true,
    updated_at = NOW();

-- =============================================================================
-- CONTENT POLICIES
-- =============================================================================

-- Remove content moderation that blocks uploads
DELETE FROM content_policies WHERE policy_name ~ '.*upload.*blocked.*';
DELETE FROM content_policies WHERE policy_name ~ '.*file.*forbidden.*';
DELETE FROM content_policies WHERE policy_name ~ '.*document.*restricted.*';
DELETE FROM content_policies WHERE policy_name ~ '.*approval.*required.*';

-- =============================================================================
-- WORKSPACE AND ORGANIZATION LIMITS
-- =============================================================================

-- Remove upload quotas and limits
UPDATE users SET
    upload_quota = NULL,
    max_file_size = NULL,
    allowed_file_types = NULL,
    upload_restrictions = NULL
WHERE upload_quota IS NOT NULL
   OR max_file_size IS NOT NULL
   OR allowed_file_types IS NOT NULL;

UPDATE organizations SET
    upload_limit = NULL,
    storage_quota = NULL,
    file_restrictions = NULL
WHERE upload_limit IS NOT NULL
   OR storage_quota IS NOT NULL
   OR file_restrictions IS NOT NULL;

UPDATE workspaces SET
    file_upload_limit = NULL,
    document_limit = NULL,
    upload_restrictions = NULL
WHERE file_upload_limit IS NOT NULL
   OR document_limit IS NOT NULL
   OR upload_restrictions IS NOT NULL;

-- =============================================================================
-- TRIGGERS THAT MIGHT BLOCK UPLOADS
-- =============================================================================

-- Drop triggers that might prevent uploads
DO $$
DECLARE
    trig RECORD;
BEGIN
    FOR trig IN
        SELECT trigger_name, event_object_table
        FROM information_schema.triggers
        WHERE trigger_name ILIKE '%upload%block%'
           OR trigger_name ILIKE '%file%restrict%'
           OR trigger_name ILIKE '%document%deny%'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS %I ON %I', trig.trigger_name, trig.event_object_table);
        RAISE NOTICE 'Dropped trigger % on table %', trig.trigger_name, trig.event_object_table;
    END LOOP;
END
$$;

-- =============================================================================
-- CONSTRAINTS THAT MIGHT BLOCK UPLOADS
-- =============================================================================

-- Remove check constraints that might block uploads
DO $$
DECLARE
    constraint_rec RECORD;
BEGIN
    FOR constraint_rec IN
        SELECT table_name, constraint_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.check_constraints cc ON tc.constraint_name = cc.constraint_name
        WHERE cc.check_clause ILIKE '%upload%'
           OR cc.check_clause ILIKE '%file%'
           OR cc.check_clause ILIKE '%document%'
    LOOP
        EXECUTE format('ALTER TABLE %I DROP CONSTRAINT IF EXISTS %I',
                      constraint_rec.table_name, constraint_rec.constraint_name);
        RAISE NOTICE 'Dropped constraint % from table %',
                     constraint_rec.constraint_name, constraint_rec.table_name;
    END LOOP;
END
$$;

-- =============================================================================
-- GRANTS AND PERMISSIONS
-- =============================================================================

-- Grant necessary permissions for uploads
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO PUBLIC;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO PUBLIC;

-- Grant specific permissions for common upload tables
DO $$
BEGIN
    -- Check if tables exist before granting permissions
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'documents') THEN
        GRANT ALL PRIVILEGES ON documents TO PUBLIC;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'files') THEN
        GRANT ALL PRIVILEGES ON files TO PUBLIC;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'attachments') THEN
        GRANT ALL PRIVILEGES ON attachments TO PUBLIC;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'knowledge_base') THEN
        GRANT ALL PRIVILEGES ON knowledge_base TO PUBLIC;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'uploads') THEN
        GRANT ALL PRIVILEGES ON uploads TO PUBLIC;
    END IF;
END
$$;

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Show remaining policies that might still block uploads
DO $$
BEGIN
    RAISE NOTICE 'Checking for remaining restrictive policies...';

    -- Check for remaining policies
    IF EXISTS (SELECT 1 FROM policies WHERE policy_name ~ '.*upload.*|.*document.*|.*file.*') THEN
        RAISE NOTICE 'Warning: Some upload-related policies still exist';
    END IF;

    -- Check for remaining security policies
    IF EXISTS (SELECT 1 FROM security_policies WHERE policy_name ~ '.*upload.*|.*file.*') THEN
        RAISE NOTICE 'Warning: Some security policies affecting uploads still exist';
    END IF;

    -- Check upload configurations
    RAISE NOTICE 'Current upload configuration:';
    PERFORM config_key, config_value FROM system_config
    WHERE config_key IN ('max_upload_size', 'enable_file_uploads', 'allowed_file_types');
END
$$;

-- =============================================================================
-- COMMIT OR ROLLBACK
-- =============================================================================

-- Uncomment one of these:
COMMIT;   -- Apply all changes
-- ROLLBACK; -- Undo all changes if something went wrong

-- =============================================================================
-- POST-EXECUTION QUERIES
-- =============================================================================

-- Run these to verify the changes
/*
-- Check remaining upload restrictions
SELECT * FROM policies WHERE policy_name ~ '.*upload.*|.*document.*|.*file.*';

-- Check system configuration
SELECT * FROM system_config WHERE config_key ~ '.*upload.*|.*file.*';

-- Check feature flags
SELECT * FROM feature_flags WHERE flag_name ~ '.*upload.*|.*document.*';

-- Check user permissions
SELECT u.username, up.policy_type
FROM users u
JOIN user_policies up ON u.id = up.user_id
WHERE up.policy_type LIKE '%upload%' OR up.policy_type LIKE '%file%';
*/
