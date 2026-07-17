import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useCompany } from "@/data/company";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";

export default function Contact() {
  const { data: companyInfo, isLoading } = useCompany();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", company: "", message: "" });
    }, 1200);
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-20">
        <Loading />
      </div>
    );
  }

  const companyName = companyInfo?.name || "奥世华机械制造有限公司";
  const companyPhone = companyInfo?.phone || "400-888-6688";
  const companyEmail = companyInfo?.email || "sales@aoshihua-mfg.com";
  const companyAddress = companyInfo?.address || "江苏省常州市武进区高新技术产业开发区奥世华路 88 号";

  return (
    <div className="pt-20">
      <SEO
        title="联系我们"
        description="联系奥世华机械制造有限公司，获取饲料机械选型方案与报价。通过电话、邮件或在线表单与我们取得联系，期待与您合作。"
        keywords="联系奥世华,饲料机械咨询,设备报价,奥世华机械"
        ogUrl="https://aoshihua-website-v4.vercel.app/contact"
        canonical="https://aoshihua-website-v4.vercel.app/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "联系我们",
          url: "https://aoshihua-website-v4.vercel.app/contact",
          mainEntity: {
            "@type": "Organization",
            name: companyInfo?.name || "奥世华机械制造有限公司",
            telephone: companyInfo?.phone || "400-888-6688",
            email: companyInfo?.email || "sales@aoshihua-mfg.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: companyInfo?.address || "江苏省常州市武进区高新技术产业开发区奥世华路 88 号",
              addressCountry: "CN",
            },
            url: "https://aoshihua-website-v4.vercel.app/",
          },
        }}
      />
      {/* Page Header */}
      <section className="bg-navy-900 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display animate-fade-up">
            联系我们
          </h1>
          <p className="mt-4 text-navy-300 max-w-2xl mx-auto animate-fade-up">
            期待与您合作，欢迎通过电话、邮件或在线表单与我们取得联系
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="联系方式"
            subtitle="多种渠道，随时为您服务"
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal>
              <div className="h-full p-8 bg-navy-50 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-5">
                  <Phone size={26} />
                </div>
                <h3 className="text-lg font-bold text-navy-900">服务热线</h3>
                <a
                  href={`tel:${companyPhone}`}
                  className="mt-2 block text-navy-600 hover:text-brand-600 transition-colors"
                >
                  {companyPhone}
                </a>
                <p className="mt-1 text-sm text-navy-400">7×24 小时响应</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="h-full p-8 bg-navy-50 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-5">
                  <Mail size={26} />
                </div>
                <h3 className="text-lg font-bold text-navy-900">电子邮箱</h3>
                <a
                  href={`mailto:${companyEmail}`}
                  className="mt-2 block text-navy-600 hover:text-brand-600 transition-colors"
                >
                  {companyEmail}
                </a>
                <p className="mt-1 text-sm text-navy-400">工作日 24 小时内回复</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="h-full p-8 bg-navy-50 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-5">
                  <MapPin size={26} />
                </div>
                <h3 className="text-lg font-bold text-navy-900">公司地址</h3>
                <p className="mt-2 text-navy-600">{companyAddress}</p>
                <p className="mt-1 text-sm text-navy-400">欢迎莅临考察</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map & Form */}
      <section className="py-16 md:py-24 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ScrollReveal>
              <div className="h-full min-h-[400px] bg-navy-200 rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                  alt="地图占位"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/40 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <MapPin size={40} className="mx-auto mb-3 text-brand-400" />
                    <p className="font-bold text-lg">{companyName}</p>
                    <p className="mt-1 text-navy-100">{companyAddress}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-navy-100">
                <h2 className="text-2xl font-bold text-navy-900 mb-2">在线留言</h2>
                <p className="text-navy-500 mb-6">填写下方表单，我们将尽快与您联系</p>

                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900">提交成功</h3>
                    <p className="mt-2 text-navy-500">我们已收到您的留言，将尽快与您联系！</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 px-6 py-2 bg-navy-100 text-navy-700 rounded-md hover:bg-navy-200 transition-colors"
                    >
                      继续留言
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1.5">
                          姓名 <span className="text-brand-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-navy-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                          placeholder="请输入您的姓名"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1.5">
                          电话 <span className="text-brand-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-navy-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                          placeholder="请输入联系电话"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1.5">
                          邮箱
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-navy-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                          placeholder="请输入邮箱地址"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1.5">
                          公司名称
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-navy-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                          placeholder="请输入公司名称"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1.5">
                        需求描述 <span className="text-brand-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-navy-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none"
                        placeholder="请描述您的需求，如设备类型、产能要求等"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white font-semibold rounded-lg transition-all"
                    >
                      {isSubmitting ? (
                        "提交中..."
                      ) : (
                        <>
                          <Send size={18} />
                          提交留言
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
