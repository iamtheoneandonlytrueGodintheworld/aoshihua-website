import { Link } from "react-router-dom";
import { Factory, Phone, Mail, MapPin } from "lucide-react";
import { useCompany } from "@/data/company";

const footerLinks = [
  { label: "首页", path: "/" },
  { label: "关于我们", path: "/about" },
  { label: "产品中心", path: "/products" },
  { label: "新闻资讯", path: "/news" },
  { label: "联系我们", path: "/contact" },
];

const productCategories = [
  { key: "premix", name: "预混料机组" },
  { key: "mixing", name: "饲料混合设备" },
  { key: "dust", name: "饲料除尘设备" },
  { key: "crusher", name: "锤片粉碎机" },
];

export default function Footer() {
  const { data: companyInfo } = useCompany();

  const companyName = companyInfo?.name || "奥世华机械制造有限公司";
  const companyPhone = companyInfo?.phone || "400-888-6688";
  const companyEmail = companyInfo?.email || "sales@aoshihua-mfg.com";
  const companyAddress = companyInfo?.address || "江苏省常州市武进区高新技术产业开发区奥世华路 88 号";

  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white">
                <Factory size={22} strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-lg font-display">
                {companyName}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-navy-300 mb-5">
              专注饲料机械研发、生产与销售，为客户提供从方案设计到安装调试的一站式服务。
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-navy-900 hover:bg-brand-500 flex items-center justify-center transition-colors"
                aria-label="微信"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5">快速导航</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-navy-300 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5">产品系列</h3>
            <ul className="space-y-3">
              {productCategories.map((cat) => (
                <li key={cat.key}>
                  <Link
                    to={`/products?category=${cat.key}`}
                    className="text-sm text-navy-300 hover:text-brand-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5">联系我们</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-navy-400">服务热线</p>
                  <a href={`tel:${companyPhone}`} className="text-sm hover:text-white transition-colors">
                    {companyPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-navy-400">电子邮箱</p>
                  <a href={`mailto:${companyEmail}`} className="text-sm hover:text-white transition-colors">
                    {companyEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-navy-400">公司地址</p>
                  <p className="text-sm">{companyAddress}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} {companyName} 版权所有
          </p>
          <p className="text-xs text-navy-500">
            本网站为演示版本，无需备案即可本地预览
          </p>
        </div>
      </div>
    </footer>
  );
}
