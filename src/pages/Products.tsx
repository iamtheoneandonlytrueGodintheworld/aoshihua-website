import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";
import { useProducts, getProductsByCategory } from "@/data/products";
import { useTranslation } from "@/i18n/useTranslation";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const { data: productsData, isLoading } = useProducts();
  const { t, locale } = useTranslation();

  useEffect(() => {
    const category = searchParams.get("category") || "all";
    setActiveCategory(category);
  }, [searchParams]);

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    if (key === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: key });
    }
  };

  const metaTitle = locale === "zh" ? "产品中心" : "Products";
  const metaDescription =
    locale === "zh"
      ? "奥世华机械产品中心，提供预混料机组、饲料混合设备、饲料除尘设备、锤片粉碎机等全系列饲料机械，满足饲料加工全流程需求。"
      : "Aoshihua Machinery product center, providing premix units, feed mixing equipment, dust removal equipment, hammer mills and other feed machinery.";
  const metaKeywords =
    locale === "zh"
      ? "饲料机械产品,预混料机组,饲料混合设备,饲料除尘设备,锤片粉碎机,奥世华机械"
      : "feed machinery products,premix unit,feed mixer,dust collector,hammer mill,Aoshihua Machinery";

  if (isLoading) {
    return (
      <div className="pt-20">
        <section className="bg-navy-900 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display">
              {t("products.pageTitle")}
            </h1>
          </div>
        </section>
        <Loading />
      </div>
    );
  }

  if (!productsData) {
    return (
      <div className="pt-32 text-center">
        <p className="text-navy-600">{t("common.error")}</p>
      </div>
    );
  }

  const filteredProducts = getProductsByCategory(productsData.products, activeCategory);

  return (
    <div className="pt-20">
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        ogUrl="https://aoshihua-website-v4.vercel.app/products"
        canonical="https://aoshihua-website-v4.vercel.app/products"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: metaTitle,
          url: "https://aoshihua-website-v4.vercel.app/products",
          description: metaDescription,
        }}
      />
      {/* Page Header */}
      <section className="bg-navy-900 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display animate-fade-up">
            {t("products.pageTitle")}
          </h1>
          <p className="mt-4 text-navy-300 max-w-2xl mx-auto animate-fade-up">
            {t("products.subtitle")}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("products.pageTitle")}
            subtitle={t("products.subtitle")}
          />

          {/* Category Filter */}
          <ScrollReveal className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                  : "bg-white text-navy-600 hover:bg-navy-100 border border-navy-200"
              }`}
            >
              {t("products.allProducts")}
            </button>
            {productsData.categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.key
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                    : "bg-white text-navy-600 hover:bg-navy-100 border border-navy-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={(index % 4) * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-navy-500">{t("products.noProducts")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
