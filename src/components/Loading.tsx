import { useTranslation } from "@/i18n/useTranslation";

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
        <p className="text-navy-500 text-sm">{t("common.loading")}</p>
      </div>
    </div>
  );
}
