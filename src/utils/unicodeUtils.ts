/**
 * Unicode-aware utility functions for multilingual name processing
 * Supports all Unicode letter characters (UTF-8) for global compatibility
 */

/**
 * Normalize a name for consistent processing while preserving Unicode characters
 * @param name - The name to normalize
 * @returns Normalized name with Unicode letters preserved
 */
export function normalizeUnicodeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFKC'); // Use NFKC normalization for better Unicode compatibility
}

/**
 * Check if a string contains only valid name characters (Unicode letters, marks, spaces, hyphens, apostrophes)
 * @param name - The name to validate
 * @returns true if valid, false otherwise
 */
export function isValidUnicodeName(name: string): boolean {
  // Allow Unicode letters (\p{L}), combining marks (\p{M}), spaces, hyphens, and apostrophes
  // \p{M} is crucial for languages like Hindi, Arabic, Thai that use combining characters
  const validNameRegex = /^[\p{L}\p{M}\s'-]+$/u;
  return validNameRegex.test(name);
}

/**
 * Get the character code value for scoring, supporting all Unicode ranges
 * Maps characters to consistent numeric values for scoring
 * @param char - The character to score
 * @returns Numeric value for the character
 */
export function getUnicodeCharValue(char: string): number {
  const code = char.charCodeAt(0);
  
  // For basic Latin (a-z), return traditional 1-26 values
  if (code >= 97 && code <= 122) {
    return code - 96; // a=1, b=2, ..., z=26
  }
  
  // For other scripts, use a modulo approach to map to 1-26 range
  // This ensures consistent scoring across all languages
  return ((code % 26) || 26);
}

/**
 * Get the alphabet distance between two characters, supporting Unicode
 * @param char1 - First character
 * @param char2 - Second character
 * @returns Distance between characters (0-25)
 */
export function getUnicodeAlphabetDistance(char1: string, char2: string): number {
  const val1 = getUnicodeCharValue(char1);
  const val2 = getUnicodeCharValue(char2);
  
  // Calculate circular distance (like on a wheel of 26 positions)
  const directDistance = Math.abs(val1 - val2);
  const circularDistance = Math.min(directDistance, 26 - directDistance);
  
  return circularDistance;
}

/**
 * Create a frequency vector for all unique characters in a name
 * @param name - The normalized name
 * @returns Map of character to frequency
 */
export function getUnicodeCharFrequencies(name: string): Map<string, number> {
  const frequencies = new Map<string, number>();
  const chars = Array.from(name); // Handle multi-byte Unicode properly
  
  for (const char of chars) {
    if (/\p{L}/u.test(char)) { // Only count letters
      frequencies.set(char, (frequencies.get(char) || 0) + 1);
    }
  }
  
  return frequencies;
}

/**
 * Calculate hash value for Unicode strings (used for easter egg matching)
 * @param str - The string to hash
 * @returns Hash value
 */
export function hashUnicodeString(str: string): number {
  let hash = 0;
  const chars = Array.from(str); // Handle multi-byte Unicode
  
  for (let i = 0; i < chars.length; i++) {
    hash = chars[i].charCodeAt(0) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash);
}

/**
 * Remove all non-letter characters while preserving Unicode letters and combining marks
 * @param name - The name to clean
 * @returns Name with only Unicode letters and combining marks
 */
export function keepOnlyUnicodeLetters(name: string): string {
  // Keep Unicode letters (\p{L}) and combining marks (\p{M})
  // Combining marks are essential for proper rendering of many scripts
  return name.replace(/[^\p{L}\p{M}]/gu, '');
}

/**
 * Check if a character is a vowel in any language
 * Includes vowels from multiple scripts
 * @param char - The character to check
 * @returns true if vowel, false otherwise
 */
export function isUnicodeVowel(char: string): boolean {
  const vowelRanges = [
    // Latin vowels
    'aeiouAEIOU',
    // Extended Latin vowels
    'àáâãäåæèéêëìíîïòóôõöøùúûüýÿ',
    'ÀÁÂÃÄÅÆÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝŸ',
    // Cyrillic vowels
    'аеёиоуыэюяАЕЁИОУЫЭЮЯ',
    // Greek vowels
    'αειουηωΑΕΙΟΥΗΩ',
    // Arabic vowels (long vowels and diacritics)
    'اوي',
    // Hebrew vowels
    'אהוי',
    // Devanagari vowels
    'अआइईउऊएऐओऔ',
    // Japanese vowels (hiragana and katakana)
    'あいうえおアイウエオ',
    // Chinese vowel indicators (pinyin)
    'aeiouüāēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ'
  ].join('');
  
  return vowelRanges.includes(char);
}

/**
 * Get script/alphabet type for a character
 * @param char - The character to analyze
 * @returns Script identifier
 */
export function getUnicodeScript(char: string): string {
  const code = char.charCodeAt(0);
  
  // Basic Latin
  if (code >= 0x0000 && code <= 0x007F) return 'latin';
  // Latin Extended
  if (code >= 0x0080 && code <= 0x024F) return 'latin-extended';
  // Cyrillic
  if (code >= 0x0400 && code <= 0x04FF) return 'cyrillic';
  // Greek
  if (code >= 0x0370 && code <= 0x03FF) return 'greek';
  // Arabic
  if (code >= 0x0600 && code <= 0x06FF) return 'arabic';
  // Hebrew
  if (code >= 0x0590 && code <= 0x05FF) return 'hebrew';
  // Devanagari
  if (code >= 0x0900 && code <= 0x097F) return 'devanagari';
  // Chinese/Japanese/Korean (CJK)
  if (code >= 0x4E00 && code <= 0x9FFF) return 'cjk';
  // Hiragana
  if (code >= 0x3040 && code <= 0x309F) return 'hiragana';
  // Katakana
  if (code >= 0x30A0 && code <= 0x30FF) return 'katakana';
  // Korean Hangul
  if (code >= 0xAC00 && code <= 0xD7AF) return 'hangul';
  
  return 'other';
} 