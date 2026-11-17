import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      dashboardTitle: 'Institutional Portfolio Overview',
      dashboardSubtitle: 'Multi-asset portfolio valuation, alpha generation, and tactical rebalancing.',
      analyticsTitle: 'Factor & Risk Analytics Studio',
      dataTitle: 'Holdings & Position Ledger',
      usersTitle: 'Fund Governance & Role Management',
      telemetryTitle: 'Real-Time Market Telemetry',
      settingsTitle: 'System Settings',
      totalAum: 'Total Portfolio AUM',
      totalGain: 'Total Unrealized Return',
      sharpeRatio: 'Sharpe Ratio',
      beta: 'Beta to S&P 500',
      executeTrade: 'Execute Trade',
      rebalance: 'Rebalance',
      sync: 'Sync Feeds',
      exportCsv: 'Export Holdings CSV',
      addPosition: 'Add Position',
      saveChanges: 'Save Changes',
      language: 'Language',
      theme: 'Theme Mode',
    },
  },
  ar: {
    translation: {
      dashboardTitle: 'نظرة عامة على المحفظة الاستثمارية',
      dashboardSubtitle: 'تقييم المحافظ الاستثمارية متعددة الأصول، قياس العوائد، وإعادة التوازن التكتيكي.',
      analyticsTitle: 'استوديو تحليلات المخاطر والعوامل',
      dataTitle: 'سجل الأصول والمراكز الاستثمارية',
      usersTitle: 'إدارة حوكمة الصندوق وصلاحيات التداول',
      telemetryTitle: 'بث بيانات السوق الفوري',
      settingsTitle: 'إعدادات النظام والواجهة',
      totalAum: 'إجمالي الأصول المدارة (AUM)',
      totalGain: 'إجمالي العائد المحقق',
      sharpeRatio: 'نسبة شارب للمخاطر',
      beta: 'معامل بيتا للسوق',
      executeTrade: 'تنفيذ صفقة',
      rebalance: 'إعادة توازن',
      sync: 'مزامنة الأسعار',
      exportCsv: 'تصدير الأصول CSV',
      addPosition: 'إضافة مركز استثماري',
      saveChanges: 'حفظ التغييرات',
      language: 'اللغة',
      theme: 'نمط المظهر',
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export const switchAppLanguage = (lng: 'en' | 'ar') => {
  i18n.changeLanguage(lng)
  if (typeof document !== 'undefined') {
    const isArabic = lng === 'ar'
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.lang = lng
    localStorage.setItem('nexus_locale_preference', lng)
  }
}

export default i18n
