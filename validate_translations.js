#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read all translation keys from the codebase
const translationKeysFile = './clean_translation_keys.txt';
const localesDir = './public/locales';

// Languages to check
const languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'];

function loadTranslationKeys() {
  if (!fs.existsSync(translationKeysFile)) {
    console.error('❌ Translation keys file not found. Run extraction first.');
    process.exit(1);
  }
  
  const content = fs.readFileSync(translationKeysFile, 'utf-8');
  return content.split('\n').filter(key => key.trim() !== '');
}

function loadLanguageFile(lang) {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Language file not found: ${filePath}`);
    return null;
  }
  
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error(`❌ Error parsing ${lang}.json:`, error.message);
    return null;
  }
}

function checkKeyExists(obj, keyPath) {
  const keys = keyPath.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return false;
    }
    if (!(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return current !== null && current !== undefined && current !== '';
}

function validateTranslations() {
  console.log('🔍 COMPREHENSIVE TRANSLATION VALIDATION\n');
  
  const translationKeys = loadTranslationKeys();
  console.log(`📋 Found ${translationKeys.length} translation keys to validate\n`);
  
  const results = {};
  let totalMissing = 0;
  
  // Load all language files
  const languageData = {};
  for (const lang of languages) {
    languageData[lang] = loadLanguageFile(lang);
    if (!languageData[lang]) {
      console.error(`❌ Failed to load ${lang}.json`);
      return;
    }
  }
  
  // Check each key in each language
  for (const key of translationKeys) {
    const missingInLanguages = [];
    
    for (const lang of languages) {
      if (!checkKeyExists(languageData[lang], key)) {
        missingInLanguages.push(lang);
        totalMissing++;
      }
    }
    
    if (missingInLanguages.length > 0) {
      results[key] = missingInLanguages;
    }
  }
  
  // Report results
  console.log('📊 VALIDATION RESULTS:\n');
  
  if (Object.keys(results).length === 0) {
    console.log('✅ ALL TRANSLATIONS COMPLETE! No missing keys found.');
    return;
  }
  
  console.log(`❌ Found ${Object.keys(results).length} keys with missing translations`);
  console.log(`🚨 Total missing translations: ${totalMissing}\n`);
  
  // Group by language to see which languages need the most work
  const missingByLanguage = {};
  for (const lang of languages) {
    missingByLanguage[lang] = [];
  }
  
  for (const [key, missingLangs] of Object.entries(results)) {
    for (const lang of missingLangs) {
      missingByLanguage[lang].push(key);
    }
  }
  
  console.log('📋 MISSING TRANSLATIONS BY LANGUAGE:\n');
  for (const lang of languages) {
    const count = missingByLanguage[lang].length;
    const status = count === 0 ? '✅' : '❌';
    console.log(`${status} ${lang.toUpperCase()}: ${count} missing keys`);
    
    if (count > 0 && count <= 10) {
      // Show first few missing keys for languages with few issues
      console.log(`   Missing: ${missingByLanguage[lang].slice(0, 5).join(', ')}${count > 5 ? '...' : ''}`);
    }
  }
  
  console.log('\n🔍 DETAILED MISSING KEYS:\n');
  for (const [key, missingLangs] of Object.entries(results)) {
    console.log(`❌ "${key}" missing in: ${missingLangs.join(', ')}`);
  }
  
  // Generate fix commands
  console.log('\n🛠️  NEXT STEPS:\n');
  console.log('1. Review the missing keys above');
  console.log('2. Add missing translations to respective language files');
  console.log('3. Run this script again to verify fixes');
  console.log('\n💡 TIP: Start with the English file to ensure all keys exist there first.');
}

// Run validation
validateTranslations();