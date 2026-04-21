# Database Policy Removal Guide for Knowledge Base Uploads

## 🎯 Overview
This guide provides SQL scripts to remove database policies that might be blocking document uploads to knowledge bases. The scripts target common policy tables and configurations found in web applications.

## 📁 Available Scripts

### 1. **quick-policy-check.sql** - Diagnostic Script
**Run this first** to identify what policies exist without making changes.

```sql
-- Example usage
sqlite3 your_database.db < quick-policy-check.sql
```

### 2. **remove-database-policies.sql** - Universal Script
Generic SQL that works across PostgreSQL, MySQL, and SQLite.

### 3. **remove-policies-postgresql.sql** - PostgreSQL Specific
Advanced PostgreSQL-specific operations including row-level security, triggers, and constraints.

### 4. **remove-policies-mysql.sql** - MySQL Specific
MySQL-specific syntax with proper regex patterns and upsert operations.

### 5. **remove-policies-sqlite.sql** - SQLite Specific
SQLite-compatible operations with proper datetime functions and index creation.

## 🚀 Quick Start

### Step 1: Identify Your Database
```bash
# PostgreSQL
psql --version

# MySQL
mysql --version

# SQLite
sqlite3 --version
```

### Step 2: Check Current Policies
```bash
# PostgreSQL
psql -d your_database -f quick-policy-check.sql

# MySQL
mysql -u username -p database_name < quick-policy-check.sql

# SQLite
sqlite3 your_database.db < quick-policy-check.sql
```

### Step 3: Remove Policies

#### PostgreSQL
```bash
# Backup first
pg_dump your_database > backup.sql

# Remove policies
psql -d your_database -f remove-policies-postgresql.sql
```

#### MySQL
```bash
# Backup first
mysqldump -u username -p database_name > backup.sql

# Remove policies
mysql -u username -p database_name < remove-policies-mysql.sql
```

#### SQLite
```bash
# Backup first
cp your_database.db your_database_backup.db

# Remove policies
sqlite3 your_database.db < remove-policies-sqlite.sql
```

## 🎯 What These Scripts Remove

### Policy Types Targeted:
- ✅ **Upload restrictions** - Policies blocking file uploads
- ✅ **Document policies** - Knowledge base document restrictions
- ✅ **File type restrictions** - MIME type and extension blocks
- ✅ **Size limits** - Maximum file size restrictions
- ✅ **User quotas** - Per-user upload limits
- ✅ **Security policies** - CORS, CSP, virus scanning requirements
- ✅ **Rate limits** - API throttling for upload endpoints
- ✅ **Approval workflows** - Required approval steps
- ✅ **Validation rules** - File validation that blocks uploads
- ✅ **Content moderation** - Auto-blocking of certain content

### Database Objects Modified:
- **Tables**: `policies`, `user_policies`, `security_policies`, `system_config`, `feature_flags`
- **Triggers**: Upload validation triggers
- **Views**: Restrictive access views
- **Constraints**: Check constraints on file operations
- **Permissions**: User and role-based restrictions

## ⚠️ Safety Features

### Automatic Backups
All scripts include transaction support:
```sql
BEGIN TRANSACTION;  -- or START TRANSACTION;
-- ... policy removals ...
COMMIT;             -- Apply changes
-- ROLLBACK;        -- Undo if needed
```

### Verification Queries
Each script includes verification queries to check results:
```sql
-- Check remaining restrictions
SELECT * FROM policies WHERE policy_name LIKE '%upload%';
```

## 🔧 Common Policy Patterns

### Upload Blocking Policies
```sql
-- Examples of policies that block uploads
policy_name = 'disable_file_uploads'
policy_name = 'block_document_upload'
policy_name = 'require_admin_approval'
policy_name = 'virus_scan_mandatory'
```

### User Restrictions
```sql
-- User-level restrictions
policy_type = 'upload_restriction'
policy_type = 'file_access_denied'
upload_quota = 0
max_file_size = 1024  -- Very small limit
```

### Security Blocks
```sql
-- Security policies that prevent uploads
policy_name = 'csp_block_uploads'
policy_name = 'cors_strict_mode'
policy_name = 'csrf_token_required'
```

## 📊 Expected Results

After running the scripts, you should see:

### ✅ Enabled Features
- File uploads enabled in system config
- Knowledge base uploads feature flag enabled
- Upload permissions granted to users
- Generous file size limits (100MB default)
- Multiple file types allowed

### ❌ Removed Restrictions
- No upload-blocking policies
- No user quotas or limits
- No approval requirements
- No file type restrictions
- No size limitations

## 🐛 Troubleshooting

### Script Fails with "Table doesn't exist"
**Solution**: This is normal - the scripts try to remove policies from multiple possible table names. The errors for non-existent tables can be ignored.

### Permission Denied Errors
**Solution**: Ensure your database user has sufficient privileges:
```sql
-- PostgreSQL
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;

-- MySQL
GRANT ALL PRIVILEGES ON database_name.* TO 'your_user'@'%';
```

### No Policies Found
**Solution**: The restrictions might be at the application level rather than database level. Check:
1. Application configuration files
2. Environment variables
3. API gateway settings
4. Load balancer configurations

## 🔍 Verification Commands

### Check Upload Configuration
```sql
-- System settings
SELECT config_key, config_value
FROM system_config
WHERE config_key LIKE '%upload%';

-- Feature flags
SELECT flag_name, enabled
FROM feature_flags
WHERE flag_name LIKE '%upload%';

-- User permissions
SELECT COUNT(*) as users_with_upload_permission
FROM user_permissions
WHERE permission_name = 'upload_documents';
```

### Test Upload Functionality
After running the scripts, test uploads through:
1. **Web Interface** - Try uploading a document
2. **API Testing** - Use curl or Postman to test upload endpoints
3. **Application Logs** - Check for error messages

## 🚨 Emergency Rollback

If something goes wrong:

### PostgreSQL
```sql
-- Within the same session before COMMIT
ROLLBACK;

-- Or restore from backup
psql -d your_database -f backup.sql
```

### MySQL
```sql
-- Within the same session before COMMIT
ROLLBACK;

-- Or restore from backup
mysql -u username -p database_name < backup.sql
```

### SQLite
```sql
-- Within the same session before COMMIT
ROLLBACK;

-- Or restore from backup
cp your_database_backup.db your_database.db
```

## 📞 Need More Help?

### Check Application Logs
Look for these error patterns:
- "Upload denied by policy"
- "File type not allowed"
- "Size limit exceeded"
- "Permission denied"
- "Policy violation"

### Database-Specific Debugging

#### PostgreSQL
```sql
-- Check row-level security
SELECT * FROM pg_policies;

-- Check user privileges
\du

-- Check table permissions
\dp
```

#### MySQL
```sql
-- Check user privileges
SHOW GRANTS FOR 'username'@'%';

-- Check triggers
SHOW TRIGGERS LIKE '%upload%';
```

#### SQLite
```sql
-- Check triggers
SELECT name, sql FROM sqlite_master WHERE type='trigger';

-- Check indexes
.indices
```

## 💡 Pro Tips

1. **Run in Development First** - Test on a development database before production
2. **Monitor Application Logs** - Watch for new errors after removing policies
3. **Check File Permissions** - Ensure the file system allows uploads too
4. **Test Different File Types** - Verify various document formats work
5. **Check Network Policies** - Firewall rules might also block uploads

## 🎉 Success Indicators

You've successfully removed blocking policies when:
- ✅ Upload forms appear and function
- ✅ API endpoints accept file uploads
- ✅ No "permission denied" errors
- ✅ Files appear in knowledge base
- ✅ No policy-related error messages

The scripts are designed to be safe and comprehensive, targeting the most common causes of upload restrictions in database-driven applications.
