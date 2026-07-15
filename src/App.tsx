import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import ChatWidget from "@/components/ChatWidget";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import News from "@/pages/News";
import ArticleDetail from "@/pages/ArticleDetail";
import Contact from "@/pages/Contact";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="news" element={<News />} />
          <Route path="news/:slug" element={<ArticleDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
      <ChatWidget />
    </Router>
  );
}
