import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border pt-8 px-4 sm:px-8">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">dined</span> — your
          personal restaurant diary
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          {["About", "Privacy", "Terms", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
