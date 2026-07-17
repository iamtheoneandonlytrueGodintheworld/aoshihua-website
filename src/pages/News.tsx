import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";
import { useArticles, getArticlesByCategory } from "@/data/articles";

export default function News() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const { data: articlesData, isLoading } = useArticles();
  const categories = articlesData?.categories || ["全部"];
  const filteredArticles = articlesData
    ? getArticlesByCategory(articlesData.articles, activeCategory)
    : [];

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
        title="新闻资讯"
        description="奥世华机械新闻资讯，分享饲料机械行业趋势、技术干货与企业动态，为您的生产决策提供参考。"
        keywords="饲料机械新闻,行业动态,技术文章,奥世华机械,饲料加工"
        ogUrl="https://aoshihua-website-v4.vercel.app/news"
        canonical="https://aoshihua-website-v4.vercel.app/news"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "新闻资讯",
          url: "https://aoshihua-website-v4.vercel.app/news",
          description: "奥世华机械新闻资讯，分享饲料机械行业趋势、技术干货与企业动态。",
        }}
      />
      {/* Page Header */}
      <section className="bg-navy-900 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display animate-fade-up">
            新闻资讯
          </h1>
          <p className="mt-4 text-navy-300 max-w-2xl mx-auto animate-fade-up">
            分享行业趋势、技术干货与企业动态，助力饲料企业洞察前沿
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="最新文章"
            subtitle="持续更新，为您的生产决策提供参考"
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
              <p className="text-navy-500">该分类下暂无文章</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
