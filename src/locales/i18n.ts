import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      dashboardTitle: 'Executive Dashboard',
      dashboardSubtitle: 'Real-time business performance indicators and enterprise workload distribution.',
      analyticsTitle: 'Analytics Studio',
      dataTitle: 'Data Management',
      usersTitle: 'User & Access Management',
      telemetryTitle: 'Real-Time Telemetry',
      settingsTitle: 'System Settings',
      totalRevenue: 'Total Gross Revenue',
      activeUsers: 'Active Subscriptions',
      conversionRate: 'Conversion Ratio',
      systemHealth: 'System SLA Uptime',
      createReport: 'Create Report',
      sync: 'Sync',
      exportCsv: 'Export CSV',
      addRecord: 'Add Record',
      saveChanges: 'Save Changes',
      language: 'Language',
      theme: 'Theme Mode',
    },
  },
  ar: {
    translation: {
      dashboardTitle: 'لوحة التحكم التنفيذية',
      dashboardSubtitle: 'مؤشرات الأداء التجاري في الوقت الفعلي وتوزيع أعباء العمل للمؤسسة.',
      analyticsTitle: 'استوديو التحليلات المتقدمة',
      dataTitle: 'إدارة البيانات والسجلات',
      usersTitle: 'إدارة المستخدمين والصلاحيات',
      telemetryTitle: 'المراقبة والقياس الفوري',
      settingsTitle: 'إعدادات النظام والواجهة',
      totalRevenue: 'إجمالي الإيرادات الكلية',
      activeUsers: 'الاشتراكات النشطة',
      conversionRate: 'معدل التحويل',
      systemHealth: 'كفاءة النظام والتشغيل',
      createReport: 'إنشاء تقرير',
      sync: 'مزامنة',
      exportCsv: 'تصدير CSV',
      addRecord: 'إضافة سجل',
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
