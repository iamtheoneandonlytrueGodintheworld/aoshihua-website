import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { useTranslation } from "@/i18n/useTranslation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-navy-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur text-navy-800 text-xs font-semibold rounded">
          {product.categoryName}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-navy-500 line-clamp-2">{product.summary}</p>
        <div className="mt-4 flex items-center text-brand-600 text-sm font-semibold">
          <span>{t("products.viewDetail")}</span>
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
