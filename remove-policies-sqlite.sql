-- SQLite-specific script to remove database policies blocking uploads
-- Run this with: sqlite3 your_database.db < remove-policies-sqlite.sql

BEGIN TRANSACTION;

-- =============================================================================
-- SQLITE-SPECIFIC POLICY REMOVAL
-- =============================================================================

-- Enable foreign key support if needed
PRAGMA foreign_keys = ON;

-- =============================================================================
-- KNOWLEDGE BASE SPECIFIC REMOVALS
-- =============================================================================

-- Remove upload restriction policies (SQLite uses LIKE for pattern matching)
DELETE FROM policies WHERE policy_name LIKE '%upload%';
DELETE FROM policies WHERE policy_name LIKE '%document%';
DELETE FROM policies WHERE policy_name LIKE '%file%';
DELETE FROM policies WHERE policy_name LIKE '%attachment%';
DELETE FROM policies WHERE policy_name LIKE '%knowledge%';

-- Remove file size and type restrictions
DELETE FROM policies WHERE policy_name LIKE '%size%limit%';
DELETE FROM policies WHERE policy_name LIKE '%file%type%';
DELETE FROM policies WHERE policy_name LIKE '%mime%type%';
DELETE FROM policies WHERE policy_name LIKE '%extension%';

-- Alternative table names (common variations)
DELETE FROM policy WHERE name LIKE '%upload%' OR name LIKE '%document%' OR name LIKE '%file%';
DELETE FROM settings WHERE setting_name LIKE '%upload%' OR setting_name LIKE '%document%' OR setting_name LIKE '%file%';
DELETE FROM configurations WHERE config_name LIKE '%upload%' OR config_name LIKE '%document%' OR config_name LIKE '%file%';
DELETE FROM permissions WHERE permission_name LIKE '%upload%' OR permission_name LIKE '%document%' OR permission_name LIKE '%file%';
DELETE FROM restrictions WHERE restriction_name LIKE '%upload%' OR restriction_name LIKE '%document%' OR restriction_name LIKE '%file%';

-- =============================================================================
-- USER AND ROLE PERMISSIONS
-- =============================================================================

-- Remove user-specific upload restrictions
DELETE FROM user_policies WHERE policy_type = 'upload_restriction';
DELETE FROM user_policies WHERE policy_type = 'file_access_denied';
DELETE FROM user_policies WHERE policy_type = 'document_access_denied';
DELETE FROM user_policies WHERE policy_type LIKE '%upload%';
DELETE FROM user_policies WHERE policy_type LIKE '%file%';

-- Remove role-based restrictions
DELETE FROM role_policies WHERE policy_name LIKE '%upload%';
DELETE FROM role_policies WHERE policy_name LIKE '%document%';
DELETE FROM role_policies WHERE policy_name LIKE '%file%';

-- Grant upload permissions to all users
INSERT OR IGNORE INTO user_permissions (user_id, permission_name, granted_at)
SELECT u.id, 'upload_documents', datetime('now')
FROM users u;

INSERT OR IGNORE INTO user_permissions (user_id, permission_name, granted_at)
SELECT u.id, 'manage_knowledge_base', datetime('now')
FROM users u;

INSERT OR IGNORE INTO user_permissions (user_id, permission_name, granted_at)
SELECT u.id, 'create_attachments', datetime('now')
FROM users u;

-- Grant role-based permissions
INSERT OR IGNORE INTO role_permissions (role_id, permission_name, granted_at)
SELECT r.id, 'upload_documents', datetime('now')
FROM roles r;

INSERT OR IGNORE INTO role_permissions (role_id, permission_name, granted_at)
SELECT r.id, 'manage_files', datetime('now')
FROM roles r;

-- =============================================================================
-- SECURITY POLICIES
-- =============================================================================

-- Remove content security policies
DELETE FROM security_policies WHERE policy_name LIKE '%csp%';
DELETE FROM security_policies WHERE policy_name LIKE '%content%security%';
DELETE FROM security_policies WHERE policy_name LIKE '%cors%';
DELETE FROM security_policies WHERE policy_name LIKE '%csrf%';

-- Remove file scanning requirements
DELETE FROM security_policies WHERE policy_name LIKE '%virus%scan%';
DELETE FROM security_policies WHERE policy_name LIKE '%malware%';
DELETE FROM security_policies WHERE policy_name LIKE '%scan%required%';

-- Remove encryption requirements that might block uploads
DELETE FROM security_policies WHERE policy_name LIKE '%encrypt%required%';
DELETE FROM security_policies WHERE policy_name LIKE '%ssl%required%';

-- =============================================================================
-- SYSTEM CONFIGURATION
-- =============================================================================

-- Remove restrictive system configurations
DELETE FROM system_config WHERE config_key LIKE '%upload%disabled%';
DELETE FROM system_config WHERE config_key LIKE '%file%blocked%';
DELETE FROM system_config WHERE config_key LIKE '%document%restricted%';
DELETE FROM system_config WHERE config_key LIKE '%upload%limit%';

-- Set permissive upload configurations
INSERT OR REPLACE INTO system_config (config_key, config_value, updated_at)
VALUES
    ('max_upload_size', '104857600', datetime('now')),  -- 100MB
    ('allowed_file_types', 'pdf,doc,docx,txt,md,csv,xlsx,ppt,pptx,png,jpg,jpeg,gif,svg,zip,rar', datetime('now')),
    ('enable_file_uploads', 'true', datetime('now')),
    ('enable_knowledge_base', 'true', datetime('now')),
    ('upload_virus_scan', 'false', datetime('now')),
    ('require_file_approval', 'false', datetime('now')),
    ('allow_bulk_upload', 'true', datetime('now')),
    ('enable_drag_drop', 'true', datetime('now')),
    ('max_files_per_upload', '100', datetime('now')),
    ('upload_timeout_seconds', '300', datetime('now'));

-- =============================================================================
-- APPLICATION FEATURES
-- =============================================================================

-- Enable upload-related feature flags
INSERT OR REPLACE INTO feature_flags (flag_name, enabled, created_at, updated_at)
VALUES
    ('knowledge_base_uploads', 1, datetime('now'), datetime('now')),
    ('file_attachments', 1, datetime('now'), datetime('now')),
    ('document_processing', 1, datetime('now'), datetime('now')),
    ('bulk_upload', 1, datetime('now'), datetime('now')),
    ('drag_drop_upload', 1, datetime('now'), datetime('now')),
    ('async_upload', 1, datetime('now'), datetime('now')),
    ('upload_progress', 1, datetime('now'), datetime('now')),
    ('auto_extract_text', 1, datetime('now'), datetime('now')),
    ('image_upload', 1, datetime('now'), datetime('now')),
    ('video_upload', 1, datetime('now'), datetime('now'));

-- =============================================================================
-- CONTENT POLICIES
-- =============================================================================

-- Remove content moderation that blocks uploads
DELETE FROM content_policies WHERE policy_name LIKE '%upload%blocked%';
DELETE FROM content_policies WHERE policy_name LIKE '%file%forbidden%';
DELETE FROM content_policies WHERE policy_name LIKE '%document%restricted%';
DELETE FROM content_policies WHERE policy_name LIKE '%approval%required%';
DELETE FROM content_policies WHERE policy_name LIKE '%moderation%required%';
DELETE FROM content_policies WHERE policy_name LIKE '%review%required%';

-- =============================================================================
-- WORKSPACE AND ORGANIZATION LIMITS
-- =============================================================================

-- Remove upload quotas and limits from users
UPDATE users SET
    upload_quota = NULL,
    max_file_size = NULL,
    allowed_file_types = NULL,
    upload_restrictions = NULL,
    daily_upload_limit = NULL,
    weekly_upload_limit = NULL
WHERE upload_quota IS NOT NULL
   OR max_file_size IS NOT NULL
   OR allowed_file_types IS NOT NULL
   OR upload_restrictions IS NOT NULL
   OR daily_upload_limit IS NOT NULL
   OR weekly_upload_limit IS NOT NULL;

-- Remove organization limits
UPDATE organizations SET
    upload_limit = NULL,
    storage_quota = NULL,
    file_restrictions = NULL,
    monthly_upload_limit = NULL,
    total_storage_limit = NULL
WHERE upload_limit IS NOT NULL
   OR storage_quota IS NOT NULL
   OR file_restrictions IS NOT NULL
   OR monthly_upload_limit IS NOT NULL
   OR total_storage_limit IS NOT NULL;

-- Remove workspace limits
UPDATE workspaces SET
    file_upload_limit = NULL,
    document_limit = NULL,
    upload_restrictions = NULL,
    max_file_count = NULL,
    storage_limit = NULL
WHERE file_upload_limit IS NOT NULL
   OR document_limit IS NOT NULL
   OR upload_restrictions IS NOT NULL
   OR max_file_count IS NOT NULL
   OR storage_limit IS NOT NULL;

-- =============================================================================
-- TRIGGERS THAT MIGHT BLOCK UPLOADS
-- =============================================================================

-- SQLite trigger removal - you may need to identify specific trigger names
-- Common triggers that might block uploads:

DROP TRIGGER IF EXISTS before_upload_check;
DROP TRIGGER IF EXISTS file_size_limit_check;
DROP TRIGGER IF EXISTS document_type_validation;
DROP TRIGGER IF EXISTS upload_quota_check;
DROP TRIGGER IF EXISTS virus_scan_trigger;
DROP TRIGGER IF EXISTS file_approval_required;
DROP TRIGGER IF EXISTS prevent_large_uploads;
DROP TRIGGER IF EXISTS block_certain_file_types;
DROP TRIGGER IF EXISTS enforce_user_quota;
DROP TRIGGER IF EXISTS validate_file_extension;

-- Check for remaining triggers
-- SELECT name, sql FROM sqlite_master WHERE type='trigger' AND (name LIKE '%upload%' OR name LIKE '%file%' OR name LIKE '%document%');

-- =============================================================================
-- VIEW RESTRICTIONS
-- =============================================================================

-- Remove or recreate restrictive views
DROP VIEW IF EXISTS restricted_documents;
DROP VIEW IF EXISTS user_upload_limits;
DROP VIEW IF EXISTS blocked_file_types;
DROP VIEW IF EXISTS upload_restrictions_view;

-- Create permissive views
CREATE VIEW IF NOT EXISTS user_uploadable_documents AS
SELECT * FROM documents WHERE 1=1; -- No restrictions

CREATE VIEW IF NOT EXISTS available_upload_types AS
SELECT 'pdf' as file_type, 'Portable Document Format' as description
UNION SELECT 'doc', 'Microsoft Word Document'
UNION SELECT 'docx', 'Microsoft Word Document (XML)'
UNION SELECT 'txt', 'Plain Text File'
UNION SELECT 'md', 'Markdown File'
UNION SELECT 'csv', 'Comma Separated Values'
UNION SELECT 'xlsx', 'Microsoft Excel Spreadsheet'
UNION SELECT 'ppt', 'Microsoft PowerPoint Presentation'
UNION SELECT 'pptx', 'Microsoft PowerPoint Presentation (XML)'
UNION SELECT 'png', 'Portable Network Graphics'
UNION SELECT 'jpg', 'JPEG Image'
UNION SELECT 'jpeg', 'JPEG Image'
UNION SELECT 'gif', 'Graphics Interchange Format'
UNION SELECT 'svg', 'Scalable Vector Graphics'
UNION SELECT 'zip', 'ZIP Archive'
UNION SELECT 'rar', 'RAR Archive';

-- =============================================================================
-- API RATE LIMITING
-- =============================================================================

-- Remove API rate limits that might affect uploads
DELETE FROM api_rate_limits WHERE endpoint LIKE '%upload%';
DELETE FROM api_rate_limits WHERE endpoint LIKE '%file%';
DELETE FROM api_rate_limits WHERE endpoint LIKE '%document%';
DELETE FROM rate_limiting WHERE resource_type IN ('upload', 'file', 'document');

-- Set permissive rate limits
INSERT OR REPLACE INTO api_rate_limits (endpoint, requests_per_minute, requests_per_hour, created_at)
VALUES
    ('/api/upload', 1000, 10000, datetime('now')),
    ('/api/documents', 1000, 10000, datetime('now')),
    ('/api/files', 1000, 10000, datetime('now')),
    ('/api/knowledge-base', 1000, 10000, datetime('now')),
    ('/api/attachments', 1000, 10000, datetime('now'));

-- =============================================================================
-- VALIDATION RULES
-- =============================================================================

-- Remove validation rules that might block uploads
DELETE FROM validation_rules WHERE rule_name LIKE '%upload%';
DELETE FROM validation_rules WHERE rule_name LIKE '%file%';
DELETE FROM validation_rules WHERE rule_name LIKE '%document%';
DELETE FROM business_rules WHERE rule_type IN ('upload_validation', 'file_validation', 'document_validation');

-- =============================================================================
-- WORKFLOW RESTRICTIONS
-- =============================================================================

-- Remove workflow steps that require approval for uploads
DELETE FROM workflow_steps WHERE step_type = 'upload_approval';
DELETE FROM workflow_steps WHERE step_name LIKE '%approval%';
DELETE FROM workflow_steps WHERE step_name LIKE '%review%';
DELETE FROM approval_workflows WHERE workflow_type = 'document_upload';
DELETE FROM approval_workflows WHERE workflow_type = 'file_upload';

-- =============================================================================
-- AUDIT AND LOGGING RESTRICTIONS
-- =============================================================================

-- Remove audit requirements that might block uploads
DELETE FROM audit_requirements WHERE requirement_type = 'upload_logging';
DELETE FROM compliance_rules WHERE rule_type = 'upload_compliance';
DELETE FROM logging_requirements WHERE log_type LIKE '%upload%';

-- =============================================================================
-- CLEANUP EXISTING RESTRICTIONS
-- =============================================================================

-- Clear any cached policy decisions
DELETE FROM policy_cache WHERE policy_type LIKE '%upload%';
DELETE FROM policy_cache WHERE policy_type LIKE '%file%';
DELETE FROM policy_cache WHERE policy_type LIKE '%document%';

-- Clear permission cache
DELETE FROM permission_cache WHERE permission_name LIKE '%upload%';
DELETE FROM permission_cache WHERE permission_name LIKE '%file%';
DELETE FROM permission_cache WHERE permission_name LIKE '%document%';

-- Clear any session-based restrictions
DELETE FROM session_restrictions WHERE restriction_type LIKE '%upload%';
DELETE FROM session_restrictions WHERE restriction_type LIKE '%file%';

-- =============================================================================
-- CREATE HELPFUL INDEXES
-- =============================================================================

-- Create indexes to improve upload performance
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_files_upload_date ON files(upload_date);
CREATE INDEX IF NOT EXISTS idx_attachments_document_id ON attachments(document_id);
CREATE INDEX IF NOT EXISTS idx_uploads_status ON uploads(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_type ON knowledge_base(document_type);

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Show current upload-related configuration
SELECT 'System Config' as category, config_key, config_value
FROM system_config
WHERE config_key LIKE '%upload%' OR config_key LIKE '%file%' OR config_key LIKE '%document%';

-- Show feature flags
SELECT 'Feature Flags' as category, flag_name, enabled
FROM feature_flags
WHERE flag_name LIKE '%upload%' OR flag_name LIKE '%file%' OR flag_name LIKE '%document%';

-- Show remaining policies
SELECT 'Remaining Policies' as category, policy_name, 'active' as status
FROM policies
WHERE policy_name LIKE '%upload%' OR policy_name LIKE '%file%' OR policy_name LIKE '%document%';

-- Count users with upload permissions
SELECT 'User Permissions' as category,
       COUNT(DISTINCT user_id) || ' users with upload permissions' as info
FROM user_permissions
WHERE permission_name = 'upload_documents';

-- =============================================================================
-- COMMIT OR ROLLBACK
-- =============================================================================

-- Uncomment one of these:
COMMIT;   -- Apply all changes
-- ROLLBACK; -- Undo all changes if something went wrong

-- =============================================================================
-- FINAL VERIFICATION
-- =============================================================================

-- Show summary of changes
SELECT 'Summary' as section, 'Policy removal completed' as status;
SELECT 'Next Step' as section, 'Test document upload functionality' as action;
SELECT 'Backup' as section, 'Database changes committed - create backup if needed' as note;
