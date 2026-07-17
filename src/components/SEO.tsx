import { useEffect } from "react";
import { useTranslation } from "@/i18n/useTranslation";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const defaultImage = "https://aoshihua-website-v4.vercel.app/og-image.png";

export default function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = defaultImage,
  ogUrl,
  canonical,
  jsonLd,
  noindex = false,
}: SEOProps) {
  const { locale } = useTranslation();

  const siteName =
    locale === "zh" ? "奥世华机械制造有限公司" : "Aoshihua Machinery Manufacturing Co., Ltd.";
  const defaultDescription =
    locale === "zh"
      ? "奥世华机械制造有限公司专注饲料机械研发、生产与销售，主营预混料机组、饲料混合设备、饲料除尘设备、锤片粉碎机等，为客户提供从方案设计到安装调试的一站式服务。"
      : "Aoshihua Machinery Manufacturing Co., Ltd. specializes in R&D, production and sales of feed machinery, including premix units, feed mixing equipment, dust removal equipment and hammer mills.";

  const fullTitle = title ? `${title} - ${siteName}` : siteName;
  const finalDescription = description || defaultDescription;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMeta("description", finalDescription);
    if (keywords) setMeta("keywords", keywords);

    setMeta("og:title", ogTitle || fullTitle, "property");
    setMeta("og:description", ogDescription || finalDescription, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("og:site_name", siteName, "property");
    setMeta("og:type", "website", "property");
    if (ogUrl) setMeta("og:url", ogUrl, "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", ogTitle || fullTitle);
    setMeta("twitter:description", ogDescription || finalDescription);
    setMeta("twitter:image", ogImage);

    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.remove();
    }

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.rel = "canonical";
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonical;
    } else if (linkCanonical) {
      linkCanonical.remove();
    }

    let scriptLd = document.getElementById("json-ld") as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptLd) {
        scriptLd = document.createElement("script");
        scriptLd.id = "json-ld";
        scriptLd.type = "application/ld+json";
        document.head.appendChild(scriptLd);
      }
      scriptLd.textContent = JSON.stringify(jsonLd);
    } else if (scriptLd) {
      scriptLd.remove();
    }

    return () => {
      // 页面卸载时只清理当前页特有的 JSON-LD，title/meta 会被下一页覆盖
      const ld = document.getElementById("json-ld");
      if (ld) ld.remove();
    };
  }, [fullTitle, finalDescription, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonical, jsonLd, noindex, siteName]);

  return null;
}
