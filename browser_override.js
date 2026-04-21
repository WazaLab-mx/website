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
