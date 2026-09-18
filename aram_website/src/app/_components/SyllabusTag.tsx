import type { ReactNode } from "react";
import { SYLLABUS_READY } from "../_data/school";

const href = (file: string) => `/syllabus/${file}.pdf`;

function DownloadIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 3v12m-5-5 5 5 5-5M4 21h16" />
    </svg>
  );
}

/** Small label on a card. `compact` fits narrow spaces: "PDF soon" / "PDF". */
export default function SyllabusTag({ compact = false }: { file?: string; compact?: boolean }) {
  if (!SYLLABUS_READY) return <span className="eyebrow whitespace-nowrap opacity-50">{compact ? "PDF soon" : "Syllabus soon"}</span>;
  return (
    <span className="eyebrow inline-flex items-center gap-1.5 whitespace-nowrap underline decoration-2 underline-offset-4">
      <DownloadIcon />
      {compact ? "PDF" : "Syllabus"}
    </span>
  );
}

/** Makes a whole card the syllabus download once PDFs are uploaded; a plain div until then. */
export function SyllabusLink({ file, label, className, children }: { file: string; label: string; className?: string; children: ReactNode }) {
  if (!SYLLABUS_READY) return <div className={className}>{children}</div>;
  return (
    <a href={href(file)} download aria-label={`Download the ${label} syllabus (PDF)`} className={className}>
      {children}
    </a>
  );
}

/** "Click a grade to download its syllabus" hint shown above each set of cards. */
export function SyllabusHint({ noun, dark = true }: { noun: string; dark?: boolean }) {
  return (
    <p
      className={`eyebrow mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2.5 ${
        dark ? "bg-paper/10 text-paper" : "bg-ink/10 text-ink"
      }`}
    >
      <DownloadIcon size={14} />
      Click a {noun} to download its syllabus
      {!SYLLABUS_READY && <span className="opacity-60">· PDFs coming soon</span>}
    </p>
  );
}
