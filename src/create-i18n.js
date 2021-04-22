import {
  match,
  replace,
  reduce,
  clone,
  mergeDeepRight,
  forEach,
  append,
  reject,
  equals,
} from "ramda";

const createI18n = (options) => {
  const config = mergeDeepRight(
    {
      defaultLocale: "zh-tw",
      feedbackLocale: "en",
      messages: {},
    },
    options
  );

  const constants = {
    _localeValue: config.defaultLocale,
    get localeValue() {
      return constants._localeValue;
    },
    set localeValue(value) {
      constants._localeValue = value;
    },
    messages: config.messages,
    changeObserver: [],
  };

  const regExp = new RegExp(/\{([^}]*)\}/, "g");

  const self = {
    getLocale() {
      return constants.localeValue;
    },
    setLocale(value) {
      const prevValue = constants.localeValue;
      constants.localeValue = value;
      forEach(
        (fn) => fn({ locale: value }, { locale: prevValue }),
        constants.changeObserver
      );
    },
    addMessages(locale, msgs) {
      constants.messages[locale] = mergeDeepRight(
        constants.messages[locale] || {},
        msgs
      );
    },
    addChangedListener(fn) {
      constants.changeObserver = append(fn, constants.changeObserver);
    },
    removeChangedListener(fn) {
      constants.changeObserver = reject(equals(fn), constants.changeObserver);
    },
    transfer(key, params = {}) {
      const locales = constants.messages[constants.localeValue] || {};
      const feedbackLocales = constants.messages[config.feedbackLocale] || {};
      const value = locales[key] || feedbackLocales[key] || key;
      const matches = match(regExp, value);
      return reduce((str, match) => {
        const replaceRegExp = new RegExp(match);
        const key = match.substring(1, match.length - 1);
        return params[key] ? replace(replaceRegExp, params[key], str) : str;
      }, clone(value))(matches);
    },
  };

  return {
    install(app) {
      app.provide("$i18n", self);
    },
    ...self,
  };
};

export default createI18n;
