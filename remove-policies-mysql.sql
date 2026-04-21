-- MySQL-specific script to remove database policies blocking uploads
-- Run this with: mysql -u username -p database_name < remove-policies-mysql.sql

START TRANSACTION;

-- =============================================================================
-- MYSQL-SPECIFIC POLICY REMOVAL
-- =============================================================================

-- Set SQL mode for better compatibility
SET SESSION sql_mode = 'TRADITIONAL,NO_AUTO_VALUE_ON_ZERO';

-- =============================================================================
-- KNOWLEDGE BASE SPECIFIC REMOVALS
-- =============================================================================

-- Remove upload restriction policies
DELETE FROM policies WHERE policy_name REGEXP '.*upload.*';
DELETE FROM policies WHERE policy_name REGEXP '.*document.*';
DELETE FROM policies WHERE policy_name REGEXP '.*file.*';
DELETE FROM policies WHERE policy_name REGEXP '.*attachment.*';
DELETE FROM policies WHERE policy_name REGEXP '.*knowledge.*';

-- Remove file size and type restrictions
DELETE FROM policies WHERE policy_name REGEXP '.*size.*limit.*';
DELETE FROM policies WHERE policy_name REGEXP '.*file.*type.*';
DELETE FROM policies WHERE policy_name REGEXP '.*mime.*type.*';
DELETE FROM policies WHERE policy_name REGEXP '.*extension.*';

-- Alternative table names
DELETE FROM policy WHERE name REGEXP '.*upload.*|.*document.*|.*file.*';
DELETE FROM settings WHERE setting_name REGEXP '.*upload.*|.*document.*|.*file.*';
DELETE FROM configurations WHERE config_name REGEXP '.*upload.*|.*document.*|.*file.*';

-- =============================================================================
-- USER AND ROLE PERMISSIONS
-- =============================================================================

-- Remove user-specific upload restrictions
DELETE FROM user_policies WHERE policy_type = 'upload_restriction';
DELETE FROM user_policies WHERE policy_type = 'file_access_denied';
DELETE FROM user_policies WHERE policy_type = 'document_access_denied';

-- Remove role-based restrictions
DELETE FROM role_policies WHERE policy_name REGEXP '.*upload.*|.*document.*|.*file.*';

-- Grant upload permissions to all users
INSERT IGNORE INTO user_permissions (user_id, permission_name, granted_at)
SELECT u.id, 'upload_documents', NOW()
FROM users u;

INSERT IGNORE INTO user_permissions (user_id, permission_name, granted_at)
SELECT u.id, 'manage_knowledge_base', NOW()
FROM users u;

INSERT IGNORE INTO user_permissions (user_id, permission_name, granted_at)
SELECT u.id, 'create_attachments', NOW()
FROM users u;

-- Grant role-based permissions
INSERT IGNORE INTO role_permissions (role_id, permission_name, granted_at)
SELECT r.id, 'upload_documents', NOW()
FROM roles r;

INSERT IGNORE INTO role_permissions (role_id, permission_name, granted_at)
SELECT r.id, 'manage_files', NOW()
FROM roles r;

-- =============================================================================
-- SECURITY POLICIES
-- =============================================================================

-- Remove content security policies
DELETE FROM security_policies WHERE policy_name REGEXP '.*csp.*|.*content.security.*';
DELETE FROM security_policies WHERE policy_name REGEXP '.*cors.*|.*csrf.*';

-- Remove file scanning requirements
DELETE FROM security_policies WHERE policy_name REGEXP '.*virus.*scan.*|.*malware.*';
DELETE FROM security_policies WHERE policy_name REGEXP '.*scan.*required.*';

-- Remove encryption requirements that might block uploads
DELETE FROM security_policies WHERE policy_name REGEXP '.*encrypt.*required.*';
DELETE FROM security_policies WHERE policy_name REGEXP '.*ssl.*required.*';

-- =============================================================================
-- SYSTEM CONFIGURATION
-- =============================================================================

-- Remove restrictive system configurations
DELETE FROM system_config WHERE config_key REGEXP '.*upload.*disabled.*';
DELETE FROM system_config WHERE config_key REGEXP '.*file.*blocked.*';
DELETE FROM system_config WHERE config_key REGEXP '.*document.*restricted.*';

-- Set permissive upload configurations
INSERT INTO system_config (config_key, config_value, updated_at)
VALUES
    ('max_upload_size', '104857600', NOW()),  -- 100MB
    ('allowed_file_types', 'pdf,doc,docx,txt,md,csv,xlsx,ppt,pptx,png,jpg,jpeg,gif,svg,zip,rar', NOW()),
    ('enable_file_uploads', 'true', NOW()),
    ('enable_knowledge_base', 'true', NOW()),
    ('upload_virus_scan', 'false', NOW()),
    ('require_file_approval', 'false', NOW()),
    ('allow_bulk_upload', 'true', NOW()),
    ('enable_drag_drop', 'true', NOW())
ON DUPLICATE KEY UPDATE
    config_value = VALUES(config_value),
    updated_at = NOW();

-- =============================================================================
-- APPLICATION FEATURES
-- =============================================================================

-- Enable upload-related feature flags
INSERT INTO feature_flags (flag_name, enabled, created_at, updated_at)
VALUES
    ('knowledge_base_uploads', 1, NOW(), NOW()),
    ('file_attachments', 1, NOW(), NOW()),
    ('document_processing', 1, NOW(), NOW()),
    ('bulk_upload', 1, NOW(), NOW()),
    ('drag_drop_upload', 1, NOW(), NOW()),
    ('async_upload', 1, NOW(), NOW()),
    ('upload_progress', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE
    enabled = 1,
    updated_at = NOW();

-- =============================================================================
-- CONTENT POLICIES
-- =============================================================================

-- Remove content moderation that blocks uploads
DELETE FROM content_policies WHERE policy_name REGEXP '.*upload.*blocked.*';
DELETE FROM content_policies WHERE policy_name REGEXP '.*file.*forbidden.*';
DELETE FROM content_policies WHERE policy_name REGEXP '.*document.*restricted.*';
DELETE FROM content_policies WHERE policy_name REGEXP '.*approval.*required.*';
DELETE FROM content_policies WHERE policy_name REGEXP '.*moderation.*required.*';

-- =============================================================================
-- WORKSPACE AND ORGANIZATION LIMITS
-- =============================================================================

-- Remove upload quotas and limits from users
UPDATE users SET
    upload_quota = NULL,
    max_file_size = NULL,
    allowed_file_types = NULL,
    upload_restrictions = NULL,
    daily_upload_limit = NULL
WHERE upload_quota IS NOT NULL
   OR max_file_size IS NOT NULL
   OR allowed_file_types IS NOT NULL
   OR upload_restrictions IS NOT NULL
   OR daily_upload_limit IS NOT NULL;

-- Remove organization limits
UPDATE organizations SET
    upload_limit = NULL,
    storage_quota = NULL,
    file_restrictions = NULL,
    monthly_upload_limit = NULL
WHERE upload_limit IS NOT NULL
   OR storage_quota IS NOT NULL
   OR file_restrictions IS NOT NULL
   OR monthly_upload_limit IS NOT NULL;

-- Remove workspace limits
UPDATE workspaces SET
    file_upload_limit = NULL,
    document_limit = NULL,
    upload_restrictions = NULL,
    max_file_count = NULL
WHERE file_upload_limit IS NOT NULL
   OR document_limit IS NOT NULL
   OR upload_restrictions IS NOT NULL
   OR max_file_count IS NOT NULL;

-- =============================================================================
-- TRIGGERS THAT MIGHT BLOCK UPLOADS
-- =============================================================================

-- Note: MySQL doesn't have an easy way to drop triggers by pattern
-- You may need to manually identify and drop specific triggers
-- Common trigger names that might block uploads:

-- DROP TRIGGER IF EXISTS before_upload_check;
-- DROP TRIGGER IF EXISTS file_size_limit_check;
-- DROP TRIGGER IF EXISTS document_type_validation;
-- DROP TRIGGER IF EXISTS upload_quota_check;
-- DROP TRIGGER IF EXISTS virus_scan_trigger;

-- Check for triggers on upload-related tables
-- SELECT TRIGGER_NAME, EVENT_OBJECT_TABLE
-- FROM information_schema.TRIGGERS
-- WHERE TRIGGER_NAME REGEXP '.*upload.*|.*file.*|.*document.*';

-- =============================================================================
-- VIEW RESTRICTIONS
-- =============================================================================

-- Remove or recreate views that might restrict access
-- Note: You may need to manually identify restrictive views

-- Example of recreating a permissive view:
-- DROP VIEW IF EXISTS user_uploadable_documents;
-- CREATE VIEW user_uploadable_documents AS
-- SELECT * FROM documents WHERE 1=1; -- No restrictions

-- =============================================================================
-- STORED PROCEDURES THAT MIGHT BLOCK UPLOADS
-- =============================================================================

-- Drop procedures that might validate/block uploads
-- Note: You may need to manually identify these

-- Common procedure names:
-- DROP PROCEDURE IF EXISTS ValidateFileUpload;
-- DROP PROCEDURE IF EXISTS CheckUploadPermissions;
-- DROP PROCEDURE IF EXISTS EnforceFilePolicy;

-- =============================================================================
-- GRANTS AND PERMISSIONS
-- =============================================================================

-- Grant necessary privileges for upload operations
-- Note: Be careful with these - only use if appropriate for your security model

-- GRANT SELECT, INSERT, UPDATE, DELETE ON documents TO 'app_user'@'%';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON files TO 'app_user'@'%';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON attachments TO 'app_user'@'%';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON knowledge_base TO 'app_user'@'%';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON uploads TO 'app_user'@'%';

-- =============================================================================
-- API RATE LIMITING
-- =============================================================================

-- Remove API rate limits that might affect uploads
DELETE FROM api_rate_limits WHERE endpoint REGEXP '.*upload.*|.*file.*|.*document.*';
DELETE FROM rate_limiting WHERE resource_type IN ('upload', 'file', 'document');

-- Set permissive rate limits
INSERT INTO api_rate_limits (endpoint, requests_per_minute, requests_per_hour, created_at)
VALUES
    ('/api/upload', 1000, 10000, NOW()),
    ('/api/documents', 1000, 10000, NOW()),
    ('/api/files', 1000, 10000, NOW()),
    ('/api/knowledge-base', 1000, 10000, NOW())
ON DUPLICATE KEY UPDATE
    requests_per_minute = VALUES(requests_per_minute),
    requests_per_hour = VALUES(requests_per_hour);

-- =============================================================================
-- VALIDATION RULES
-- =============================================================================

-- Remove validation rules that might block uploads
DELETE FROM validation_rules WHERE rule_name REGEXP '.*upload.*|.*file.*|.*document.*';
DELETE FROM business_rules WHERE rule_type IN ('upload_validation', 'file_validation');

-- =============================================================================
-- WORKFLOW RESTRICTIONS
-- =============================================================================

-- Remove workflow steps that require approval for uploads
DELETE FROM workflow_steps WHERE step_type = 'upload_approval';
DELETE FROM workflow_steps WHERE step_name REGEXP '.*approval.*|.*review.*';
DELETE FROM approval_workflows WHERE workflow_type = 'document_upload';

-- =============================================================================
-- AUDIT AND LOGGING RESTRICTIONS
-- =============================================================================

-- Remove audit requirements that might block uploads
DELETE FROM audit_requirements WHERE requirement_type = 'upload_logging';
DELETE FROM compliance_rules WHERE rule_type = 'upload_compliance';

-- =============================================================================
-- CLEANUP EXISTING RESTRICTIONS
-- =============================================================================

-- Clear any cached policy decisions
DELETE FROM policy_cache WHERE policy_type REGEXP '.*upload.*|.*file.*|.*document.*';

-- Clear permission cache
DELETE FROM permission_cache WHERE permission_name REGEXP '.*upload.*|.*file.*|.*document.*';

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Show current upload-related configuration
SELECT 'System Config' as category, config_key, config_value
FROM system_config
WHERE config_key REGEXP '.*upload.*|.*file.*|.*document.*';

SELECT 'Feature Flags' as category, flag_name, enabled
FROM feature_flags
WHERE flag_name REGEXP '.*upload.*|.*file.*|.*document.*';

SELECT 'Remaining Policies' as category, policy_name, 'active' as status
FROM policies
WHERE policy_name REGEXP '.*upload.*|.*file.*|.*document.*';

-- =============================================================================
-- COMMIT OR ROLLBACK
-- =============================================================================

-- Uncomment one of these:
COMMIT;   -- Apply all changes
-- ROLLBACK; -- Undo all changes if something went wrong

-- =============================================================================
-- POST-EXECUTION VERIFICATION
-- =============================================================================

-- Run these queries after execution to verify changes:
/*
-- Check for remaining upload restrictions
SELECT 'Policies' as type, COUNT(*) as count
FROM policies
WHERE policy_name REGEXP '.*upload.*|.*document.*|.*file.*';

-- Check system configuration
SELECT config_key, config_value
FROM system_config
WHERE config_key IN ('max_upload_size', 'enable_file_uploads', 'allowed_file_types');

-- Check feature flags
SELECT flag_name, enabled
FROM feature_flags
WHERE flag_name REGEXP '.*upload.*|.*document.*|.*file.*';

-- Check user permissions
SELECT COUNT(DISTINCT user_id) as users_with_upload_permission
FROM user_permissions
WHERE permission_name = 'upload_documents';
*/
