/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-12-16 16:16:13
 * @LastEditTime: 2019-12-17 09:44:48
 * @Description: i18n init
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// default language
import enLocale from './lang/en'
import zhLocale from './lang/zh'
// element locale lang
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'

// change default accept-language
import { service } from '@/utils/request'

Vue.use(VueI18n)

export const defaultLang = 'zh'

const messages = {
  en: {
    ...elementEnLocale,
    ...enLocale
  },
  zh: {
    ...elementZhLocale,
    ...zhLocale
  }
}

const i18n = new VueI18n({
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
})

export default i18n

const loadedLanguages = [defaultLang]

function setI18nLanguage (lang) {
  i18n.locale = lang
  service.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    Vue.ls.set('lang', lang)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          i18n.setLocaleMessage(lang, msg.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}
