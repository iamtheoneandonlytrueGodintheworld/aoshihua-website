import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Factory } from "lucide-react";
import { useCompany } from "@/data/company";

const navItems = [
  { label: "首页", path: "/" },
  { label: "关于我们", path: "/about" },
  { label: "产品中心", path: "/products" },
  { label: "新闻资讯", path: "/news" },
  { label: "联系我们", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { data: companyInfo, isLoading } = useCompany();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const companyName = companyInfo?.name || "华威制造";
  const companyPhone = companyInfo?.phone || "#";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-navy-950/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-brand-500/30 transition-shadow">
              <Factory size={20} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight font-display">
                {companyName}
              </span>
              <span className="text-navy-300 text-xs hidden sm:block">精工智造 · 品质为先</span>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                      isActive ? "text-white" : "text-navy-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-500 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <a
              href={`tel:${companyPhone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-md transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-0.5"
            >
              立即咨询
            </a>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="切换菜单"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-navy-900/98 backdrop-blur-md border-t border-navy-800 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-3 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "bg-brand-500/20 text-brand-400"
                    : "text-navy-100 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={`tel:${companyPhone}`}
              className="block w-full text-center px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-md"
            >
              立即咨询
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
