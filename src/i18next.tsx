import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './dictionaries/en.json';
import ru from './dictionaries/ru.json';
import am from './dictionaries/hy.json';

const resources = {
   en: {
      translation: en,
   },
   ru: {
      translation: ru,
   },
   am: {
      translation: am,
   },
};

i18n.use(initReactI18next).init({
   compatibilityJSON: 'v3',
   resources,
   lng: 'am',
   interpolation: {
      escapeValue: false,
   },
});

export default i18n;