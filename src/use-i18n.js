import { onUnmounted, inject } from "vue";
import { forEach } from 'ramda';

const useI18n = () => {
  const i18n = inject('$i18n');
  let _observer = [];

  onUnmounted(() => {
    forEach((fn) => {
      i18n.removeChangedListener(fn);
    }, _observer);
  });

  const onChanged = (fn) => {
    _observer = [..._observer, fn];
    i18n.addChangedListener(fn);
  };

  return {
    getLocale: i18n.getLocale,
    change: i18n.setLocale,
    t: i18n.transfer,
    addMessages: i18n.addMessages,
    onChanged,
  };
};

export default useI18n;