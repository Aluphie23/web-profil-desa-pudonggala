import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-14", centered && "text-center", className)}>
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 tracking-tight",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg md:text-xl max-w-2xl leading-relaxed",
            centered && "mx-auto",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-6 flex items-center gap-1.5",
          centered ? "justify-center" : ""
        )}
      >
        <div className="h-1 w-8 rounded-full bg-primary" />
        <div className="h-1 w-3 rounded-full bg-accent" />
        <div className="h-1 w-1.5 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
