function sync(store, i18n, options) {
 var moduleName = (options || {}).moduleName || "i18n";

 store.registerModule(moduleName, {
   namespaced: true,
   state: {
     locale: i18n.currentLocale,
   },
   mutations: {
     LOCALE_CHANGED: function LOCALE_CHANGED(state, payload) {
       store.state[moduleName] = payload;
     },
   },
 });

 i18n.addChangedListener((locale) => {
   store.commit(moduleName + "/LOCALE_CHANGED", locale);
 });
}

export default sync;