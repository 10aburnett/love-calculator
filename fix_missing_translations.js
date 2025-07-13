#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const localesDir = './public/locales';

// Languages and their translations for the top priority missing keys
const translations = {
  'loveCalculator.invalidCharacters': {
    'es': 'Los nombres solo pueden contener letras, espacios, guiones y apostrofes',
    'fr': 'Les noms ne peuvent contenir que des lettres, des espaces, des traits d\'union et des apostrophes',
    'de': 'Namen können nur Buchstaben, Leerzeichen, Bindestriche und Apostrophe enthalten',
    'it': 'I nomi possono contenere solo lettere, spazi, trattini e apostrofi',
    'pt': 'Os nomes podem conter apenas letras, espaços, hífens e apóstrofes',
    'ru': 'Имена могут содержать только буквы, пробелы, дефисы и апострофы',
    'zh': '姓名只能包含字母、空格、连字符和撇号',
    'ja': '名前には文字、スペース、ハイフン、アポストロフィのみ使用できます',
    'ar': 'يمكن أن تحتوي الأسماء على أحرف ومسافات وشرطات وفواصل عليا فقط',
    'hi': 'नामों में केवल अक्षर, स्थान, हाइफ़न और एपोस्ट्रोफ़ी हो सकते हैं'
  },
  'loveCalculator.pleaseEnterBothNames': {
    'es': 'Por favor ingrese ambos nombres',
    'fr': 'Veuillez entrer les deux noms',
    'de': 'Bitte geben Sie beide Namen ein',
    'it': 'Inserisci entrambi i nomi',
    'pt': 'Por favor, insira ambos os nomes',
    'ru': 'Пожалуйста, введите оба имени',
    'zh': '请输入两个姓名',
    'ja': '両方の名前を入力してください',
    'ar': 'يرجى إدخال كلا الاسمين',
    'hi': 'कृपया दोनों नाम दर्ज करें'
  },
  'zodiacUI.shareTitle': {
    'es': 'Resultado de Compatibilidad Zodiacal',
    'fr': 'Résultat de Compatibilité Zodiacale',
    'de': 'Sternzeichen-Kompatibilitätsergebnis',
    'it': 'Risultato Compatibilità Zodiacale',
    'pt': 'Resultado de Compatibilidade Zodiacal',
    'ru': 'Результат Совместимости Знаков Зодиака',
    'zh': '星座兼容性结果',
    'ja': '星座相性結果',
    'ar': 'نتيجة توافق الأبراج',
    'hi': 'राशि संगतता परिणाम'
  }
};

function addKeyToLanguageFile(lang, keyPath, value) {
  const filePath = path.join(localesDir, `${lang}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Language file not found: ${filePath}`);
    return false;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const keys = keyPath.split('.');
    
    // Navigate to the correct nested object
    let current = data;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }
    
    // Add the final key-value pair
    const finalKey = keys[keys.length - 1];
    current[finalKey] = value;
    
    // Write back to file with proper formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${lang}.json:`, error.message);
    return false;
  }
}

function fixMissingTranslations() {
  console.log('🔧 FIXING TOP PRIORITY MISSING TRANSLATIONS\n');
  
  let totalFixed = 0;
  
  for (const [keyPath, langTranslations] of Object.entries(translations)) {
    console.log(`\n📝 Adding key: ${keyPath}`);
    
    for (const [lang, translation] of Object.entries(langTranslations)) {
      const success = addKeyToLanguageFile(lang, keyPath, translation);
      if (success) {
        console.log(`  ✅ ${lang}: "${translation}"`);
        totalFixed++;
      } else {
        console.log(`  ❌ ${lang}: Failed to add translation`);
      }
    }
  }
  
  console.log(`\n🎉 Fixed ${totalFixed} missing translations!`);
  console.log('\n🔍 Run validation again to check remaining missing keys.');
}

// Run the fix
fixMissingTranslations();