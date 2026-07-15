import ScrollReveal from "./ScrollReveal";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionTitle({ title, subtitle, align = "center", light = false }: SectionTitleProps) {
  return (
    <ScrollReveal className={align === "center" ? "text-center" : ""}>
      <h2
        className={`text-3xl md:text-4xl font-bold font-display tracking-tight ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base md:text-lg max-w-2xl ${align === "center" ? "mx-auto" : ""} ${light ? "text-navy-200" : "text-navy-500"}`}>
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-16 rounded-full ${
          align === "center" ? "mx-auto" : ""
        } bg-gradient-to-r from-brand-500 to-brand-600`}
      />
    </ScrollReveal>
  );
}
