import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      cart: 'Cart',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      toggle_theme: 'Toggle Theme',
    },
  },
  ar: {
    translation: {
      home: 'الرئيسية',
      cart: 'السلة',
      about: 'من نحن',
      contact: 'تواصل معنا',
      login: 'تسجيل الدخول',
      toggle_theme: 'الوضع الليلي/النهاري',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;