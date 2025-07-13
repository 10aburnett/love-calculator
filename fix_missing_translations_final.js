#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const localesDir = './public/locales';

// Final batch: Complete the remaining 15 missing translations
const translations = {
  // Portuguese relationship quiz results
  'quizzes.relationshipQuiz.results.goodFoundation.message': {
    'pt': 'Vocês têm uma base sólida. Com comunicação aberta e respeito mútuo, sua relação pode florescer.'
  },
  'quizzes.relationshipQuiz.results.goodFoundation.title': {
    'pt': 'Base Sólida'
  },
  'quizzes.relationshipQuiz.results.perfectMatch.message': {
    'pt': 'Vocês são uma combinação perfeita! Seus valores, objetivos e estilos de comunicação estão em perfeita harmonia.'
  },
  'quizzes.relationshipQuiz.results.perfectMatch.title': {
    'pt': 'Combinação Perfeita'
  },
  
  // Russian zodiac messages
  'zodiacElementMessages.fireAir': {
    'ru': 'Огонь и воздух'
  },
  'zodiacMessages.stellarConnection': {
    'ru': 'Звездная связь'
  },
  'zodiacPatterns.supportiveSextile': {
    'ru': 'Поддерживающий секстиль'
  },
  
  // Chinese quiz results
  'quizzes.conflictResolutionQuiz.results.avoiding.description': {
    'zh': '您倾向于避免冲突，更喜欢和谐的环境。这可以保持平静，但重要的是也要能处理必要的讨论。'
  },
  'quizzes.conflictResolutionQuiz.results.compromising.description': {
    'zh': '您擅长寻找中间地带，愿意为了关系和谐而做出让步。这是维持健康关系的宝贵技能。'
  },
  'quizzes.futureGoalsCompatibility.results.wellMatched.message': {
    'zh': '您的未来目标很好地互补。你们都有清晰的方向，可以相互支持实现梦想。'
  },
  'quizzes.futureGoalsCompatibility.results.wellMatched.title': {
    'zh': '目标匹配'
  },
  'quizzes.loveLanguageAssessment.results.actsOfService.description': {
    'zh': '您通过行动表达爱意。为伴侣做事、提供帮助是您展现关怀的方式。'
  },
  'quizzes.loveLanguageAssessment.results.physicalTouch.description': {
    'zh': '身体接触对您来说非常重要。拥抱、牵手和其他温柔的触碰是您感受和表达爱的主要方式。'
  },
  'quizzes.loveLanguageAssessment.results.receivingGifts.description': {
    'zh': '礼物对您有特殊意义。不是因为物质价值，而是因为它们代表着对方的心意和关怀。'
  },
  
  // Japanese zodiac element
  'zodiacElementMessages.earthWater': {
    'ja': '土と水'
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
  console.log('🔧 FINAL BATCH: COMPLETING ALL REMAINING TRANSLATIONS\n');
  
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
  console.log('\n🔍 Run validation again to verify ALL translations are complete.');
}

// Run the fix
fixMissingTranslations();