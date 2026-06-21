import type { Locale } from '@/i18n/request';
import type { DailyInsight, RotationalContent } from './dailyContentTypes';
import { getRotationalContent } from '@/content/rotational';

// Number of whole UTC days since the Unix epoch. Using UTC (not local time)
// keeps server render and client hydration in agreement.
function utcDayIndex(date: Date): number {
  return Math.floor(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86_400_000,
  );
}

// Deterministic 32-bit PRNG (mulberry32). Same seed -> same sequence, so every
// render of the same day produces identical content (no hydration mismatch).
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deterministic Fisher–Yates shuffle of [0..n-1] seeded by `seed`.
function seededOrder(n: number, seed: number): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  const rand = mulberry32(seed);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// "Shuffle bag" pick: every item in the pool is shown exactly once per cycle
// before any repeats, and the order is reshuffled each full cycle. So a given
// item can't recur sooner than (pool length) days apart, and successive cycles
// don't line up — maximising variation without ever feeling random/janky.
function shuffleBagPick<T>(pool: T[], dayIndex: number, salt: number): T {
  const n = pool.length;
  if (n === 0) throw new Error('shuffleBagPick: empty content pool');
  const pos = ((dayIndex % n) + n) % n;
  const cycle = Math.floor(dayIndex / n);
  // Distinct salt per category so tip/fact/quote rotate independently rather
  // than marching in lockstep.
  const order = seededOrder(n, (Math.imul(cycle, 2654435761) + salt) >>> 0);
  return pool[order[pos]];
}

const SALT = { tip: 0x1111, fact: 0x2222, quote: 0x3333 } as const;

/**
 * Resolve the rotating "Daily Love Insight" for a given locale and date.
 * Deterministic by UTC calendar day — call it on the server and pass the result
 * down as props so the SSR HTML (what crawlers read) is stable for the day.
 */
export function getDailyInsight(locale: string, date: Date = new Date()): DailyInsight {
  const content: RotationalContent = getRotationalContent(locale as Locale);
  const dayIndex = utcDayIndex(date);
  const iso = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  )
    .toISOString()
    .slice(0, 10);

  return {
    tip: shuffleBagPick(content.tips, dayIndex, SALT.tip),
    fact: shuffleBagPick(content.facts, dayIndex, SALT.fact),
    quote: shuffleBagPick(content.quotes, dayIndex, SALT.quote),
    date: iso,
  };
}
