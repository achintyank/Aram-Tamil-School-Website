import { SYLLABUS_READY } from "../_data/school";

/** `compact` fits narrow spaces: "PDF soon" / "PDF" instead of "Syllabus soon" / "Syllabus". */
export default function SyllabusTag({ file, compact = false }: { file: string; compact?: boolean }) {
  if (!SYLLABUS_READY) return <span className="eyebrow whitespace-nowrap opacity-50">{compact ? "PDF soon" : "Syllabus soon"}</span>;
  return (
    <a href={`/syllabus/${file}.pdf`} download className="eyebrow inline-flex items-center gap-1.5 underline decoration-2 underline-offset-4">
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 3v12m-5-5 5 5 5-5M4 21h16" />
      </svg>
      {compact ? "PDF" : "Syllabus"}
    </a>
  );
}
