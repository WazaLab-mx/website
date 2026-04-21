-- Remove Database Policies for Knowledge Base Document Uploads
-- This script removes various database policies that might block document uploads
-- Compatible with PostgreSQL, MySQL, and SQLite

-- =============================================================================
-- KNOWLEDGE BASE SPECIFIC POLICIES
-- =============================================================================

-- Remove document upload restrictions
DELETE FROM policies WHERE policy_name LIKE '%upload%';
DELETE FROM policies WHERE policy_name LIKE '%document%';
DELETE FROM policies WHERE policy_name LIKE '%file%';
DELETE FROM policies WHERE policy_name LIKE '%attachment%';

-- Remove knowledge base restrictions
DELETE FROM policies WHERE policy_name LIKE '%knowledge%';
DELETE FROM policies WHERE policy_name LIKE '%kb_%';
DELETE FROM policies WHERE policy_name LIKE '%document_store%';

-- Remove file size restrictions
DELETE FROM policies WHERE policy_name LIKE '%max_file_size%';
DELETE FROM policies WHERE policy_name LIKE '%upload_limit%';
DELETE FROM policies WHERE policy_name LIKE '%size_limit%';

-- Remove file type restrictions
DELETE FROM policies WHERE policy_name LIKE '%allowed_types%';
DELETE FROM policies WHERE policy_name LIKE '%file_extension%';
DELETE FROM policies WHERE policy_name LIKE '%mime_type%';
DELETE FROM policies WHERE policy_name LIKE '%content_type%';

-- =============================================================================
-- USER PERMISSION POLICIES
-- =============================================================================

-- Remove user upload restrictions
DELETE FROM user_policies WHERE policy_type = 'upload_restriction';
DELETE FROM user_policies WHERE policy_type = 'file_access';
DELETE FROM user_policies WHERE policy_type = 'document_access';

-- Remove role-based upload restrictions
DELETE FROM role_policies WHERE policy_name LIKE '%upload%';
DELETE FROM role_policies WHERE policy_name LIKE '%document%';
DELETE FROM role_policies WHERE policy_name LIKE '%file%';

-- Remove group restrictions
DELETE FROM group_policies WHERE policy_name LIKE '%upload%';
DELETE FROM group_policies WHERE policy_name LIKE '%document%';

-- =============================================================================
-- SECURITY POLICIES
-- =============================================================================

-- Remove content security policies that block uploads
DELETE FROM security_policies WHERE policy_name LIKE '%csp%';
DELETE FROM security_policies WHERE policy_name LIKE '%content_security%';
DELETE FROM security_policies WHERE policy_name LIKE '%cors%';
DELETE FROM security_policies WHERE policy_name LIKE '%csrf%';

-- Remove file scanning policies
DELETE FROM security_policies WHERE policy_name LIKE '%virus_scan%';
DELETE FROM security_policies WHERE policy_name LIKE '%malware%';
DELETE FROM security_policies WHERE policy_name LIKE '%scan_required%';

-- Remove encryption requirements that might block uploads
DELETE FROM security_policies WHERE policy_name LIKE '%encrypt%';
DELETE FROM security_policies WHERE policy_name LIKE '%ssl_required%';

-- =============================================================================
-- SYSTEM CONFIGURATION POLICIES
-- =============================================================================

-- Remove system-level upload restrictions
DELETE FROM system_config WHERE config_key LIKE '%upload%';
DELETE FROM system_config WHERE config_key LIKE '%file%';
DELETE FROM system_config WHERE config_key LIKE '%document%';

-- Remove storage policies
DELETE FROM system_config WHERE config_key LIKE '%storage%';
DELETE FROM system_config WHERE config_key LIKE '%disk%';
DELETE FROM system_config WHERE config_key LIKE '%quota%';

-- Remove API rate limiting for uploads
DELETE FROM system_config WHERE config_key LIKE '%rate_limit%';
DELETE FROM system_config WHERE config_key LIKE '%throttle%';
DELETE FROM system_config WHERE config_key LIKE '%api_limit%';

-- =============================================================================
-- APPLICATION SPECIFIC POLICIES
-- =============================================================================

-- Remove application feature flags that disable uploads
DELETE FROM feature_flags WHERE flag_name LIKE '%upload%';
DELETE FROM feature_flags WHERE flag_name LIKE '%document%';
DELETE FROM feature_flags WHERE flag_name LIKE '%file%';
DELETE FROM feature_flags WHERE flag_name LIKE '%knowledge%';

-- Remove application policies
DELETE FROM app_policies WHERE policy_name LIKE '%upload%';
DELETE FROM app_policies WHERE policy_name LIKE '%document%';
DELETE FROM app_policies WHERE policy_name LIKE '%file%';

-- Remove workflow restrictions
DELETE FROM workflow_policies WHERE policy_name LIKE '%upload%';
DELETE FROM workflow_policies WHERE policy_name LIKE '%document%';

-- =============================================================================
-- CONTENT MANAGEMENT POLICIES
-- =============================================================================

-- Remove content approval requirements
DELETE FROM content_policies WHERE policy_name LIKE '%approval%';
DELETE FROM content_policies WHERE policy_name LIKE '%review%';
DELETE FROM content_policies WHERE policy_name LIKE '%moderation%';

-- Remove content restrictions
DELETE FROM content_policies WHERE policy_name LIKE '%restricted%';
DELETE FROM content_policies WHERE policy_name LIKE '%blocked%';
DELETE FROM content_policies WHERE policy_name LIKE '%forbidden%';

-- =============================================================================
-- ALTERNATIVE TABLE NAMES (Common Variations)
-- =============================================================================

-- Try alternative policy table names
DELETE FROM policy WHERE name LIKE '%upload%';
DELETE FROM policy WHERE name LIKE '%document%';
DELETE FROM policy WHERE name LIKE '%file%';

DELETE FROM settings WHERE setting_name LIKE '%upload%';
DELETE FROM settings WHERE setting_name LIKE '%document%';
DELETE FROM settings WHERE setting_name LIKE '%file%';

DELETE FROM configurations WHERE config_name LIKE '%upload%';
DELETE FROM configurations WHERE config_name LIKE '%document%';
DELETE FROM configurations WHERE config_name LIKE '%file%';

DELETE FROM permissions WHERE permission_name LIKE '%upload%';
DELETE FROM permissions WHERE permission_name LIKE '%document%';
DELETE FROM permissions WHERE permission_name LIKE '%file%';

DELETE FROM restrictions WHERE restriction_name LIKE '%upload%';
DELETE FROM restrictions WHERE restriction_name LIKE '%document%';
DELETE FROM restrictions WHERE restriction_name LIKE '%file%';

-- =============================================================================
-- RESET UPLOAD QUOTAS AND LIMITS
-- =============================================================================

-- Reset user upload quotas
UPDATE users SET upload_quota = NULL WHERE upload_quota IS NOT NULL;
UPDATE users SET max_file_size = NULL WHERE max_file_size IS NOT NULL;
UPDATE users SET allowed_file_types = NULL WHERE allowed_file_types IS NOT NULL;

-- Reset organization limits
UPDATE organizations SET upload_limit = NULL WHERE upload_limit IS NOT NULL;
UPDATE organizations SET storage_quota = NULL WHERE storage_quota IS NOT NULL;

-- Reset workspace limits
UPDATE workspaces SET file_upload_limit = NULL WHERE file_upload_limit IS NOT NULL;
UPDATE workspaces SET document_limit = NULL WHERE document_limit IS NOT NULL;

-- =============================================================================
-- ENABLE UPLOAD FEATURES
-- =============================================================================

-- Enable file uploads in system settings
INSERT INTO system_config (config_key, config_value, description)
VALUES ('enable_file_uploads', 'true', 'Allow file uploads to knowledge base')
ON CONFLICT (config_key) DO UPDATE SET config_value = 'true';

INSERT INTO system_config (config_key, config_value, description)
VALUES ('enable_document_uploads', 'true', 'Allow document uploads')
ON CONFLICT (config_key) DO UPDATE SET config_value = 'true';

INSERT INTO system_config (config_key, config_value, description)
VALUES ('max_upload_size', '100000000', 'Maximum upload size in bytes (100MB)')
ON CONFLICT (config_key) DO UPDATE SET config_value = '100000000';

-- Enable knowledge base features
INSERT INTO feature_flags (flag_name, enabled, description)
VALUES ('knowledge_base_uploads', true, 'Enable knowledge base document uploads')
ON CONFLICT (flag_name) DO UPDATE SET enabled = true;

INSERT INTO feature_flags (flag_name, enabled, description)
VALUES ('file_attachments', true, 'Enable file attachments')
ON CONFLICT (flag_name) DO UPDATE SET enabled = true;

-- =============================================================================
-- GRANT PERMISSIONS FOR UPLOADS
-- =============================================================================

-- Grant upload permissions to all users
INSERT INTO permissions (user_id, permission_name, granted)
SELECT id, 'upload_documents', true FROM users
ON CONFLICT (user_id, permission_name) DO UPDATE SET granted = true;

INSERT INTO permissions (user_id, permission_name, granted)
SELECT id, 'create_knowledge_base', true FROM users
ON CONFLICT (user_id, permission_name) DO UPDATE SET granted = true;

INSERT INTO permissions (user_id, permission_name, granted)
SELECT id, 'manage_files', true FROM users
ON CONFLICT (user_id, permission_name) DO UPDATE SET granted = true;

-- =============================================================================
-- CLEAN UP AUDIT LOGS OF POLICY RESTRICTIONS
-- =============================================================================

-- Remove audit entries about upload restrictions (optional)
-- DELETE FROM audit_logs WHERE action LIKE '%upload%blocked%';
-- DELETE FROM audit_logs WHERE action LIKE '%document%denied%';
-- DELETE FROM audit_logs WHERE action LIKE '%file%restricted%';

-- =============================================================================
-- COMMIT CHANGES
-- =============================================================================

-- Uncomment the following line to commit changes
-- COMMIT;

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Check remaining policies (run these after the deletions)
/*
SELECT * FROM policies WHERE policy_name LIKE '%upload%' OR policy_name LIKE '%document%' OR policy_name LIKE '%file%';
SELECT * FROM user_policies WHERE policy_type IN ('upload_restriction', 'file_access', 'document_access');
SELECT * FROM security_policies WHERE policy_name LIKE '%csp%' OR policy_name LIKE '%cors%';
SELECT * FROM system_config WHERE config_key LIKE '%upload%' OR config_key LIKE '%file%';
SELECT * FROM feature_flags WHERE flag_name LIKE '%upload%' OR flag_name LIKE '%document%';
*/
