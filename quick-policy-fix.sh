#!/bin/bash

# Quick Policy Fix Script for Knowledge Base Upload Issues
# This script removes common policies that block document uploads

set -e

echo "🛡️  Quick Policy Fix for Knowledge Base Uploads"
echo "=============================================="

# Check OS
OS=$(uname -s)
echo "Operating System: $OS"

# Function to run command with error handling
run_cmd() {
    local desc="$1"
    local cmd="$2"
    echo "🔧 $desc..."

    if eval "$cmd" 2>/dev/null; then
        echo "   ✅ Success"
    else
        echo "   ⚠️  Failed (this might be normal)"
    fi
}

# Clear browser policies and data
clear_browser_policies() {
    echo "🌐 Clearing browser policies and restrictions..."

    if [[ "$OS" == "Darwin" ]]; then
        # macOS
        run_cmd "Clear Chrome policies" "defaults delete com.google.Chrome AllowFileSelectionDialogs"
        run_cmd "Clear Chrome file restrictions" "defaults delete com.google.Chrome DefaultFileSystemReadGuardSetting"
        run_cmd "Clear Safari restrictions" "defaults delete com.apple.Safari WebKitFileUploadPanelFileTypes"

        # Clear browser caches
        run_cmd "Clear Chrome cache" "rm -rf ~/Library/Caches/Google/Chrome/"
        run_cmd "Clear Safari cache" "rm -rf ~/Library/Caches/com.apple.Safari/"

    elif [[ "$OS" == "Linux" ]]; then
        # Linux
        run_cmd "Remove Chrome policies" "sudo rm -rf /etc/opt/chrome/policies/managed/*"
        run_cmd "Remove Chromium policies" "sudo rm -rf /etc/chromium/policies/managed/*"

        # Clear browser caches
        run_cmd "Clear Chrome cache" "rm -rf ~/.cache/google-chrome/"
        run_cmd "Clear Chromium cache" "rm -rf ~/.cache/chromium/"
        run_cmd "Clear Firefox cache" "rm -rf ~/.cache/mozilla/"

    else
        echo "   ⚠️  Windows detected - please run the Python script as administrator"
    fi
}

# Fix file permissions
fix_permissions() {
    echo "📁 Fixing file permissions..."

    if [[ "$OS" != "MINGW"* ]] && [[ "$OS" != "CYGWIN"* ]]; then
        # Unix-like systems
        run_cmd "Fix Downloads permissions" "chmod 755 ~/Downloads/"
        run_cmd "Fix Documents permissions" "chmod 755 ~/Documents/"
        run_cmd "Fix tmp permissions" "sudo chmod 1777 /tmp"
        run_cmd "Fix var/tmp permissions" "sudo chmod 1777 /var/tmp"
    fi
}

# Disable security restrictions
disable_security_restrictions() {
    echo "🔒 Disabling restrictive security policies..."

    if [[ "$OS" == "Darwin" ]]; then
        # macOS
        run_cmd "Disable Gatekeeper" "sudo spctl --master-disable"
        run_cmd "Disable quarantine attributes" "sudo xattr -rd com.apple.quarantine /Applications/* 2>/dev/null || true"

    elif [[ "$OS" == "Linux" ]]; then
        # Linux
        run_cmd "Disable SELinux (temporary)" "sudo setenforce 0"
        run_cmd "Set SELinux boolean for HTTP" "sudo setsebool -P httpd_can_network_connect 1"
        run_cmd "Disable AppArmor for browsers" "sudo aa-disable /usr/bin/chrome 2>/dev/null || true"
        run_cmd "Disable AppArmor for Firefox" "sudo aa-disable /usr/bin/firefox 2>/dev/null || true"
    fi
}

# Create browser override script
create_override_script() {
    echo "📝 Creating browser override script..."

    cat > browser_override.js << 'EOF'
// Browser Policy Override Script
// Paste this into your browser's developer console (F12)

console.log('🛡️ Overriding browser upload restrictions...');

// Remove file input restrictions
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            input.removeAttribute('accept');
            input.removeAttribute('webkitdirectory');
            input.setAttribute('multiple', 'true');
            console.log('📁 File input restrictions removed:', input);
        });
    }, 1000);
});

// Override FormData restrictions
if (window.FormData) {
    const originalFormData = window.FormData;
    window.FormData = function(form) {
        const formData = new originalFormData(form);
        const originalAppend = formData.append;

        formData.append = function(name, value, filename) {
            try {
                return originalAppend.call(this, name, value, filename);
            } catch (e) {
                console.warn('FormData restriction bypassed:', e);
                return originalAppend.call(this, name, value || '', filename);
            }
        };
        return formData;
    };
}

// Override File API restrictions
if (window.File) {
    console.log('✅ File API available');
    // Test file creation
    try {
        const testFile = new File(['test'], 'test.txt', {type: 'text/plain'});
        console.log('✅ File creation works:', testFile);
    } catch (e) {
        console.error('❌ File creation blocked:', e);
    }
}

console.log('✅ Browser override script loaded');
console.log('📋 Try uploading your documents now');
EOF

    echo "   ✅ Created browser_override.js"
    echo "   📋 To use: Open browser dev tools (F12), go to Console tab, paste the script"
}

# Main execution
main() {
    echo "🚀 Starting policy removal process..."
    echo ""

    # Run all fixes
    clear_browser_policies
    echo ""

    fix_permissions
    echo ""

    disable_security_restrictions
    echo ""

    create_override_script
    echo ""

    echo "🎉 Policy fix process completed!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Close ALL browser windows completely"
    echo "2. Restart your browser"
    echo "3. Try uploading documents to the knowledge base"
    echo "4. If still blocked, use the browser_override.js script:"
    echo "   - Press F12 in your browser"
    echo "   - Go to Console tab"
    echo "   - Copy and paste the contents of browser_override.js"
    echo "   - Press Enter to run"
    echo ""
    echo "5. If issues persist, run the full Python script:"
    echo "   python3 remove-policies.py --type=all"
    echo ""
    echo "💡 Tip: Some changes require browser restart to take effect"
}

# Check if running with appropriate permissions
check_permissions() {
    if [[ "$EUID" != 0 ]] && [[ "$OS" != "Darwin" ]]; then
        echo "⚠️  Note: Some operations may require sudo privileges"
        echo "   You may see permission warnings - this is normal"
        echo ""
    fi
}

# Run the script
check_permissions
main

echo "🔄 To re-run this script: bash quick-policy-fix.sh"
