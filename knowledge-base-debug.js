// Knowledge Base Upload Debug Script
// Paste this into your browser console (F12) on the knowledge base page

console.log('🔍 Knowledge Base Upload Debugger Starting...');

// =============================================================================
// 1. CHECK CURRENT PAGE AND ELEMENTS
// =============================================================================

console.log('📍 Current URL:', window.location.href);
console.log('📄 Page Title:', document.title);

// Find upload elements
const uploadElements = {
    fileInputs: document.querySelectorAll('input[type="file"]'),
    uploadButtons: document.querySelectorAll('button[type="submit"], button:contains("upload"), button:contains("add")'),
    uploadForms: document.querySelectorAll('form'),
    dropZones: document.querySelectorAll('[class*="drop"], [class*="upload"]'),
    textAreas: document.querySelectorAll('textarea'),
    contentInputs: document.querySelectorAll('input[type="text"], input[placeholder*="knowledge"], input[placeholder*="document"]')
};

console.log('📊 Upload Elements Found:');
Object.entries(uploadElements).forEach(([key, elements]) => {
    console.log(`  ${key}: ${elements.length} elements`);
    if (elements.length > 0) {
        elements.forEach((el, i) => {
            console.log(`    [${i}]:`, el);
        });
    }
});

// =============================================================================
// 2. CHECK FOR ERROR MESSAGES
// =============================================================================

const errorElements = document.querySelectorAll(
    '.error, .alert, .warning, [class*="error"], [class*="alert"], [role="alert"]'
);
console.log('🚨 Error Elements:', errorElements.length);
errorElements.forEach((el, i) => {
    if (el.textContent.trim()) {
        console.log(`  Error ${i}:`, el.textContent.trim());
    }
});

// =============================================================================
// 3. NETWORK MONITORING SETUP
// =============================================================================

// Monitor fetch requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
    console.log('🌐 Fetch Request:', args[0], args[1]);
    return originalFetch.apply(this, args)
        .then(response => {
            console.log('📥 Fetch Response:', {
                url: args[0],
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });
            return response;
        })
        .catch(error => {
            console.error('❌ Fetch Error:', args[0], error);
            throw error;
        });
};

// Monitor XMLHttpRequest
const originalXHROpen = XMLHttpRequest.prototype.open;
const originalXHRSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function(method, url, ...args) {
    this._debugInfo = { method, url };
    console.log('🌐 XHR Open:', method, url);
    return originalXHROpen.apply(this, [method, url, ...args]);
};

XMLHttpRequest.prototype.send = function(data) {
    console.log('📤 XHR Send:', this._debugInfo, data);

    this.addEventListener('load', () => {
        console.log('📥 XHR Response:', {
            ...this._debugInfo,
            status: this.status,
            statusText: this.statusText,
            response: this.response?.substring(0, 200) + (this.response?.length > 200 ? '...' : '')
        });
    });

    this.addEventListener('error', () => {
        console.error('❌ XHR Error:', this._debugInfo);
    });

    return originalXHRSend.apply(this, [data]);
};

// =============================================================================
// 4. FORM SUBMISSION MONITORING
// =============================================================================

// Monitor form submissions
document.addEventListener('submit', function(e) {
    console.log('📝 Form Submission:', {
        form: e.target,
        action: e.target.action,
        method: e.target.method,
        formData: new FormData(e.target)
    });

    // Log form data
    const formData = new FormData(e.target);
    console.log('📋 Form Data:');
    for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
    }
});

// =============================================================================
// 5. FILE INPUT MONITORING
// =============================================================================

uploadElements.fileInputs.forEach((input, i) => {
    input.addEventListener('change', function(e) {
        console.log(`📁 File Input ${i} Changed:`, {
            files: Array.from(e.target.files).map(f => ({
                name: f.name,
                size: f.size,
                type: f.type,
                lastModified: new Date(f.lastModified)
            })),
            inputElement: e.target
        });
    });
});

// =============================================================================
// 6. BUTTON CLICK MONITORING
// =============================================================================

uploadElements.uploadButtons.forEach((button, i) => {
    button.addEventListener('click', function(e) {
        console.log(`🖱️ Upload Button ${i} Clicked:`, {
            button: e.target,
            text: e.target.textContent.trim(),
            disabled: e.target.disabled,
            form: e.target.form
        });
    });
});

// =============================================================================
// 7. CONSOLE ERROR MONITORING
// =============================================================================

// Override console.error to catch application errors
const originalConsoleError = console.error;
console.error = function(...args) {
    console.log('🔴 Console Error Detected:', args);
    return originalConsoleError.apply(this, args);
};

// =============================================================================
// 8. LOCAL STORAGE / SESSION STORAGE CHECK
// =============================================================================

console.log('💾 Storage Check:');
console.log('  localStorage keys:', Object.keys(localStorage));
console.log('  sessionStorage keys:', Object.keys(sessionStorage));

// Check for auth tokens
const authKeys = ['token', 'auth', 'session', 'jwt', 'user', 'supabase'];
authKeys.forEach(key => {
    const localValue = localStorage.getItem(key);
    const sessionValue = sessionStorage.getItem(key);
    if (localValue) console.log(`  localStorage.${key}:`, localValue.substring(0, 50) + '...');
    if (sessionValue) console.log(`  sessionStorage.${key}:`, sessionValue.substring(0, 50) + '...');
});

// =============================================================================
// 9. API ENDPOINT DETECTION
// =============================================================================

// Try to detect API endpoints
const scripts = Array.from(document.scripts);
const apiPatterns = [
    /api[\/\w]*upload/gi,
    /api[\/\w]*knowledge/gi,
    /api[\/\w]*document/gi,
    /\/upload/gi,
    /\/knowledge/gi,
    /supabase\.co/gi
];

console.log('🔍 Scanning for API endpoints...');
scripts.forEach(script => {
    if (script.src) {
        apiPatterns.forEach(pattern => {
            const matches = script.src.match(pattern);
            if (matches) {
                console.log('  Found API pattern in script:', script.src, matches);
            }
        });
    }

    if (script.textContent) {
        apiPatterns.forEach(pattern => {
            const matches = script.textContent.match(pattern);
            if (matches) {
                console.log('  Found API pattern in inline script:', matches);
            }
        });
    }
});

// =============================================================================
// 10. TEST UPLOAD FUNCTIONALITY
// =============================================================================

function testUpload() {
    console.log('🧪 Testing Upload Functionality...');

    // Create a test file
    const testFile = new File(['Test knowledge base content'], 'test-knowledge.txt', {
        type: 'text/plain'
    });

    // Try to simulate file selection
    const fileInput = uploadElements.fileInputs[0];
    if (fileInput) {
        // Create a new FileList
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        fileInput.files = dataTransfer.files;

        // Trigger change event
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));

        console.log('✅ Test file added to first file input');
    } else {
        console.log('❌ No file input found for testing');
    }
}

// =============================================================================
// 11. MANUAL TESTING HELPERS
// =============================================================================

// Expose helper functions to global scope
window.kbDebug = {
    testUpload,

    // Check current authentication
    checkAuth() {
        console.log('🔐 Auth Check:');
        console.log('  Cookies:', document.cookie);
        console.log('  User agent:', navigator.userAgent);

        // Try common auth checks
        const authChecks = [
            () => window.supabase?.auth?.getUser(),
            () => window.auth?.currentUser,
            () => window.user,
            () => window.currentUser
        ];

        authChecks.forEach((check, i) => {
            try {
                const result = check();
                if (result) {
                    console.log(`  Auth check ${i}:`, result);
                }
            } catch (e) {
                // Ignore errors
            }
        });
    },

    // Try direct API call
    async testAPI() {
        console.log('🔗 Testing API directly...');

        const endpoints = [
            '/api/upload',
            '/api/knowledge',
            '/api/documents',
            '/api/knowledge-base',
            '/upload'
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ test: true })
                });

                console.log(`  ${endpoint}:`, response.status, response.statusText);
            } catch (error) {
                console.log(`  ${endpoint}: Error -`, error.message);
            }
        }
    },

    // Show all event listeners
    showListeners() {
        const elements = [...uploadElements.fileInputs, ...uploadElements.uploadButtons];
        elements.forEach((el, i) => {
            console.log(`Element ${i} listeners:`, getEventListeners(el));
        });
    }
};

// =============================================================================
// 12. FINAL REPORT
// =============================================================================

console.log('✅ Knowledge Base Debug Setup Complete!');
console.log('');
console.log('🛠️ Available Commands:');
console.log('  kbDebug.testUpload()     - Test file upload simulation');
console.log('  kbDebug.checkAuth()      - Check authentication status');
console.log('  kbDebug.testAPI()        - Test API endpoints');
console.log('  kbDebug.showListeners()  - Show event listeners (Chrome only)');
console.log('');
console.log('👀 Now try to upload a file and watch the console for errors...');

// Auto-run auth check
setTimeout(() => {
    window.kbDebug.checkAuth();
}, 1000);
