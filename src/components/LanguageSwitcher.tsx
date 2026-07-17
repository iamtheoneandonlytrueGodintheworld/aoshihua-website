import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center rounded-md border border-navy-700/50 bg-navy-800/50 overflow-hidden">
      <button
        onClick={() => setLocale("zh")}
        className={`px-2 py-1 text-sm font-medium transition-colors ${
          locale === "zh"
            ? "bg-brand-500 text-white"
            : "text-navy-300 hover:text-white"
        }`}
        aria-label="Switch to Chinese"
      >
        中
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-1 text-sm font-medium transition-colors ${
          locale === "en"
            ? "bg-brand-500 text-white"
            : "text-navy-300 hover:text-white"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
