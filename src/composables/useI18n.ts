import { ref, computed } from "vue";
import { LOCALES, LOCALE_DISPLAY_NAMES, type Locale } from "../types/i18n";
import {  MESSAGES } from "../assets/i18n";

const STORAGE_KEY = "app-locale";

// 检测浏览器语言
function detectBrowserLocale(): Locale {
  const browserLangs = navigator.languages || [navigator.language];

  for (const lang of browserLangs) {
    const normalized = lang.toLowerCase();
    // 完全匹配
    const exact = LOCALES.find((l) => l.toLowerCase() === normalized);
    if (exact) return exact;

    // 匹配语言代码部分 (如 en-GB -> en-US)
    const langCode = normalized.split("-")[0];
    const partial = LOCALES.find((l) =>
      l.toLowerCase().startsWith(langCode || ""),
    );
    if (partial) return partial;
    else return LOCALES[0];
  }

  return LOCALES[0]; // 默认第一个
}

// 全局状态
const currentLocale = ref<Locale>(
  (localStorage.getItem(STORAGE_KEY) as Locale) || detectBrowserLocale(),
);

export function useI18n() {
  const locale = computed(() => currentLocale.value);

  const t = computed(() => {
    return new Proxy({} as (typeof MESSAGES)[Locale], {
      get: (_, key: string) => {
        const value =
          MESSAGES?.[currentLocale.value]?.[
            key as keyof (typeof MESSAGES)[Locale]
          ];
        if(!value){
          console.debug(`i18n: ${key} is not exist.`)
        }
        return value || key;
      },
    });
  });

  const setLocale = (newLocale: Locale) => {
    currentLocale.value = newLocale;
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
    //refresh
    // nextTick();
  };

  // 可用语言选项：代码-显示名称
  const availableLocales = computed(() => 
    LOCALES.map(code => ({
      code,
      name: LOCALE_DISPLAY_NAMES[code]
    }))
  );

  return { locale, t, setLocale, availableLocales };
}
