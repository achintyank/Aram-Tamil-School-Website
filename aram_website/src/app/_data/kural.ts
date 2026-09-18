import kurals from "./kurals.json";

// All 1330 kurals as [number, line 1, line 2, English explanation].
// Source: github.com/tk120404/thirukkural (Apache-2.0), trimmed to what the site shows.
const KURALS = kurals as [number, string, string, string][];

// The day Kural 1 is shown; after that it moves forward one kural per day and loops.
const START_DAY = Date.UTC(2026, 8, 17);
const TIME_ZONE = "America/Los_Angeles"; // the school's local midnight

export type Kural = { number: number; line1: string; line2: string; english: string; book: string; bookTa: string };

function book(n: number) {
  if (n <= 380) return { book: "Virtue", bookTa: "அறத்துப்பால்" };
  if (n <= 1080) return { book: "Wealth", bookTa: "பொருட்பால்" };
  return { book: "Love", bookTa: "காமத்துப்பால்" };
}

/** The kural for a given moment — the same for every visitor on the same school day. */
export function kuralOfTheDay(now = new Date()): Kural {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" })
    .format(now)
    .split("-")
    .map(Number);
  const day = Math.floor((Date.UTC(y, m - 1, d) - START_DAY) / 864e5);
  const [number, line1, line2, english] = KURALS[((day % KURALS.length) + KURALS.length) % KURALS.length];
  return { number, line1, line2, english, ...book(number) };
}
