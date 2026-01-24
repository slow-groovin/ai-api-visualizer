export const LOCALES = ["en-US", "zh-CN", "ja-JP", "zh-TW", "ko-KR", "es-ES", "de-DE", "fr-FR", "ru-RU", "ar-SA", "pt-PT"] as const;
export type Locale = (typeof LOCALES)[number];

// 语言显示名称映射
export const LOCALE_DISPLAY_NAMES: Record<Locale, string> = {
  "en-US": "English",
  "zh-CN": "简体中文",
  "ja-JP": "日本語",
  "zh-TW": "繁體中文",
  "ko-KR": "한국어",
  "es-ES": "Español",
  "de-DE": "Deutsch",
  "fr-FR": "Français",
  "ru-RU": "Русский",
  "ar-SA": "العربية",
  "pt-PT": "Português",
} as const;