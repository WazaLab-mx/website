-- Quick Database Policy Check - Run this first to see what policies exist
-- This script identifies policies that might be blocking uploads without making changes

-- =============================================================================
-- IDENTIFY UPLOAD-BLOCKING POLICIES
-- =============================================================================

-- Check for upload-related policies
SELECT 'Upload Policies' as category, COUNT(*) as count, GROUP_CONCAT(policy_name, ', ') as policies
FROM policies
WHERE policy_name LIKE '%upload%'
   OR policy_name LIKE '%document%'
   OR policy_name LIKE '%file%'
   OR policy_name LIKE '%attachment%'
   OR policy_name LIKE '%knowledge%';

-- Check user restrictions
SELECT 'User Restrictions' as category, COUNT(*) as count, GROUP_CONCAT(DISTINCT policy_type, ', ') as types
FROM user_policies
WHERE policy_type LIKE '%upload%'
   OR policy_type LIKE '%file%'
   OR policy_type LIKE '%document%'
   OR policy_type = 'upload_restriction'
   OR policy_type = 'file_access_denied';

-- Check security policies
SELECT 'Security Policies' as category, COUNT(*) as count, GROUP_CONCAT(policy_name, ', ') as policies
FROM security_policies
WHERE policy_name LIKE '%upload%'
   OR policy_name LIKE '%file%'
   OR policy_name LIKE '%cors%'
   OR policy_name LIKE '%csp%'
   OR policy_name LIKE '%scan%';

-- Check system configuration
SELECT 'System Config' as category, config_key, config_value
FROM system_config
WHERE config_key LIKE '%upload%'
   OR config_key LIKE '%file%'
   OR config_key LIKE '%document%'
   OR config_key LIKE '%size%'
   OR config_key LIKE '%limit%';

-- Check feature flags
SELECT 'Feature Flags' as category, flag_name, enabled
FROM feature_flags
WHERE flag_name LIKE '%upload%'
   OR flag_name LIKE '%file%'
   OR flag_name LIKE '%document%'
   OR flag_name LIKE '%knowledge%';

-- =============================================================================
-- CHECK USER PERMISSIONS
-- =============================================================================

-- Users without upload permissions
SELECT 'Users Missing Upload Permission' as category, COUNT(*) as count
FROM users u
LEFT JOIN user_permissions up ON u.id = up.user_id AND up.permission_name = 'upload_documents'
WHERE up.user_id IS NULL;

-- Users with quota limits
SELECT 'Users with Upload Limits' as category, COUNT(*) as count
FROM users
WHERE upload_quota IS NOT NULL
   OR max_file_size IS NOT NULL
   OR upload_restrictions IS NOT NULL;

-- =============================================================================
-- CHECK TRIGGERS AND CONSTRAINTS
-- =============================================================================

-- MySQL/PostgreSQL: Check for restrictive triggers
-- SELECT 'Restrictive Triggers' as category, trigger_name, event_object_table
-- FROM information_schema.triggers
-- WHERE trigger_name LIKE '%upload%'
--    OR trigger_name LIKE '%file%'
--    OR trigger_name LIKE '%block%'
--    OR trigger_name LIKE '%restrict%';

-- SQLite: Check for triggers
SELECT 'Triggers' as category, name, sql
FROM sqlite_master
WHERE type='trigger'
  AND (name LIKE '%upload%'
       OR name LIKE '%file%'
       OR name LIKE '%document%'
       OR name LIKE '%block%'
       OR name LIKE '%restrict%');

-- =============================================================================
-- CHECK RATE LIMITS
-- =============================================================================

-- API rate limits that might affect uploads
SELECT 'API Rate Limits' as category, endpoint, requests_per_minute, requests_per_hour
FROM api_rate_limits
WHERE endpoint LIKE '%upload%'
   OR endpoint LIKE '%file%'
   OR endpoint LIKE '%document%';

-- =============================================================================
-- CHECK VALIDATION RULES
-- =============================================================================

-- Validation rules that might block uploads
SELECT 'Validation Rules' as category, rule_name, rule_type
FROM validation_rules
WHERE rule_name LIKE '%upload%'
   OR rule_name LIKE '%file%'
   OR rule_name LIKE '%document%'
   OR rule_type IN ('upload_validation', 'file_validation');

-- Business rules
SELECT 'Business Rules' as category, rule_name, rule_type
FROM business_rules
WHERE rule_type IN ('upload_validation', 'file_validation', 'document_validation');

-- =============================================================================
-- CHECK WORKFLOW RESTRICTIONS
-- =============================================================================

-- Approval workflows
SELECT 'Approval Workflows' as category, workflow_name, workflow_type
FROM approval_workflows
WHERE workflow_type LIKE '%upload%'
   OR workflow_type LIKE '%document%'
   OR workflow_type LIKE '%file%';

-- Workflow steps requiring approval
SELECT 'Approval Steps' as category, step_name, step_type
FROM workflow_steps
WHERE step_type = 'upload_approval'
   OR step_name LIKE '%approval%'
   OR step_name LIKE '%review%';

-- =============================================================================
-- CHECK CONTENT POLICIES
-- =============================================================================

-- Content moderation policies
SELECT 'Content Policies' as category, policy_name, policy_type
FROM content_policies
WHERE policy_name LIKE '%upload%'
   OR policy_name LIKE '%file%'
   OR policy_name LIKE '%document%'
   OR policy_name LIKE '%block%'
   OR policy_name LIKE '%restrict%';

-- =============================================================================
-- SUMMARY REPORT
-- =============================================================================

SELECT '=== POLICY CHECK SUMMARY ===' as report;

-- Count total restrictive policies
SELECT 'Total Restrictive Policies' as metric,
       (SELECT COUNT(*) FROM policies WHERE policy_name LIKE '%upload%' OR policy_name LIKE '%document%' OR policy_name LIKE '%file%') +
       (SELECT COUNT(*) FROM user_policies WHERE policy_type LIKE '%upload%' OR policy_type LIKE '%file%') +
       (SELECT COUNT(*) FROM security_policies WHERE policy_name LIKE '%upload%' OR policy_name LIKE '%file%' OR policy_name LIKE '%scan%') +
       (SELECT COUNT(*) FROM content_policies WHERE policy_name LIKE '%upload%' OR policy_name LIKE '%block%')
       as count;

-- Check if uploads are enabled
SELECT 'Upload Status' as metric,
       CASE
           WHEN (SELECT config_value FROM system_config WHERE config_key = 'enable_file_uploads') = 'true' THEN 'ENABLED'
           WHEN (SELECT config_value FROM system_config WHERE config_key = 'enable_file_uploads') = 'false' THEN 'DISABLED'
           ELSE 'UNKNOWN'
       END as status;

-- Check knowledge base status
SELECT 'Knowledge Base Status' as metric,
       CASE
           WHEN (SELECT enabled FROM feature_flags WHERE flag_name = 'knowledge_base_uploads') = 1 THEN 'ENABLED'
           WHEN (SELECT enabled FROM feature_flags WHERE flag_name = 'knowledge_base_uploads') = 0 THEN 'DISABLED'
           ELSE 'UNKNOWN'
       END as status;

-- =============================================================================
-- RECOMMENDATIONS
-- =============================================================================

SELECT '=== RECOMMENDATIONS ===' as section;

SELECT 'Next Steps' as action,
       CASE
           WHEN (SELECT COUNT(*) FROM policies WHERE policy_name LIKE '%upload%' OR policy_name LIKE '%document%' OR policy_name LIKE '%file%') > 0
           THEN 'Run remove-database-policies.sql to remove blocking policies'
           ELSE 'No obvious policy restrictions found - check application-level settings'
       END as recommendation;

-- Quick fix suggestions
SELECT 'Quick Fixes' as category,
       'UPDATE system_config SET config_value = ''true'' WHERE config_key = ''enable_file_uploads'';' as sql_command
WHERE (SELECT config_value FROM system_config WHERE config_key = 'enable_file_uploads') != 'true';

SELECT 'Quick Fixes' as category,
       'UPDATE feature_flags SET enabled = 1 WHERE flag_name = ''knowledge_base_uploads'';' as sql_command
WHERE (SELECT enabled FROM feature_flags WHERE flag_name = 'knowledge_base_uploads') != 1;
