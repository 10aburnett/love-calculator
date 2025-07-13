#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const localesDir = './public/locales';

// Batch 2: Top priority zodiac and quiz keys missing in multiple languages
const translations = {
  'zodiacMessages.starlitRomance': {
    'ru': 'Звездная романтика',
    'zh': '星光浪漫',
    'ja': '星降る夜のロマンス',
    'hi': 'तारों भरी रोमांस'
  },
  'zodiacMessages.uniqueConstellation': {
    'ru': 'Уникальное созвездие',
    'zh': '独特星座',
    'ja': 'ユニークな星座',
    'hi': 'अनोखा नक्षत्र'
  },
  'zodiacPatterns.harmonicTrine': {
    'ru': 'Гармоничная триада',
    'zh': '和谐三角',
    'ja': 'ハーモニックトライン',
    'hi': 'सामंजस्यपूर्ण त्रिकोण'
  },
  'zodiacPatterns.oppositeAttraction': {
    'ru': 'Притяжение противоположностей',
    'zh': '异性相吸',
    'ja': '対極の魅力',
    'hi': 'विपरीत आकर्षण'
  },
  'zodiacMessages.writtenInStars': {
    'zh': '星辰注定',
    'ja': '星に刻まれた運命',
    'hi': 'सितारों में लिखा'
  },
  'zodiacPatterns.twinSouls': {
    'zh': '双胞胎灵魂',
    'ja': 'ツインソウル',
    'hi': 'जुड़वा आत्माएं'
  },
  'zodiacPlanetaryMessages.samePlanet': {
    'zh': '同一行星',
    'ja': '同じ惑星',
    'hi': 'समान ग्रह'
  },
  'quizzes.communicationStyleQuiz.results.direct.description': {
    'ru': 'Вы цените честность и прямолинейность в общении. Ваш партнер ценит эту открытость.',
    'zh': '您重视沟通中的诚实和直接。您的伴侣欣赏这种开放性。'
  },
  'quizzes.communicationStyleQuiz.results.supportive.description': {
    'ru': 'Вы создаете пространство для поддержки и понимания. Ваше общение строится на эмпатии.',
    'zh': '您创造了支持和理解的空间。您的沟通建立在共情的基础上。'
  },
  'quizzes.communicationStyleQuiz.results.direct.title': {
    'ru': 'Прямое общение'
  },
  'quizzes.communicationStyleQuiz.results.supportive.title': {
    'ru': 'Поддерживающее общение'
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
  console.log('🔧 FIXING BATCH 2: ZODIAC & QUIZ MISSING TRANSLATIONS\n');
  
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