const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const modalsHtml = `
    <!-- Policy Modals -->
    <div id="policy-modal" class="fixed inset-0 bg-black/60 z-[70] hidden opacity-0 transition-opacity duration-300 flex items-center justify-center px-4">
        <div class="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl transform scale-95 transition-transform duration-300" id="policy-content">
            <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 id="policy-modal-title" class="text-2xl font-black text-disa-dark">سياسة الخصوصية</h3>
                <button onclick="closePolicyModal()" class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-disa-primary transition-colors"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="p-8 max-h-[60vh] overflow-y-auto">
                <p id="policy-modal-text" class="text-gray-600 leading-relaxed text-lg">محتوى السياسة...</p>
            </div>
            <div class="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button onclick="closePolicyModal()" class="bg-disa-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-disa-dark transition-all" data-i18n="modal.close">إغلاق</button>
            </div>
        </div>
    </div>
`;

// Insert Modals HTML before Scripts
html = html.replace('<!-- Scripts -->', modalsHtml + '\n    <!-- Scripts -->');

// Update footer links to open modals
html = html.replace(/<a href="#" class="hover:text-white transition-colors" data-i18n="footer.privacy">سياسة الخصوصية<\/a>/, 
    '<button onclick="openPolicyModal(\'privacy\')" class="hover:text-white transition-colors" data-i18n="footer.privacy">سياسة الخصوصية</button>');
html = html.replace(/<a href="#" class="hover:text-white transition-colors" data-i18n="footer.terms">الشروط والأحكام<\/a>/, 
    '<button onclick="openPolicyModal(\'terms\')" class="hover:text-white transition-colors" data-i18n="footer.terms">الشروط والأحكام</button>');

fs.writeFileSync('index.html', html, 'utf8');

let js = fs.readFileSync('js/main.js', 'utf8');

const policyJs = `
// Policy Modals Logic
function openPolicyModal(type) {
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');
    const title = document.getElementById('policy-modal-title');
    const text = document.getElementById('policy-modal-text');

    if (type === 'privacy') {
        title.setAttribute('data-i18n', 'modal.privacy.title');
        text.setAttribute('data-i18n', 'modal.privacy.content');
        title.innerHTML = translations[currentLang]['modal.privacy.title'];
        text.innerHTML = translations[currentLang]['modal.privacy.content'];
    } else {
        title.setAttribute('data-i18n', 'modal.terms.title');
        text.setAttribute('data-i18n', 'modal.terms.content');
        title.innerHTML = translations[currentLang]['modal.terms.title'];
        text.innerHTML = translations[currentLang]['modal.terms.content'];
    }

    modal.classList.remove('hidden');
    // Trigger reflow
    void modal.offsetWidth;
    modal.classList.remove('opacity-0');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
}

function closePolicyModal() {
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');
    
    modal.classList.add('opacity-0');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}
`;

if (!js.includes('openPolicyModal')) {
    fs.writeFileSync('js/main.js', js + '\n' + policyJs, 'utf8');
}

console.log('Modals injected successfully.');
