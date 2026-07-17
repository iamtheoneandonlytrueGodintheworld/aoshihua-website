import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Phone, MessageCircle } from "lucide-react";
import { useProducts, getProductBySlug } from "@/data/products";
import { useCompany } from "@/data/company";
import ScrollReveal from "@/components/ScrollReveal";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: companyInfo, isLoading: companyLoading } = useCompany();

  const isLoading = productsLoading || companyLoading;
  const product = productsData && slug ? getProductBySlug(productsData.products, slug) : undefined;

  if (isLoading) {
    return (
      <div className="pt-20">
        <section className="bg-navy-900 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-white">加载中...</h1>
          </div>
        </section>
        <Loading />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold text-navy-900">产品未找到</h1>
        <Link to="/products" className="mt-4 inline-block text-brand-600">
          返回产品中心
        </Link>
      </div>
    );
  }

  const relatedProducts = productsData
    ? productsData.products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3)
    : [];

  const companyPhone = companyInfo?.phone || "#";

  return (
    <div className="pt-20">
      <SEO
        title={product.name}
        description={product.summary}
        keywords={`${product.name},${product.categoryName},饲料机械,奥世华机械`}
        ogUrl={`https://aoshihua-website-v4.vercel.app/products/${product.slug}`}
        canonical={`https://aoshihua-website-v4.vercel.app/products/${product.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.summary,
          image: product.image,
          brand: {
            "@type": "Brand",
            name: "奥世华机械",
          },
          category: product.categoryName,
          offers: {
            "@type": "Offer",
            url: `https://aoshihua-website-v4.vercel.app/products/${product.slug}`,
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: companyInfo?.name || "奥世华机械制造有限公司",
            },
          },
        }}
      />
      {/* Breadcrumb & Header */}
      <section className="bg-navy-900 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-navy-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            返回
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display">
            {product.name}
          </h1>
          <p className="mt-2 text-navy-300">{product.categoryName}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-xl bg-navy-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-navy-900">产品简介</h2>
                <p className="mt-4 text-navy-600 leading-relaxed">{product.description}</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-navy-900 mb-4">核心特点</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                          <Check size={14} />
                        </span>
                        <span className="text-navy-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={`tel:${companyPhone}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-md transition-all"
                  >
                    <Phone size={18} />
                    电话咨询
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-md transition-all"
                  >
                    <MessageCircle size={18} />
                    在线咨询
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Parameters */}
          <ScrollReveal className="mt-16">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">技术参数</h2>
            <div className="overflow-hidden rounded-xl border border-navy-200">
              <table className="w-full text-left">
                <tbody>
                  {product.parameters.map((param, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-navy-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-navy-700 w-1/3">
                        {param.label}
                      </td>
                      <td className="px-6 py-4 text-sm text-navy-600">{param.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Application */}
          <ScrollReveal className="mt-12">
            <div className="p-8 bg-brand-50 rounded-2xl">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">应用场景</h2>
              <p className="text-navy-600 leading-relaxed">{product.application}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-20 bg-navy-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-8">相关产品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.slug}`}
                  className="group flex gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm text-navy-500 line-clamp-2">{p.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
