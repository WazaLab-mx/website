interface Props {
  label: string;
  title: string;
  variant?: "light" | "dark";
  align?: "center" | "left";
}

export function SectionHeader({
  label,
  title,
  variant = "light",
  align = "center",
}: Props) {
  const isDark = variant === "dark";
  const textColor = isDark ? "text-white" : "text-black dark:text-white";
  const labelColor = isDark ? "text-white/80" : "text-black dark:text-white";
  const dividerColor = isDark ? "bg-white/60" : "bg-black dark:bg-white";
  const accentColor = isDark ? "bg-white" : "bg-black dark:bg-white";

  if (align === "left") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-0.5 ${dividerColor}`} />
          <span className={`text-sm font-bold uppercase tracking-widest ${labelColor}`}>
            {label}
          </span>
        </div>
        <h2 className={`text-4xl font-black ${textColor} leading-tight lg:text-5xl`}>
          {title}
        </h2>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="flex items-center justify-center gap-4">
        <div className={`w-16 h-0.5 ${dividerColor}`} />
        <span className={`text-sm font-bold uppercase tracking-widest ${labelColor}`}>
          {label}
        </span>
        <div className={`w-16 h-0.5 ${dividerColor}`} />
      </div>
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black ${textColor} leading-tight`}>
        {title}
      </h2>
      <div className={`w-24 h-1 ${accentColor} mx-auto`} />
    </div>
  );
}
