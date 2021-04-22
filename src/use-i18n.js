import { inject } from "vue";

const useI18n = function useI18n() {
  return inject("$i18n");
};

export default useI18n;
