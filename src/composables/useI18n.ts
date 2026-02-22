import { ref, computed } from "vue";
import { LOCALES, LOCALE_DISPLAY_NAMES, type Locale } from "../types/i18n";
import { MESSAGES } from "../assets/i18n";

const STORAGE_KEY = "app-locale";

function detectBrowserLocale(): Locale {
  const browserLangs = navigator.languages || [navigator.language];

  for (const lang of browserLangs) {
    const normalized = lang.toLowerCase();
    const exact = LOCALES.find((l) => l.toLowerCase() === normalized);
    if (exact) return exact;

    const langCode = normalized.split("-")[0];
    const partial = LOCALES.find((l) =>
      l.toLowerCase().startsWith(langCode || ""),
    );
    if (partial) return partial;
  }

  return LOCALES[0];
}

const currentLocale = ref<Locale>(
  (localStorage.getItem(STORAGE_KEY) as Locale) || detectBrowserLocale(),
);

export function useI18n() {
  const locale = computed(() => currentLocale.value);

  // 返回 Proxy 对象，保留类型提示
  const t = new Proxy({} as (typeof MESSAGES)[Locale], {
    get: (_, key: string) => {
      const value = MESSAGES?.[currentLocale.value]?.[
        key as keyof (typeof MESSAGES)[Locale]
      ];
      if (!value) {
        console.debug(`i18n: ${key} is not exist.`);
      }
      return value || key;
    },
  });

  const setLocale = (newLocale: Locale) => {
    currentLocale.value = newLocale;
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  };

  const availableLocales = computed(() =>
    LOCALES.map((code) => ({
      code,
      name: LOCALE_DISPLAY_NAMES[code],
    }))
  );

  return { locale, t, setLocale, availableLocales };
}