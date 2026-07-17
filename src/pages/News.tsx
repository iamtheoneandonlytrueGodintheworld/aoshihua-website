import { useState, useEffect } from "react";
import ArticleCard from "@/components/ArticleCard";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";
import { useArticles, getArticlesByCategory } from "@/data/articles";
import { useTranslation } from "@/i18n/useTranslation";

export default function News() {
  const { t, locale } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(t("news.all"));
  const { data: articlesData, isLoading } = useArticles();
  const categories = articlesData?.categories || [t("news.all")];
  const filteredArticles = articlesData
    ? getArticlesByCategory(articlesData.articles, activeCategory)
    : [];

  useEffect(() => {
    setActiveCategory(t("news.all"));
  }, [locale, t]);

  const metaTitle = locale === "zh" ? "新闻资讯" : "News";
  const metaDescription =
    locale === "zh"
      ? "奥世华机械新闻资讯，分享饲料机械行业趋势、技术干货与企业动态，为您的生产决策提供参考。"
      : "Aoshihua Machinery news, sharing feed machinery industry trends, technical insights and company updates.";
  const metaKeywords =
    locale === "zh"
      ? "饲料机械新闻,行业动态,技术文章,奥世华机械,饲料加工"
      : "feed machinery news,industry trends,technical articles,Aoshihua Machinery,feed processing";

  if (isLoading) {
    return (
      <div className="pt-32 pb-20">
        <Loading />
      </div>
    );
  }

  return (
    <div className="pt-20">
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        ogUrl="https://aoshihua-website-v4.vercel.app/news"
        canonical="https://aoshihua-website-v4.vercel.app/news"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: metaTitle,
          url: "https://aoshihua-website-v4.vercel.app/news",
          description: metaDescription,
        }}
      />
      {/* Page Header */}
      <section className="bg-navy-900 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display animate-fade-up">
            {t("news.pageTitle")}
          </h1>
          <p className="mt-4 text-navy-300 max-w-2xl mx-auto animate-fade-up">
            {t("news.subtitle")}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("news.latestArticles")}
            subtitle={t("news.reference")}
          />

          {/* Category Filter */}
          <ScrollReveal className="mt-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                    : "bg-white text-navy-600 hover:bg-navy-100 border border-navy-200"
                }`}
              >
                {category}
              </button>
            ))}
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <ScrollReveal key={article.id} delay={(index % 3) * 100}>
                <ArticleCard article={article} />
              </ScrollReveal>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-navy-500">{t("news.noArticles")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
