import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "./translations";

type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? T[K] extends Record<string, unknown>
    ? `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`
  : never;

type TranslationKey = NestedKeyOf<typeof translations.zh>;

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

export function useTranslation() {
  const { locale } = useLanguage();

  const t = (key: TranslationKey): string => {
    const value = getNestedValue(translations[locale] as Record<string, unknown>, key);
    if (value) return value;
    // Fallback to Chinese if translation missing
    const fallback = getNestedValue(translations.zh as Record<string, unknown>, key);
    return fallback ?? key;
  };

  return { t, locale };
}
