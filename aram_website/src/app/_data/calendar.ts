// School-year calendar. Every Sunday between the start and end dates is a
// class day unless it's listed as a holiday below.

export type EventType = "school" | "special" | "leave" | "annual" | "graduation" | "summer";

export type CalendarEvent = {
  date: string;
  type: EventType;
  title: string;
  titleTa?: string;
  description: string;
  mode?: "in-person" | "online";
};

export const SCHOOL_YEAR_START = "2026-08-01";
export const SCHOOL_YEAR_END = "2027-04-11";
export const SCHOOL_DESCRIPTION = "Tamil class for all grade levels.";

/** Sundays with no class. Group related dates under one entry. */
export const holidays: { dates: string[]; title: string; titleTa?: string; description: string }[] = [
  {
    dates: ["2026-12-27", "2027-01-03"],
    title: "Winter Break",
    titleTa: "குளிர்கால விடுமுறை",
    description: "No classes — winter holiday break.",
  },
];

/** Still class days, but with cultural programming. */
export const celebrations: { date: string; title: string; titleTa?: string; description: string }[] = [
  {
    date: "2026-11-08",
    title: "Diwali Celebration",
    titleTa: "தீபாவளி",
    description: "Festival of lights with cultural programs.",
  },
  {
    date: "2027-01-17",
    title: "Pongal Celebration",
    titleTa: "பொங்கல்",
    description: "Pongal harvest festival with cultural performances.",
  },
];

/** Sundays that are class days but held online. */
export const onlineDays: string[] = [
  // "2026-02-15",
];

export const annualDay = {
  date: "2027-04-17",
  titleTa: "ஆண்டு விழா",
  description: "Student performances, dances, music, and skits.",
};

export const graduation = {
  date: "2027-04-24",
  titleTa: "பட்டமளிப்பு விழா",
  description: "Graduation ceremony for graduating students.",
};

export const summerBreak = {
  date: "2027-05-31",
  titleTa: "கோடை விடுமுறை",
  description: "Have a wonderful summer! See you next year.",
};

/** Short Tamil weekday names, Sunday first (matches Date.getDay()). */
export const TAMIL_WEEKDAYS = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];

/** e.g. "ஞாயிறு, Sep 20" */
export function tamilDayDate(d: Date) {
  return `${TAMIL_WEEKDAYS[d.getDay()]}, ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

export function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function buildTimeline(): CalendarEvent[] {
  const result: CalendarEvent[] = [];
  const holidayMap = new Map<string, (typeof holidays)[number]>();
  for (const h of holidays) for (const date of h.dates) holidayMap.set(date, h);
  const celebrationMap = new Map(celebrations.map((c) => [c.date, c]));
  const online = new Set(onlineDays);

  const d = new Date(`${SCHOOL_YEAR_START}T00:00:00`);
  const end = new Date(`${SCHOOL_YEAR_END}T00:00:00`);
  while (d <= end) {
    if (d.getDay() === 0) {
      const key = isoDate(d);
      const holiday = holidayMap.get(key);
      const celebration = celebrationMap.get(key);
      const mode = online.has(key) ? "online" : "in-person";
      if (holiday) {
        result.push({ date: key, type: "leave", title: holiday.title, titleTa: holiday.titleTa, description: holiday.description });
      } else if (celebration) {
        result.push({ date: key, type: "special", title: celebration.title, titleTa: celebration.titleTa, description: celebration.description, mode });
      } else {
        result.push({ date: key, type: "school", title: "Class", description: SCHOOL_DESCRIPTION, mode });
      }
    }
    d.setDate(d.getDate() + 1);
  }

  result.push(
    { date: annualDay.date, type: "annual", title: "Annual Day", titleTa: annualDay.titleTa, description: annualDay.description },
    { date: graduation.date, type: "graduation", title: "Graduation", titleTa: graduation.titleTa, description: graduation.description },
    { date: summerBreak.date, type: "summer", title: "Summer Break", titleTa: summerBreak.titleTa, description: summerBreak.description },
  );
  return result.sort((a, b) => a.date.localeCompare(b.date));
}

/** First class Sunday at or after `now` (10 AM), skipping holidays. */
export function nextClass(now: Date) {
  const leave = new Set(holidays.flatMap((h) => h.dates));
  const d = new Date(now);
  d.setHours(10, 0, 0, 0);
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
  if (d <= now) d.setDate(d.getDate() + 7);
  while (leave.has(isoDate(d))) d.setDate(d.getDate() + 7);
  return d;
}

/** Next non-regular event (celebration, annual day, …) on or after today. */
export function nextHighlight(now: Date) {
  const today = isoDate(now);
  return buildTimeline().find((e) => e.type !== "school" && e.type !== "leave" && e.date >= today);
}
