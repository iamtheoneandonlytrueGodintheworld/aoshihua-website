import { useCompany } from "@/data/company";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";
import { Award, CheckCircle2 } from "lucide-react";

export default function About() {
  const { data: companyInfo, isLoading } = useCompany();

  if (isLoading) {
    return (
      <div className="pt-20">
        <section className="bg-navy-900 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display">关于奥世华</h1>
          </div>
        </section>
        <Loading />
      </div>
    );
  }

  if (!companyInfo) {
    return (
      <div className="pt-32 text-center">
        <p className="text-navy-600">内容加载失败</p>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <SEO
        title="关于我们"
        description="了解奥世华机械制造有限公司的企业文化、发展历程与资质荣誉，十六年深耕饲料机械行业，以技术创新驱动发展，以品质服务赢得客户信赖。"
        keywords="奥世华机械,关于奥世华,饲料机械厂家,企业文化,发展历程"
        ogUrl="https://aoshihua-website-v4.vercel.app/about"
        canonical="https://aoshihua-website-v4.vercel.app/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "关于奥世华",
          url: "https://aoshihua-website-v4.vercel.app/about",
          mainEntity: {
            "@type": "Organization",
            name: companyInfo?.name || "奥世华机械制造有限公司",
            description: companyInfo?.description,
            url: "https://aoshihua-website-v4.vercel.app/",
            logo: "https://aoshihua-website-v4.vercel.app/favicon.svg",
          },
        }}
      />
      {/* Page Header */}
      <section className="bg-navy-900 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display animate-fade-up">
            关于奥世华
          </h1>
          <p className="mt-4 text-navy-300 max-w-2xl mx-auto animate-fade-up">
            十六年深耕饲料机械行业，以技术创新驱动发展，以品质服务赢得客户信赖
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
                  alt="生产车间"
                  className="rounded-xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=400&q=80"
                  alt="设备细节"
                  className="rounded-xl shadow-lg mt-8"
                />
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 font-display">
                  {companyInfo.name}
                </h2>
                <p className="mt-4 text-brand-600 font-semibold">{companyInfo.slogan}</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="mt-6 text-navy-600 leading-relaxed">
                  {companyInfo.description}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {companyInfo.stats.map((stat) => (
                    <div key={stat.label} className="p-4 bg-navy-50 rounded-xl">
                      <p className="text-2xl md:text-3xl font-bold text-brand-600">
                        {stat.value}
                        {stat.suffix}
                      </p>
                      <p className="text-sm text-navy-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="企业文化"
            subtitle="以客户为中心，以品质为生命，以创新为动力"
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyInfo.values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 100}>
                <div className="h-full p-8 bg-white rounded-2xl shadow-sm border border-navy-100">
                  <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-5">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">{value.title}</h3>
                  <p className="mt-3 text-navy-500 leading-relaxed">{value.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="发展历程"
            subtitle="见证奥世华机械的成长足迹"
          />
          <div className="mt-14 max-w-4xl mx-auto">
            {companyInfo.milestones.map((milestone, index) => (
              <ScrollReveal key={milestone.year} delay={index * 100}>
                <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-12 md:gap-8 pb-10 last:pb-0">
                  <div className="md:col-span-3 md:text-right">
                    <span className="text-2xl font-bold text-brand-600 font-display">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="hidden md:flex md:col-span-1 justify-center">
                    <div className="relative h-full">
                      <div className="w-4 h-4 rounded-full bg-brand-500 ring-4 ring-brand-100" />
                      {index < companyInfo.milestones.length - 1 && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-full bg-navy-200" />
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <div className="absolute left-0 top-1 md:hidden">
                      <div className="w-3 h-3 rounded-full bg-brand-500" />
                      {index < companyInfo.milestones.length - 1 && (
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-full bg-navy-200" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-navy-900">{milestone.title}</h3>
                    <p className="mt-1 text-navy-500">{milestone.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Honors */}
      <section className="py-16 md:py-24 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="资质荣誉"
            subtitle="权威认证，实力见证"
            light
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.honors.map((honor, index) => (
              <ScrollReveal key={honor.title} delay={index * 100}>
                <div className="h-full p-6 bg-white/5 border border-white/10 rounded-xl text-center hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 mx-auto rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 mb-4">
                    <Award size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{honor.title}</h3>
                  <p className="mt-2 text-sm text-navy-300">{honor.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
