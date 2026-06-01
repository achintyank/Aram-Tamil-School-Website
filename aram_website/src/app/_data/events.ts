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
  image?: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function generateSundays(
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
      sundays.push(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
    }
    d.setDate(d.getDate() + 1);
  }
  return sundays;
}

const summerBreak: CalendarEvent[] = generateSundays(
  2026,
  3,
  19,
  2026,
  7,
  16,
).map((date) => ({
  date,
  type: "leave",
  title: "Summer Break",
  description: "No classes — summer break.",
}));

export const events: CalendarEvent[] = [
  {
    date: "2026-01-11",
    type: "special",
    title: "Pongal Celebration",
    description: "Pongal harvest festival with cultural performances.",
  },
  {
    date: "2026-04-18",
    type: "annual",
    title: "Annual Day",
    description: "Student performances, dances, music, and skits.",
  },
  {
    date: "2026-04-25",
    type: "graduation",
    title: "Graduation",
    description: "Graduation ceremony for graduating students.",
  },
  ...summerBreak,
  {
    date: "2026-11-08",
    type: "special",
    title: "Diwali Celebration",
    description: "Festival of lights with cultural programs.",
  },
  {
    date: "2026-12-27",
    type: "leave",
    title: "Winter Break",
    description: "No classes — winter holiday break.",
  },
];

export const SCHOOL_DESCRIPTION = "Tamil class for all grade levels.";
