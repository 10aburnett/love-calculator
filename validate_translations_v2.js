#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Updated validation with better filtering
const translationKeysFile = './clean_translation_keys_v2.txt';
const localesDir = './public/locales';

// Languages to check
const languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'];

function loadTranslationKeys() {
  if (!fs.existsSync(translationKeysFile)) {
    console.error('❌ Translation keys file not found. Run extraction first.');
    process.exit(1);
  }
  
  const content = fs.readFileSync(translationKeysFile, 'utf-8');
  const keys = content.split('\n').filter(key => {
    key = key.trim();
    // Filter out invalid keys
    if (key === '' || key.length < 3) return false;
    if (!key.includes('.')) return false;
    if (key.startsWith('Please ') || key.startsWith('Sorry')) return false;
    if (key.includes(' ')) return false;
    return true;
  });
  return keys;
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
  console.log('🔍 COMPREHENSIVE TRANSLATION VALIDATION v2\n');
  
  const translationKeys = loadTranslationKeys();
  console.log(`📋 Found ${translationKeys.length} valid translation keys to validate\n`);
  
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
  
  console.log('\n🔍 TOP PRIORITY MISSING KEYS:\n');
  const sortedResults = Object.entries(results).sort((a, b) => b[1].length - a[1].length);
  
  for (const [key, missingLangs] of sortedResults.slice(0, 15)) {
    console.log(`❌ "${key}" missing in ${missingLangs.length} languages: ${missingLangs.join(', ')}`);
  }
  
  // Check for keys missing in all languages (likely unused)
  console.log('\n🗑️  KEYS MISSING IN ALL LANGUAGES (Possibly Unused):');
  const unusedKeys = sortedResults.filter(([key, missingLangs]) => missingLangs.length === languages.length);
  
  if (unusedKeys.length > 0) {
    console.log(`Found ${unusedKeys.length} keys missing in ALL languages:`);
    unusedKeys.forEach(([key]) => console.log(`  - "${key}"`));
  } else {
    console.log('None found.');
  }
  
  // Generate fix commands
  console.log('\n🛠️  NEXT STEPS:\n');
  console.log('1. Start with keys missing in many languages (likely newly added)');
  console.log('2. Add missing translations to respective language files');
  console.log('3. Focus on languages with the most missing translations first');
  console.log('4. Run this script again to verify fixes');
}

// Run validation
validateTranslations();