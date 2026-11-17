import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './locales/i18n'
import { App } from '@/app/App'

// Restore persisted language direction if present
if (typeof window !== 'undefined') {
  const savedLng = localStorage.getItem('nexus_locale_preference') || 'en'
  document.documentElement.dir = savedLng === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = savedLng
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element in index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
