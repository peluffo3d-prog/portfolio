export default function SectionSeam({ from, to, height = 200 }: { from: string; to: string; height?: number }) {
  return (
    <div
      aria-hidden
      className="absolute left-0 right-0 pointer-events-none"
      style={{ top: -height / 2, height, background: `linear-gradient(to bottom, ${from}, ${to})`, zIndex: -1 }}
    />
  );
}
