import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const path = window.location.pathname
if (path.startsWith('/admin')) {
  // Decap CMS 使用 public/admin/index.html 自行初始化，React 应用不接管 /admin 路由
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
