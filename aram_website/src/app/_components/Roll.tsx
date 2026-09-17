/** Letter-by-letter vertical roll on hover (parent needs `group` or hover itself). */
export default function Roll({ text }: { text: string }) {
  return (
    <span className="roll" aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden style={{ "--i": i } as React.CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
