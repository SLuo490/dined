import Link from "next/link";
import { Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Dined home"
      className={cn("flex items-center gap-2 font-semibold text-lg", className)}
    >
      <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
        <Utensils className="size-4" strokeWidth={2} />
      </div>
      <span>
        dine<span className="text-primary">D</span>
      </span>
    </Link>
  );
}
