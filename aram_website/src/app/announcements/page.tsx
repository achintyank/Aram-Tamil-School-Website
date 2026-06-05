import AnnouncementsRefresh from "../_components/AnnouncementsRefresh";

export const metadata = {
  title: "Announcements | Aram Tamil School",
  description: "Latest announcements from Aram Tamil School.",
};

export const revalidate = 60;

type Announcement = {
  title: string;
  body: string;
  startDate: string;
  endDate: string;
  urgent: boolean;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

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
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
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
      } else {
        field += c;
      }
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const ANNOUNCEMENTS_CSV_URL =
  process.env.NEXT_PUBLIC_ANNOUNCEMENTS_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/1y5xZhtKuzLuVtilbWpVGURTLpGPieDm0gHT1-RAPfQk/export?format=csv&gid=0";

async function fetchAnnouncements(): Promise<Announcement[]> {
  const url = ANNOUNCEMENTS_CSV_URL;
  if (!url) return [];

  try {
    const res = await fetch(url, {
      next: { revalidate: 60, tags: ["announcements"] },
    });
    if (!res.ok) return [];
    const text = await res.text();
    const rows = parseCSV(text.trim());
    if (rows.length < 2) return [];

    const header = rows[0].map((h) => h.trim().toLowerCase());
    const idx = {
      title: header.indexOf("title"),
      body: header.indexOf("body"),
      start: header.indexOf("startdate"),
      end: header.indexOf("enddate"),
      urgent: header.indexOf("urgent"),
    };

    const list: Announcement[] = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.every((c) => !c.trim())) continue;
      list.push({
        title: (r[idx.title] ?? "").trim(),
        body: (r[idx.body] ?? "").trim(),
        startDate: (r[idx.start] ?? "").trim(),
        endDate: (r[idx.end] ?? "").trim(),
        urgent: ((r[idx.urgent] ?? "").trim().toLowerCase() === "true" ||
          (r[idx.urgent] ?? "").trim() === "1"),
      });
    }
    return list;
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AnnouncementsPage() {
  const all = await fetchAnnouncements();
  const today = todayKey();

  const valid = all.filter((a) => a.title);
  const active = valid
    .filter(
      (a) =>
        a.startDate <= today && (a.endDate === "" || today <= a.endDate),
    )
    .sort((a, b) => {
      if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
      return b.startDate.localeCompare(a.startDate);
    });
  const past = valid
    .filter((a) => a.endDate !== "" && a.endDate < today)
    .sort((a, b) => b.endDate.localeCompare(a.endDate));

  return (
    <section className="flex w-full flex-col px-6 pt-28 pb-20 sm:px-12 sm:pt-32 md:px-20 md:pt-36 lg:px-28 lg:pt-40">
      <header className="mx-auto flex w-full max-w-4xl animate-[page-fade-up_700ms_ease-out_both] flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80 sm:text-sm">
          {active.length === 0
            ? "Nothing right now"
            : `${active.length} active`}
        </p>
        <h1
          lang="ta"
          className="mt-3 font-[family-name:var(--font-tamil)] text-4xl font-bold leading-[1.3] tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
        >
          அறிவிப்புகள்
        </h1>
        <p className="mt-2 text-xl font-medium tracking-wide text-sky-700 sm:text-2xl md:text-3xl">
          Announcements
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Updates from the school — celebrations, schedule changes, reminders.
        </p>
        <AnnouncementsRefresh serverTime={Date.now()} />
      </header>

      <div className="mx-auto mt-12 w-full max-w-3xl animate-[page-fade-up_900ms_ease-out_250ms_both]">
        {active.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-sky-300/70 bg-white/50 p-10 text-center backdrop-blur-sm">
            <p className="text-base font-semibold text-slate-700">
              No active announcements
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Check back soon for updates.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {active.map((a, i) => (
              <li
                key={`${a.title}-${a.startDate}-${i}`}
                className={`relative overflow-hidden rounded-2xl border-2 backdrop-blur-sm ${
                  a.urgent
                    ? "border-red-400 bg-gradient-to-br from-red-50/95 to-rose-100/85 p-6 ring-2 ring-red-200 sm:p-7 animate-[urgent-pulse_2.4s_ease-in-out_infinite]"
                    : "border-sky-200 bg-white/70 p-5 shadow-md ring-1 ring-white/60 sm:p-6"
                }`}
              >
                {a.urgent && (
                  <>
                    <span
                      aria-hidden
                      className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-red-600 to-red-400"
                    />
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white shadow-md ring-2 ring-red-200">
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="inline-block h-3 w-3 animate-[urgent-bell_1.5s_ease-in-out_infinite] origin-top"
                      >
                        <path d="M12 2a2 2 0 0 0-2 2v.5A7 7 0 0 0 5 11v4l-2 2v1h18v-1l-2-2v-4a7 7 0 0 0-5-6.5V4a2 2 0 0 0-2-2zm-2 18a2 2 0 0 0 4 0z" />
                      </svg>
                      Urgent
                    </span>
                  </>
                )}
                <h2
                  className={`font-bold tracking-tight text-slate-900 ${
                    a.urgent
                      ? "text-2xl sm:text-3xl"
                      : "text-xl sm:text-2xl"
                  }`}
                >
                  {a.title}
                </h2>
                <p
                  className={`mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] sm:text-xs ${
                    a.urgent ? "text-red-700" : "text-slate-500"
                  }`}
                >
                  {formatDate(a.startDate)}
                  {a.endDate && a.endDate !== a.startDate
                    ? ` – ${formatDate(a.endDate)}`
                    : ""}
                </p>
                <p
                  className={`mt-3 leading-relaxed whitespace-pre-line ${
                    a.urgent
                      ? "text-sm font-medium text-slate-800 sm:text-base"
                      : "text-sm text-slate-700 sm:text-base"
                  }`}
                >
                  {a.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {past.length > 0 && (
        <div className="mx-auto mt-20 w-full max-w-3xl animate-[page-fade-up_900ms_ease-out_450ms_both]">
          <div className="mb-5 flex items-baseline justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Past Announcements
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              {past.length} {past.length === 1 ? "entry" : "entries"}
            </p>
          </div>
          <ul className="space-y-3 opacity-75">
            {past.map((a, i) => (
              <li
                key={`past-${a.title}-${a.startDate}-${i}`}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/50 p-4 sm:p-5"
              >
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                  {formatDate(a.startDate)}
                  {a.endDate && a.endDate !== a.startDate
                    ? ` – ${formatDate(a.endDate)}`
                    : ""}
                </p>
                <h3 className="mt-1 text-base font-semibold text-slate-700 sm:text-lg">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed whitespace-pre-line text-slate-500">
                  {a.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
