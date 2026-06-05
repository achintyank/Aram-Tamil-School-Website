export type EventType =
  | "school"
  | "special"
  | "leave"
  | "annual"
  | "graduation";

export type CalendarEvent = {
  date: string;
  type: EventType;
  title: string;
  description: string;
  mode?: "in-person" | "online";
  image?: string;
};

// --- School year boundaries -------------------------------------------------

export const SCHOOL_YEAR_START = "2026-08-01";
export const SCHOOL_YEAR_END = "2027-04-11";

export const SCHOOL_DESCRIPTION = "Tamil class for all grade levels.";

// --- Holidays / leaves ------------------------------------------------------
// Sundays listed here become "Leave / Holiday" cards (no class).
// You can list a single date, multiple dates, or generate a stretch via
// generateSundays(...). Group related dates under one entry.

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function generateSundays(
  startYear: number,
  startMonth: number,
  startDay: number,
  endYear: number,
  endMonth: number,
  endDay: number,
): string[] {
  const sundays: string[] = [];
  const d = new Date(startYear, startMonth, startDay);
  const end = new Date(endYear, endMonth, endDay);
  while (d <= end) {
    if (d.getDay() === 0) {
      sundays.push(
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      );
    }
    d.setDate(d.getDate() + 1);
  }
  return sundays;
}

export const holidays: {
  dates: string[];
  title: string;
  description: string;
}[] = [
  {
    dates: ["2026-12-27", "2027-01-03"],
    title: "Winter Break",
    description: "No classes — winter holiday break.",
  },
];

// --- Celebrations -----------------------------------------------------------
// These Sundays are STILL class days, but with cultural programming.

export const celebrations: {
  date: string;
  title: string;
  description: string;
}[] = [
  {
    date: "2026-11-08",
    title: "Diwali Celebration",
    description: "Festival of lights with cultural programs.",
  },
  {
    date: "2027-01-17",
    title: "Pongal Celebration",
    description: "Pongal harvest festival with cultural performances.",
  },
];

// --- Online days ------------------------------------------------------------
// Sundays that are still class days but held online instead of in-person.

export const onlineDays: string[] = [
  // "2026-02-15",
];

// --- Annual Day & Graduation -----------------------------------------------
// Standalone events. Can be any day of the week.

export const annualDay: { date: string; description: string } = {
  date: "2027-04-17",
  description: "Student performances, dances, music, and skits.",
};

export const graduation: { date: string; description: string } = {
  date: "2027-04-24",
  description: "Graduation ceremony for graduating students.",
};

export const summerBreak: { date: string; description: string } = {
  date: "2027-05-31",
  description: "Have a wonderful summer! See you next year.",
};
