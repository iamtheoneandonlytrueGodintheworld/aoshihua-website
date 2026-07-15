import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import type { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to={`/news/${article.slug}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-navy-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-navy-400 mb-3">
          <span className="px-2 py-0.5 bg-brand-50 text-brand-600 rounded font-medium">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {article.publishedAt}
          </span>
        </div>
        <h3 className="text-base font-bold text-navy-900 group-hover:text-brand-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-navy-500 line-clamp-2 flex-1">{article.summary}</p>
        <div className="mt-4 flex items-center text-brand-600 text-sm font-semibold">
          <span>阅读全文</span>
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
