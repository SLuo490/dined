export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <mark className="inline-block -skew-x-9 bg-amber-highlight text-inherit rounded-sm px-2">
      <span className="inline-block skew-x-9">{children}</span>
    </mark>
  );
}
