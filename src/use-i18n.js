import { inject } from "vue";

function useI18n() {
  return inject("$i18n");
}

export default useI18n;
