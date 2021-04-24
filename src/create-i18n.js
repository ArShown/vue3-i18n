import {
  match,
  replace,
  reduce,
  clone,
  mergeDeepRight,
} from "ramda";
import { ref, readonly } from 'vue';

function I18n(options) {
  const config = mergeDeepRight(
    {
      initLocale: "zh-tw",
      fallbackLocale: "en",
      messages: {},
    },
    options
  );
  const currentLocale = ref(config.initLocale);

  const constants = {
    messages: config.messages,
  };

  this.locale = readonly(currentLocale);
 
  this.setLocale = function setLocale(value) {
    currentLocale.value = value;
  };

  this.addMessages = function addMessages(locale, msgs) {
    constants.messages[locale] = mergeDeepRight(
      constants.messages[locale] || {},
      msgs
    );
  };
 
  const regExp = new RegExp(/\{([^}]*)\}/, "g");
  this.t = function t(key, params = {}) {
    const initMessages = constants.messages[currentLocale.value] || {};
    const fallbackMessages = constants.messages[config.fallbackLocale] || {};
    const value = initMessages[key] || fallbackMessages[key] || key;
    const matches = match(regExp, value);
    return reduce((str, match) => {
      const replaceRegExp = new RegExp(match);
      const key = match.substring(1, match.length - 1);
      return params[key] ? replace(replaceRegExp, params[key], str) : str;
    }, clone(value))(matches);
  };
}

I18n.prototype.install = function install(app) {
  app.config.globalProperties.$i18n = this;
  app.provide("$i18n", this);
};

function createI18n(options) {
  return new I18n(options);
}

export default createI18n;
