// Announcements are edited in a Google Sheet (columns: title, body,
// startDate, endDate, urgent) and fetched as CSV, refreshed every minute.

export type Announcement = {
  title: string;
  body: string;
  startDate: string;
  endDate: string;
  urgent: boolean;
};

const CSV_URL =
  process.env.NEXT_PUBLIC_ANNOUNCEMENTS_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/1y5xZhtKuzLuVtilbWpVGURTLpGPieDm0gHT1-RAPfQk/export?format=csv&gid=0";

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (field !== "" || row.length > 0) {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      }
      if (c === "\r" && text[i + 1] === "\n") i++;
    } else field += c;
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  try {
    const res = await fetch(CSV_URL, { next: { revalidate: 60, tags: ["announcements"] } });
    if (!res.ok) return [];
    const rows = parseCSV((await res.text()).trim());
    if (rows.length < 2) return [];
    const header = rows[0].map((h) => h.trim().toLowerCase());
    const col = (r: string[], name: string) => (r[header.indexOf(name)] ?? "").trim();
    return rows
      .slice(1)
      .filter((r) => r.some((c) => c.trim()))
      .map((r) => ({
        title: col(r, "title"),
        body: col(r, "body"),
        startDate: col(r, "startdate"),
        endDate: col(r, "enddate"),
        urgent: ["true", "1", "yes"].includes(col(r, "urgent").toLowerCase()),
      }))
      .filter((a) => a.title);
  } catch {
    return [];
  }
}
