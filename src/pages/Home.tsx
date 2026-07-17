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
import { ArrowRight, Award, ShieldCheck, HeadphonesIcon, Leaf } from "lucide-react";

const advantages = [
  {
    icon: Award,
    title: "品质保证",
    desc: "ISO 9001 质量管理体系认证，全流程严格把控",
  },
  {
    icon: ShieldCheck,
    title: "技术领先",
    desc: "50+ 项专利技术，持续创新满足市场需求",
  },
  {
    icon: HeadphonesIcon,
    title: "服务贴心",
    desc: "7×24 小时响应，专业技术团队全程支持",
  },
  {
    icon: Leaf,
    title: "绿色环保",
    desc: "低能耗设计，配套除尘方案，助力环保达标",
  },
];

export default function Home() {
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: articlesData, isLoading: articlesLoading } = useArticles();
  const { data: companyInfo, isLoading: companyLoading } = useCompany();
  const { data: homeConfig, isLoading: homeLoading } = useContent<HomeConfig>(contentApi.getHome);

  const isLoading = productsLoading || articlesLoading || companyLoading || homeLoading;

  const featuredProducts = productsData ? getProductsByCategory(productsData.products, "all").slice(0, 4) : [];
  const latestArticles = articlesData ? getArticlesByCategory(articlesData.articles, "全部").slice(0, 3) : [];

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
        <p className="text-navy-600">内容加载失败，请稍后重试</p>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title="精工智造饲料机械，助力现代农牧发展"
        description="奥世华机械制造有限公司专注饲料机械研发、生产与销售，主营预混料机组、饲料混合设备、饲料除尘设备、锤片粉碎机等，为客户提供从方案设计到安装调试的一站式服务。"
        keywords="饲料机械,预混料机组,饲料混合设备,饲料除尘设备,锤片粉碎机,奥世华机械"
        ogUrl="https://aoshihua-website-v4.vercel.app/"
        canonical="https://aoshihua-website-v4.vercel.app/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: companyInfo?.name || "奥世华机械制造有限公司",
            url: "https://aoshihua-website-v4.vercel.app/",
            logo: "https://aoshihua-website-v4.vercel.app/favicon.svg",
            description:
              "奥世华机械制造有限公司专注饲料机械研发、生产与销售，主营预混料机组、饲料混合设备、饲料除尘设备、锤片粉碎机等。",
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
            name: "奥世华机械制造有限公司",
            url: "https://aoshihua-website-v4.vercel.app/",
          },
        ]}
      />
      <Hero />

      {/* Products Section */}
      <section id="products" className="py-20 md:py-28 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="核心产品"
            subtitle="覆盖饲料加工全流程，满足预混料、混合、除尘、粉碎等多场景需求"
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
              查看全部产品
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
                  alt="奥世华机械工厂"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-500 text-white p-6 rounded-xl shadow-xl hidden md:block">
                  <p className="text-4xl font-bold">16+</p>
                  <p className="text-sm opacity-90">年行业深耕</p>
                </div>
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
                  关于奥世华
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-navy-900 font-display">
                  专注饲料机械，守护每一口饲料的品质
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
                  了解更多
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
            title="为什么选择奥世华"
            subtitle="以匠心铸就品质，以服务赢得信赖"
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
            title="新闻资讯"
            subtitle="行业动态、技术分享与企业新闻"
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
              查看更多文章
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
              立即获取专属饲料机械解决方案
            </h2>
            <p className="mt-4 text-brand-100 max-w-2xl mx-auto">
              无论您是新建饲料厂还是产线升级，我们的技术团队都将为您提供专业咨询与定制方案。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 font-semibold rounded-md hover:bg-brand-50 transition-all"
              >
                免费获取方案
                <ArrowRight size={18} />
              </Link>
              <a
                href={`tel:${companyInfo.phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-md transition-all"
              >
                拨打服务热线
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
