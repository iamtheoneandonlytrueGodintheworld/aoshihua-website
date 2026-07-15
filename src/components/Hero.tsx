import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { contentApi, type HomeConfig } from "@/services/contentApi";
import { useContent } from "@/hooks/useContent";
import Loading from "./Loading";

const stats = [
  { value: "16+", label: "年行业经验" },
  { value: "3000+", label: "台设备出货" },
  { value: "60+", label: "服务国家" },
  { value: "50+", label: "项技术专利" },
];

export default function Hero() {
  const { data: home, isLoading } = useContent<HomeConfig>(contentApi.getHome);

  if (isLoading || !home) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-navy-900">
        <Loading />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={home.heroBackground}
          alt="饲料机械"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-sm text-navy-100">始于 2008 年的饲料机械专家</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-display">
            {home.heroTitle}
            <span className="block mt-2 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              {home.heroSubtitle}
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-navy-200 max-w-2xl leading-relaxed">
            {home.aboutText}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-md transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5"
            >
              {home.ctaPrimary}
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold rounded-md border border-white/20 transition-all"
            >
              {home.ctaSecondary}
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-navy-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <a href="#products" className="flex flex-col items-center text-white/70 hover:text-white transition-colors">
          <span className="text-xs mb-2">向下滚动</span>
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  );
}
