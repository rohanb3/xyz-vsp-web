import Vue from 'vue';
import VueI18n from 'vue-i18n';
import moment from 'moment';

import 'moment/locale/de';
import 'moment/locale/fr';

import en from '@/assets/i18n/en.json';
import de from '@/assets/i18n/de.json';
import fr from '@/assets/i18n/fr.json';
import es from '@/assets/i18n/es.json';

Vue.use(VueI18n);

const pickLang = languageRaw => languageRaw.slice(0, 2);

export const DEFAULT_LANGUAGE = pickLang(navigator.language) || 'en';

const i18n = new VueI18n({
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    de,
    fr,
    es,
  },
});

moment.locale(DEFAULT_LANGUAGE);

export function setLang(lang) {
  const language = localStorage.getItem('lang') || lang;
  i18n.locale = i18n.messages[language] !== undefined ? language : DEFAULT_LANGUAGE;
  moment.locale(i18n.locale);
}

export default i18n;

const onLanguageChanged = () => setLang(pickLang(navigator.language));

window.addEventListener('languagechange', onLanguageChanged);
