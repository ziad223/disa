const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Inject into About section cards
html = html.replace(/<h4 class="text-2xl font-bold text-disa-dark mb-4">معايير صارمة<\/h4>\s*<p class="text-gray-600">نلتزم بأعلى معايير الجودة والسلامة الغذائية لتقديم منتج صحي يليق بموائدكم.<\/p>/,
    '<h4 class="text-2xl font-bold text-disa-dark mb-4" data-i18n="about.f1.t">معايير صارمة</h4>\n                    <p class="text-gray-600" data-i18n="about.f1.p">نلتزم بأعلى معايير الجودة والسلامة الغذائية لتقديم منتج صحي يليق بموائدكم.</p>');
html = html.replace(/<h4 class="text-2xl font-bold text-disa-dark mb-4">منتجات طبيعية<\/h4>\s*<p class="text-gray-600">نختار أفضل المحاصيل الزراعية لضمان طعم أصيل وغني بالفوائد الغذائية.<\/p>/,
    '<h4 class="text-2xl font-bold text-disa-dark mb-4" data-i18n="about.f2.t">منتجات طبيعية</h4>\n                    <p class="text-gray-600" data-i18n="about.f2.p">نختار أفضل المحاصيل الزراعية لضمان طعم أصيل وغني بالفوائد الغذائية.</p>');
html = html.replace(/<h4 class="text-2xl font-bold text-disa-dark mb-4">ثقة العائلة<\/h4>\s*<p class="text-gray-600">نعمل لنكون الخيار الأول والآمن لكل عائلة سورية تبحث عن التميز.<\/p>/,
    '<h4 class="text-2xl font-bold text-disa-dark mb-4" data-i18n="about.f3.t">ثقة العائلة</h4>\n                    <p class="text-gray-600" data-i18n="about.f3.p">نعمل لنكون الخيار الأول والآمن لكل عائلة سورية تبحث عن التميز.</p>');

// Inject into Brand Gallery Section
html = html.replace(/<h2 class="text-disa-orange font-bold text-xl mb-2">معرض ديسا<\/h2>/, '<h2 class="text-disa-orange font-bold text-xl mb-2" data-i18n="gallery.title1">معرض ديسا</h2>');
html = html.replace(/<h3 class="text-4xl font-black text-disa-dark mb-6">تشكيلتنا المختارة من الطبيعة إليك<\/h3>/, '<h3 class="text-4xl font-black text-disa-dark mb-6" data-i18n="gallery.title2">تشكيلتنا المختارة من الطبيعة إليك</h3>');
html = html.replace(/<p class="text-gray-600">نقدم لكم مجموعة واسعة من أفضل أنواع الحبوب والبقوليات المختارة بعناية لتناسب كل الأذواق.<\/p>/, '<p class="text-gray-600" data-i18n="gallery.desc">نقدم لكم مجموعة واسعة من أفضل أنواع الحبوب والبقوليات المختارة بعناية لتناسب كل الأذواق.</p>');

// Inject into Footer Labels
html = html.replace(/<h5 class="font-bold mb-1">العنوان<\/h5>/g, '<h5 class="font-bold mb-1" data-i18n="contact.addrLabel">العنوان</h5>');
html = html.replace(/<h5 class="font-bold mb-1">الهاتف<\/h5>/g, '<h5 class="font-bold mb-1" data-i18n="contact.phoneLabel">الهاتف</h5>');
html = html.replace(/<h5 class="font-bold mb-1">انستغرام<\/h5>/g, '<h5 class="font-bold mb-1" data-i18n="contact.instaLabel">انستغرام</h5>');
html = html.replace(/>سياسة الخصوصية<\/a>/g, ' data-i18n="footer.privacy">سياسة الخصوصية</a>');
html = html.replace(/>الشروط والأحكام<\/a>/g, ' data-i18n="footer.terms">الشروط والأحكام</a>');

// Dynamic injection for Products
html = html.replace(/>جديد<\/div>/g, ' data-i18n="prod.new">جديد</div>');
html = html.replace(/>الأكثر مبيعاً<\/div>/g, ' data-i18n="prod.bestseller">الأكثر مبيعاً</div>');
html = html.replace(/<div class="text-sm text-gray-500 mb-2">حبوب<\/div>/g, '<div class="text-sm text-gray-500 mb-2" data-i18n="cat.grains">حبوب</div>');
html = html.replace(/<div class="text-sm text-gray-500 mb-2">بقوليات<\/div>/g, '<div class="text-sm text-gray-500 mb-2" data-i18n="cat.legumes">بقوليات</div>');
html = html.replace(/<div class="text-sm text-gray-500 mb-2">باستا<\/div>/g, '<div class="text-sm text-gray-500 mb-2" data-i18n="cat.pasta">باستا</div>');
html = html.replace(/<span class="text-sm">ل\.س<\/span>/g, '<span class="text-sm" data-i18n="currency">ل.س</span>');

// Dictionary mapping for products
const prodDict = {
    'فريكة خضراء': 'prod.1',
    'رز حبة طويلة': 'prod.2',
    'حمص حب': 'prod.3',
    'فول مدمس': 'prod.4',
    'فاصوليا بيضاء': 'prod.5',
    'عدس مجروش': 'prod.6',
    'معكرونة سباغيتي': 'prod.7',
    'سميد ناعم': 'prod.8',
    'عدس أحمر': 'prod.9',
    'رز قصير': 'prod.10',
    'برغل خشن': 'prod.11',
    'ذرة صفراء': 'prod.12'
};

for (const [arName, tag] of Object.entries(prodDict)) {
    let regex = new RegExp(`<h4 class="text-xl font-bold text-disa-dark mb-2">${arName}</h4>`, "g");
    html = html.replace(regex, `<h4 class="text-xl font-bold text-disa-dark mb-2" data-i18n="${tag}">${arName}</h4>`);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully.');
