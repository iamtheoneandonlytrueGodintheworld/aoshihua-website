import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useCompany } from "@/data/company";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";
import { useTranslation } from "@/i18n/useTranslation";

function normalizeTel(phone: string | undefined): string {
  if (!phone) return "#";
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:${digits}` : "#";
}

export default function Contact() {
  const { data: companyInfo, isLoading } = useCompany();
  const { t, locale } = useTranslation();
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

    const subject = encodeURIComponent(
      locale === "zh" ? `网站留言：${formData.name}` : `Website Inquiry: ${formData.name}`
    );
    const body = encodeURIComponent(
      locale === "zh"
        ? `姓名：${formData.name}\n电话：${formData.phone}\n邮箱：${formData.email || "未填写"}\n公司：${formData.company || "未填写"}\n需求描述：\n${formData.message}`
        : `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || "Not provided"}\nCompany: ${formData.company || "Not provided"}\nRequirements:\n${formData.message}`
    );

    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", company: "", message: "" });
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-20">
        <Loading />
      </div>
    );
  }

  const companyName =
    companyInfo?.name ||
    (locale === "zh" ? "奥世华机械制造有限公司" : "Aoshihua Machinery Manufacturing Co., Ltd.");
  const companyPhone = companyInfo?.phone || "400-888-6688";
  const companyEmail = companyInfo?.email || "sales@aoshihua-mfg.com";
  const companyAddress =
    companyInfo?.address ||
    (locale === "zh"
      ? "江苏省常州市武进区高新技术产业开发区奥世华路 88 号"
      : "No. 88 Aoshihua Road, Wujin High-Tech Industrial Development Zone, Changzhou, Jiangsu, China");

  const metaTitle = locale === "zh" ? "联系我们" : "Contact Us";
  const metaDescription =
    locale === "zh"
      ? "联系奥世华机械制造有限公司，获取饲料机械选型方案与报价。通过电话、邮件或在线表单与我们取得联系，期待与您合作。"
      : "Contact Aoshihua Machinery Manufacturing Co., Ltd. for feed machinery selection solutions and quotations. Reach us by phone, email or online form.";
  const metaKeywords =
    locale === "zh"
      ? "联系奥世华,饲料机械咨询,设备报价,奥世华机械"
      : "contact Aoshihua,feed machinery consultation,equipment quotation,Aoshihua Machinery";

  return (
    <div className="pt-20">
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        ogUrl="https://aoshihua-website-v4.vercel.app/contact"
        canonical="https://aoshihua-website-v4.vercel.app/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: metaTitle,
          url: "https://aoshihua-website-v4.vercel.app/contact",
          mainEntity: {
            "@type": "Organization",
            name: companyName,
            telephone: companyPhone,
            email: companyEmail,
            address: {
              "@type": "PostalAddress",
              streetAddress: companyAddress,
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
            {t("contact.pageTitle")}
          </h1>
          <p className="mt-4 text-navy-300 max-w-2xl mx-auto animate-fade-up">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t("footer.contactUs")} subtitle={t("contact.subtitle")} />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal>
              <div className="h-full p-8 bg-navy-50 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-5">
                  <Phone size={26} />
                </div>
                <h3 className="text-lg font-bold text-navy-900">{t("contact.serviceHotline")}</h3>
                <a
                  href={normalizeTel(companyPhone)}
                  className="mt-2 block text-navy-600 hover:text-brand-600 transition-colors"
                >
                  {companyPhone}
                </a>
                <p className="mt-1 text-sm text-navy-400">{t("contact.available24")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="h-full p-8 bg-navy-50 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-5">
                  <Mail size={26} />
                </div>
                <h3 className="text-lg font-bold text-navy-900">{t("contact.email")}</h3>
                <a
                  href={`mailto:${companyEmail}`}
                  className="mt-2 block text-navy-600 hover:text-brand-600 transition-colors"
                >
                  {companyEmail}
                </a>
                <p className="mt-1 text-sm text-navy-400">{t("contact.emailReply")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="h-full p-8 bg-navy-50 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-5">
                  <MapPin size={26} />
                </div>
                <h3 className="text-lg font-bold text-navy-900">{t("contact.address")}</h3>
                <p className="mt-2 text-navy-600">{companyAddress}</p>
                <p className="mt-1 text-sm text-navy-400">{t("contact.visit")}</p>
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
                {companyInfo?.mapLat && companyInfo?.mapLng ? (
                  <iframe
                    title={companyName}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${companyInfo.mapLng - 0.02}%2C${companyInfo.mapLat - 0.02}%2C${companyInfo.mapLng + 0.02}%2C${companyInfo.mapLat + 0.02}&layer=mapnik&marker=${companyInfo.mapLat}%2C${companyInfo.mapLng}`}
                    className="w-full h-full min-h-[400px] border-0"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                      alt={t("contact.mapAlt")}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy-900/40 flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <MapPin size={40} className="mx-auto mb-3 text-brand-400" />
                        <p className="font-bold text-lg">{companyName}</p>
                        <p className="mt-1 text-navy-100">{companyAddress}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-navy-100">
                <h2 className="text-2xl font-bold text-navy-900 mb-2">{t("contact.formTitle")}</h2>
                <p className="text-navy-500 mb-6">{t("contact.formSubtitle")}</p>

                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900">
                      {t("contact.submitSuccessTitle")}
                    </h3>
                    <p className="mt-2 text-navy-500">{t("contact.success")}</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 px-6 py-2 bg-navy-100 text-navy-700 rounded-md hover:bg-navy-200 transition-colors"
                    >
                      {t("contact.continueMessage")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1.5">
                          {t("contact.nameLabel")} <span className="text-brand-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-navy-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                          placeholder={t("contact.placeholderName")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1.5">
                          {t("contact.phoneLabel")} <span className="text-brand-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-navy-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                          placeholder={t("contact.placeholderPhone")}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1.5">
                          {t("contact.email")}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-navy-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                          placeholder={t("contact.placeholderEmail")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1.5">
                          {t("contact.companyLabel")}
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-navy-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                          placeholder={t("contact.placeholderCompany")}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1.5">
                        {t("contact.requirement")} <span className="text-brand-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-navy-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none"
                        placeholder={t("contact.placeholderMessage")}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white font-semibold rounded-lg transition-all"
                    >
                      {isSubmitting ? (
                        t("contact.submitting")
                      ) : (
                        <>
                          <Send size={18} />
                          {t("contact.submit")}
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
