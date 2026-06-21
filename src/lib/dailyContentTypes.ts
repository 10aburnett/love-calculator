// Shared types for the rotational "Daily Love Insight" content system.
// Kept in its own module so content data files can import the type without
// pulling in the engine (and its dependencies).

export interface Quote {
  text: string;
  author: string;
}

export interface RotationalContent {
  /** "Relationship insight of the day" — warm, useful, self-contained advice. */
  tips: string[];
  /** "Did you know" style facts about love, attraction and relationships. */
  facts: string[];
  /** Attributed love/relationship quotes. */
  quotes: Quote[];
}

/** The resolved content for a single day, ready to render. */
export interface DailyInsight {
  tip: string;
  fact: string;
  quote: Quote;
  /** ISO date (YYYY-MM-DD, UTC) this insight corresponds to. */
  date: string;
}
