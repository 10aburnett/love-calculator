// Browser-compatible phonetic and string similarity algorithms
// Avoiding Node.js dependencies by implementing core algorithms directly
import { 
  normalizeUnicodeName, 
  keepOnlyUnicodeLetters, 
  getUnicodeCharValue, 
  getUnicodeAlphabetDistance,
  getUnicodeCharFrequencies,
  isUnicodeVowel 
} from '@/utils/unicodeUtils';

/**
 * Interface representing the breakdown of AQ sub-scores
 */
export interface AQBreakdown {
  S: number; // Initial letter proximity (0-100, based on alphabet distance)
  L: number; // Letter frequency cosine similarity (0-100)
  P: number; // Phonetic similarity via simplified sound matching (0-100)
  N: number; // Numerological compatibility (0-100)
  B: number; // Vowel balance similarity (0-100)
  final: number; // Final AQ score (0-100)
}

/**
 * Calculate the Affinity Quotient (AQ) between two names using a literature-based algorithm.
 * 
 * The algorithm combines five metrics:
 * - S: Initial letter proximity (0-100, based on alphabet distance)
 * - L: Letter frequency cosine similarity (0-100)
 * - P: Phonetic similarity using simplified sound matching (0-100)
 * - N: Numerological compatibility based on destiny numbers (0-100)
 * - B: Vowel balance similarity (0-100)
 * 
 * Final score: AQ_raw = 0.25·L + 0.20·P + 0.15·S + 0.15·B + 0.10·N + 15
 * 
 * @param name1 - First name to compare (trimmed, non-empty)
 * @param name2 - Second name to compare (trimmed, non-empty)
 * @returns AQ score from 0-100 (rounded to 1 decimal place)
 * @throws Error if either name is empty after trimming
 */
export function affinityQuotient(name1: string, name2: string): number {
  const breakdown = affinityQuotientWithBreakdown(name1, name2);
  return breakdown.final;
}

/**
 * Calculate the Affinity Quotient with detailed breakdown of all sub-scores.
 * 
 * @param name1 - First name to compare
 * @param name2 - Second name to compare
 * @returns Object containing all sub-scores and final AQ score
 * @throws Error if either name is empty after trimming
 */
export function affinityQuotientWithBreakdown(name1: string, name2: string): AQBreakdown {
  // Validation and normalization
  const n1 = normalizeName(name1);
  const n2 = normalizeName(name2);
  
  if (!n1 || !n2) {
    throw new Error('Both names must be non-empty after trimming');
  }

  // Calculate each sub-metric
  const S = calculateInitialSimilarity(n1, n2);
  const L = calculateLetterFrequencySimilarity(n1, n2);
  const P = calculatePhoneticSimilarity(n1, n2);
  const N = calculateNumerologicalCompatibility(n1, n2);
  const B = calculateVowelBalanceSimilarity(n1, n2);

  // Apply weights and calculate final score
  // AQ_raw = 0.25·L + 0.20·P + 0.15·S + 0.15·B + 0.10·N + 15
  const rawScore = 0.25 * L + 0.20 * P + 0.15 * S + 0.15 * B + 0.10 * N + 15;
  
  // Clip to [0,100] and round to 1 decimal place
  const final = Math.round(Math.max(0, Math.min(100, rawScore)) * 10) / 10;

  return { S, L, P, N, B, final };
}

/**
 * Normalize name: trim whitespace, convert to lowercase, proper Unicode normalization
 * Now supports all Unicode letters from any script
 */
function normalizeName(name: string): string {
  return keepOnlyUnicodeLetters(normalizeUnicodeName(name));
}

/**
 * S-metric: Initial letter proximity (0-100)
 * Now supports Unicode characters from any script
 */
function calculateInitialSimilarity(name1: string, name2: string): number {
  if (!name1 || !name2) return 0;
  
  // Get first characters (properly handle multi-byte Unicode)
  const chars1 = Array.from(name1);
  const chars2 = Array.from(name2);
  
  if (chars1.length === 0 || chars2.length === 0) return 0;
  
  // Use Unicode-aware alphabet distance
  const dist = getUnicodeAlphabetDistance(chars1[0], chars2[0]);
  
  // Scale to 0-100: S = (1 - dist/25) * 100
  const score = (1 - dist / 25) * 100;
  
  return Math.round(score * 10) / 10; // Round to 1 decimal place
}

/**
 * L-metric: Letter frequency cosine similarity
 * Now supports Unicode characters
 */
function calculateLetterFrequencySimilarity(name1: string, name2: string): number {
  const freq1 = getLetterFrequencies(name1);
  const freq2 = getLetterFrequencies(name2);
  
  const similarity = cosineSimilarityMaps(freq1, freq2);
  return Math.round(similarity * 100 * 10) / 10; // Scale to 0-100, round to 1 dp
}

/**
 * Create a frequency map for all unique characters in a name
 * Now returns a Map to handle Unicode characters properly
 */
function getLetterFrequencies(name: string): Map<string, number> {
  const frequencies = getUnicodeCharFrequencies(name);
  const totalLetters = Array.from(name).length;
  
  if (totalLetters === 0) return frequencies;
  
  // Normalize to frequencies (0-1)
  for (const [char, count] of frequencies) {
    frequencies.set(char, count / totalLetters);
  }
  
  return frequencies;
}

/**
 * Calculate cosine similarity between two frequency maps
 * Updated to work with Maps instead of arrays
 */
function cosineSimilarityMaps(map1: Map<string, number>, map2: Map<string, number>): number {
  // Get all unique characters from both maps
  const allChars = new Set([...map1.keys(), ...map2.keys()]);
  
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  
  for (const char of allChars) {
    const val1 = map1.get(char) || 0;
    const val2 = map2.get(char) || 0;
    
    dotProduct += val1 * val2;
    norm1 += val1 * val1;
    norm2 += val2 * val2;
  }
  
  const magnitude = Math.sqrt(norm1) * Math.sqrt(norm2);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}

/**
 * P-metric: Phonetic similarity using simplified sound matching
 * Browser-compatible implementation without external dependencies
 */
function calculatePhoneticSimilarity(name1: string, name2: string): number {
  // Simplified phonetic encoding (browser-compatible)
  const sound1 = simplePhoneticCode(name1);
  const sound2 = simplePhoneticCode(name2);
  
  // Calculate similarity using edit distance
  const distance = editDistance(sound1, sound2);
  const maxLength = Math.max(sound1.length, sound2.length);
  
  if (maxLength === 0) return 100;
  
  const similarity = (1 - distance / maxLength) * 100;
  return Math.round(similarity * 10) / 10;
}

/**
 * Simplified phonetic encoding (browser-compatible alternative to Double Metaphone)
 */
function simplePhoneticCode(name: string): string {
  return name
    // Replace similar sounding consonants
    .replace(/[ck]/g, 'k')
    .replace(/[sz]/g, 's')
    .replace(/[fv]/g, 'f')
    .replace(/[bp]/g, 'b')
    .replace(/[dt]/g, 'd')
    .replace(/[gj]/g, 'g')
    .replace(/[mn]/g, 'n')
    // Remove silent letters and duplicates
    .replace(/h/g, '')
    .replace(/(.)\1+/g, '$1') // Remove consecutive duplicates
    // Simplify vowel sounds
    .replace(/[aeiou]/g, 'a');
}

/**
 * Calculate edit distance between two strings (Levenshtein distance)
 */
function editDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  
  const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null));
  
  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;
  
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,     // deletion
        matrix[i][j - 1] + 1,     // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  return matrix[len1][len2];
}

/**
 * N-metric: Numerological compatibility based on destiny numbers
 * Destiny number is the digital root (1-9) of the sum of letter values
 */
function calculateNumerologicalCompatibility(name1: string, name2: string): number {
  const destiny1 = calculateDestinyNumber(name1);
  const destiny2 = calculateDestinyNumber(name2);
  
  const difference = Math.abs(destiny1 - destiny2);
  const score = 100 - 2.5 * difference;
  
  return Math.max(0, Math.round(score * 10) / 10);
}

/**
 * Calculate destiny number (digital root 1-9) for a name
 * Now uses Unicode-aware character values
 */
function calculateDestinyNumber(name: string): number {
  let sum = 0;
  const chars = Array.from(name); // Handle multi-byte Unicode
  
  for (const char of chars) {
    sum += getUnicodeCharValue(char);
  }
  
  // Calculate digital root (1-9)
  while (sum > 9) {
    sum = Math.floor(sum / 10) + (sum % 10);
  }
  
  return sum || 1; // Ensure at least 1
}

/**
 * B-metric: Vowel balance similarity (0-100)
 * Compares vowel ratios between names: B = (1 - |v₁ - v₂|) * 100
 * where vᵢ = vowels÷length of name i
 */
function calculateVowelBalanceSimilarity(name1: string, name2: string): number {
  const vowelRatio1 = getVowelRatio(name1);
  const vowelRatio2 = getVowelRatio(name2);
  
  const difference = Math.abs(vowelRatio1 - vowelRatio2);
  const score = (1 - difference) * 100; // Scale to 0-100
  
  return Math.max(0, Math.round(score * 10) / 10);
}

/**
 * Calculate the ratio of vowels to total letters in a name
 * Now supports vowels from multiple scripts
 */
function getVowelRatio(name: string): number {
  if (name.length === 0) return 0;
  
  const chars = Array.from(name); // Handle multi-byte Unicode
  let vowelCount = 0;
  
  for (const char of chars) {
    if (isUnicodeVowel(char)) {
      vowelCount++;
    }
  }
  
  return vowelCount / chars.length;
} 