// Browser-compatible phonetic and string similarity algorithms
// Avoiding Node.js dependencies by implementing core algorithms directly

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
 * Normalize name: trim whitespace, convert to lowercase, basic ASCII folding
 * Limitation: Non-Latin letters fall back to basic ASCII approximation
 */
function normalizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
    .replace(/[^a-z]/g, ''); // Keep only basic Latin letters
}

/**
 * S-metric: Initial letter proximity (0-100)
 * Uses alphabet distance scaling: S = (1 - dist/25) * 100
 * where dist = |a - b| (zero-based alphabet indices)
 * 
 * Examples:
 * - Same letters (A,A): dist=0, S=100
 * - Adjacent letters (A,B): dist=1, S=96
 * - Opposite ends (A,Z): dist=25, S=0
 */
function calculateInitialSimilarity(name1: string, name2: string): number {
  if (!name1 || !name2) return 0;
  
  // Get zero-based alphabet indices (a=0, b=1, ..., z=25)
  const a = name1.charCodeAt(0) - 97; // 'a' = 97
  const b = name2.charCodeAt(0) - 97;
  
  // Ensure valid alphabet characters
  if (a < 0 || a > 25 || b < 0 || b > 25) return 0;
  
  // Calculate alphabet distance
  const dist = Math.abs(a - b);
  
  // Scale to 0-100: S = (1 - dist/25) * 100
  const score = (1 - dist / 25) * 100;
  
  return Math.round(score * 10) / 10; // Round to 1 decimal place
}

/**
 * L-metric: Letter frequency cosine similarity
 * Creates 26-dimensional vectors of letter frequencies and calculates cosine similarity
 */
function calculateLetterFrequencySimilarity(name1: string, name2: string): number {
  const freq1 = getLetterFrequencies(name1);
  const freq2 = getLetterFrequencies(name2);
  
  const similarity = cosineSimilarity(freq1, freq2);
  return Math.round(similarity * 100 * 10) / 10; // Scale to 0-100, round to 1 dp
}

/**
 * Create a 26-dimensional vector of letter frequencies (a-z)
 */
function getLetterFrequencies(name: string): number[] {
  const frequencies = new Array(26).fill(0);
  const totalLetters = name.length;
  
  if (totalLetters === 0) return frequencies;
  
  for (const char of name) {
    const index = char.charCodeAt(0) - 97; // 'a' = 97
    if (index >= 0 && index < 26) {
      frequencies[index]++;
    }
  }
  
  // Normalize to frequencies (0-1)
  return frequencies.map(count => count / totalLetters);
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    norm1 += vec1[i] * vec1[i];
    norm2 += vec2[i] * vec2[i];
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
 * Each letter has a value: A=1, B=2, ..., Z=26
 */
function calculateDestinyNumber(name: string): number {
  let sum = 0;
  
  for (const char of name) {
    const value = char.charCodeAt(0) - 96; // 'a' = 1, 'b' = 2, etc.
    if (value >= 1 && value <= 26) {
      sum += value;
    }
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
 */
function getVowelRatio(name: string): number {
  if (name.length === 0) return 0;
  
  const vowels = 'aeiou';
  let vowelCount = 0;
  
  for (const char of name) {
    if (vowels.includes(char)) {
      vowelCount++;
    }
  }
  
  return vowelCount / name.length;
} 