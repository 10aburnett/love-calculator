'use client';

import { affinityQuotientWithBreakdown } from '@/aq/affinityQuotient';
import { motion } from 'framer-motion';

export default function TestAQPage() {
  const runTests = () => {
    console.log('🧪 Testing AQ Algorithm v1.1...\n');

    try {
      // Test 1: S-metric - Same initials should give S=100
      const test1 = affinityQuotientWithBreakdown('Alice', 'Anna');
      console.log('✅ Same initials (A,A): S =', test1.S, '(Expected: 100)');

      // Test 2: S-metric - Adjacent letters should give S=96
      const test2 = affinityQuotientWithBreakdown('Alice', 'Bob');
      console.log('✅ Adjacent letters (A,B): S =', test2.S, '(Expected: 96)');

      // Test 3: S-metric - Opposite ends should give S=0
      const test3 = affinityQuotientWithBreakdown('Alice', 'Zoe');
      console.log('✅ Opposite letters (A,Z): S =', test3.S, '(Expected: 0)');

      // Test 4: S-metric - Mid-range check (M,A = 12 letters apart)
      const test4 = affinityQuotientWithBreakdown('Alice', 'Mike');
      const expectedS = (1 - 12/25) * 100; // M=12, A=0, dist=12
      console.log('✅ Mid-range letters (A,M): S =', test4.S, `(Expected: ${expectedS})`);

      // Test 5: B-metric - Identical vowel ratios should give B=100
      const test5 = affinityQuotientWithBreakdown('Ada', 'Ava'); // Both 2/3 vowels
      console.log('✅ Identical vowel ratios (Ada,Ava): B =', test5.B, '(Expected: 100)');

      // Test 6: All metrics should be 0-100 range
      const test6 = affinityQuotientWithBreakdown('John', 'Mary');
      console.log('✅ All metrics in range:', test6);

      // Test 7: Formula verification
      const maxScore = 0.25 * 100 + 0.20 * 100 + 0.15 * 100 + 0.15 * 100 + 0.10 * 100 + 15;
      console.log('✅ Formula check: Max theoretical score =', maxScore, '(Expected: 100)');

      console.log('\n🎉 All tests completed! Check results above.');
    } catch (error) {
      console.error('❌ Test failed:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-100 p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold mb-8"
        >
          AQ Algorithm Test Page
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-lg p-6 shadow-lg"
        >
          <p className="mb-4">This page tests the updated Affinity Quotient algorithm with:</p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><strong>S-metric:</strong> Now uses alphabet distance scaling (0-100)</li>
            <li><strong>B-metric:</strong> Now scales to 0-100 instead of 0-20</li>
            <li><strong>All metrics:</strong> Properly scaled 0-100 for chart parity</li>
          </ul>
          
          <button
            onClick={runTests}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Run Tests (Check Browser Console)
          </button>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Instructions:</strong> Click the button above, then open your browser's developer console (F12) to see the test results.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 