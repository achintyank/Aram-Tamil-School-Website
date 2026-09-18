import Highlight from "./Highlight";

type Line = { text: string; className?: string };

/**
 * Bilingual section heading: Tamil is the main heading, the English translation
 * sits under it, smaller. Lines reveal with the highlight wipe.
 */
export default function SectionTitle({
  ta,
  en,
  enClassName = "",
  wipe,
  className = "",
}: {
  ta: (string | Line)[];
  en: string;
  enClassName?: string;
  /** colour of the reveal wipe (defaults to blue) */
  wipe?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 lang="ta" className="font-tamil text-[clamp(2.6rem,5.4vw,5.2rem)] leading-[1.12] font-extrabold tracking-tight">
        {ta.map((line, i) => {
          const l = typeof line === "string" ? { text: line } : line;
          return (
            <Highlight key={i} delay={i * 120} color={wipe} className={`block ${l.className ?? ""}`}>
              {l.text}
            </Highlight>
          );
        })}
      </h2>
      <p lang="en" className={`mt-3 text-xl font-extrabold tracking-tight uppercase sm:text-2xl ${enClassName}`}>
        {en}
      </p>
    </div>
  );
}
