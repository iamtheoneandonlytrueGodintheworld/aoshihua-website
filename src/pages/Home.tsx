import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ArticleCard from "@/components/ArticleCard";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import Loading from "@/components/Loading";
import { useProducts, getProductsByCategory } from "@/data/products";
import { useArticles, getArticlesByCategory } from "@/data/articles";
import { useCompany } from "@/data/company";
import { contentApi, type HomeConfig } from "@/services/contentApi";
import { useContent } from "@/hooks/useContent";
import SEO from "@/components/SEO";
import { useTranslation } from "@/i18n/useTranslation";
import { ArrowRight, Award, ShieldCheck, HeadphonesIcon, Leaf, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Award,
  ShieldCheck,
  HeadphonesIcon,
  Leaf,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Award;
}

function normalizeTel(phone: string | undefined): string {
  if (!phone) return "#";
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:${digits}` : "#";
}

export default function Home() {
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: articlesData, isLoading: articlesLoading } = useArticles();
  const { data: companyInfo, isLoading: companyLoading } = useCompany();
  const { data: homeConfig, isLoading: homeLoading } = useContent<HomeConfig>(contentApi.getHome);
  const { t, locale } = useTranslation();

  const isLoading = productsLoading || articlesLoading || companyLoading || homeLoading;

  const featuredProducts = productsData ? getProductsByCategory(productsData.products, "all").slice(0, 4) : [];
  const latestArticles = articlesData ? getArticlesByCategory(articlesData.articles, t("news.all")).slice(0, 3) : [];

  const advantages = homeConfig?.advantages.map((item) => ({
    icon: getIcon(item.icon),
    title: item.title,
    desc: item.desc,
  })) || [];

  const aboutLabels = {
    section: t("home.aboutTitle"),
    title: t("home.aboutMainTitle"),
    experience: t("home.aboutExperience"),
  };

  const ctaLabels = {
    title: t("home.ctaTitle"),
    subtitle: t("home.ctaSubtitle"),
    contact: t("home.ctaContact"),
    call: t("home.ctaCall"),
  };

  if (isLoading) {
    return (
      <div className="pt-20">
        <Hero />
        <Loading />
      </div>
    );
  }

  if (!productsData || !articlesData || !companyInfo || !homeConfig) {
    return (
      <div className="pt-32 text-center">
        <p className="text-navy-600">{t("common.error")}</p>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title={t("home.heroTitle")}
        description={t("home.heroDescription")}
        keywords={t("home.heroKeywords")}
        ogUrl="https://aoshihua-website-v4.vercel.app/"
        canonical="https://aoshihua-website-v4.vercel.app/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: companyInfo?.name || (locale === "zh" ? "奥世华机械制造有限公司" : "Aoshihua Machinery Manufacturing Co., Ltd."),
            url: "https://aoshihua-website-v4.vercel.app/",
            logo: "https://aoshihua-website-v4.vercel.app/favicon.svg",
            description:
              locale === "zh"
                ? "奥世华机械制造有限公司专注饲料机械研发、生产与销售，主营预混料机组、饲料混合设备、饲料除尘设备、锤片粉碎机等。"
                : "Aoshihua Machinery Manufacturing Co., Ltd. specializes in R&D, production and sales of feed machinery.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: companyInfo?.phone || "400-888-6688",
              contactType: "sales",
              areaServed: "CN",
              availableLanguage: ["Chinese"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: locale === "zh" ? "奥世华机械制造有限公司" : "Aoshihua Machinery Manufacturing Co., Ltd.",
            url: "https://aoshihua-website-v4.vercel.app/",
          },
        ]}
      />
      <Hero />

      {/* Products Section */}
      <section id="products" className="py-20 md:py-28 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("home.coreProducts")}
            subtitle={t("home.coreProductsSubtitle")}
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-md transition-all"
            >
              {t("home.viewAllProducts")}
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <img
                  src={homeConfig.introImage}
                  alt={t("home.introImageAlt")}
                  className="rounded-2xl shadow-2xl"
                />
                {homeConfig && homeConfig.stats.length > 0 && (
                  <div className="absolute -bottom-6 -right-6 bg-brand-500 text-white p-6 rounded-xl shadow-xl hidden md:block">
                    <p className="text-4xl font-bold">
                      {homeConfig.stats[0].value}{homeConfig.stats[0].suffix}
                    </p>
                    <p className="text-sm opacity-90">{homeConfig.stats[0].label}</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
                  {aboutLabels.section}
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-navy-900 font-display">
                  {aboutLabels.title}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="mt-5 text-navy-600 leading-relaxed">
                  {companyInfo.description}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {companyInfo.values.map((value) => (
                    <div key={value.title} className="p-4 bg-navy-50 rounded-lg">
                      <h3 className="font-bold text-navy-900">{value.title}</h3>
                      <p className="mt-1 text-sm text-navy-500">{value.desc}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <Link
                  to="/about"
                  className="mt-8 inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
                >
                  {t("home.learnMore")}
                  <ArrowRight size={18} />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 md:py-28 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            title={t("home.whyChoose")}
            subtitle={t("home.whyChooseSubtitle")}
            light
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 100}>
                <div className="h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 mb-4">
                    <item.icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-navy-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 md:py-28 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("home.latestNews")}
            subtitle={t("home.latestNewsSubtitle")}
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 100}>
                <ArticleCard article={article} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-12 text-center">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-navy-50 text-navy-900 border border-navy-200 font-semibold rounded-md transition-all"
            >
              {t("home.viewAllNews")}
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display">
              {ctaLabels.title}
            </h2>
            <p className="mt-4 text-brand-100 max-w-2xl mx-auto">
              {ctaLabels.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 font-semibold rounded-md hover:bg-brand-50 transition-all"
              >
                {ctaLabels.contact}
                <ArrowRight size={18} />
              </Link>
              <a
                href={normalizeTel(companyInfo.phone)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-md transition-all"
              >
                {ctaLabels.call}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
