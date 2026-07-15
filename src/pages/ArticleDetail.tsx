import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { useArticles, getArticleBySlug } from "@/data/articles";
import ScrollReveal from "@/components/ScrollReveal";
import Loading from "@/components/Loading";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: articlesData, isLoading } = useArticles();
  const article = articlesData && slug ? getArticleBySlug(articlesData.articles, slug) : undefined;

  if (isLoading) {
    return (
      <div className="pt-32 pb-20">
        <Loading />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold text-navy-900">文章未找到</h1>
        <Link to="/news" className="mt-4 inline-block text-brand-600">
          返回新闻资讯
        </Link>
      </div>
    );
  }

  const relatedArticles = articlesData!.articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-navy-900 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-navy-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            返回新闻列表
          </Link>
          <span className="inline-block px-3 py-1 bg-brand-500/20 text-brand-400 text-sm font-medium rounded mb-4">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white font-display max-w-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-navy-300 text-sm">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Tag size={16} />
              {article.tags.join("、")}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <ScrollReveal className="lg:col-span-2">
              {article.cover && (
                <img
                  src={article.cover}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
                />
              )}
              <article
                className="prose prose-navy max-w-none prose-headings:text-navy-900 prose-p:text-navy-600 prose-strong:text-navy-900 prose-li:text-navy-600"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </ScrollReveal>

            <aside className="lg:col-span-1">
              <ScrollReveal>
                <div className="p-6 bg-navy-50 rounded-2xl sticky top-24">
                  <h3 className="text-lg font-bold text-navy-900 mb-4">相关文章</h3>
                  {relatedArticles.length > 0 ? (
                    <ul className="space-y-4">
                      {relatedArticles.map((a) => (
                        <li key={a.id}>
                          <Link
                            to={`/news/${a.slug}`}
                            className="group block"
                          >
                            <h4 className="text-sm font-semibold text-navy-800 group-hover:text-brand-600 transition-colors line-clamp-2">
                              {a.title}
                            </h4>
                            <span className="text-xs text-navy-400 mt-1 block">
                              {a.publishedAt}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-navy-500">暂无相关文章</p>
                  )}
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
