export const LOCALES = ["en-US", "zh-CN", "ja-JP"] as const;
export type Locale = (typeof LOCALES)[number];

export const MESSAGES = {
  "en-US": {
    welcome: "Welcome",
    hello: `Hello`,
    replace: "Replace",
  },
  "zh-CN": {
    welcome: "欢迎",
    hello: `你好`,
    replace: "替换",
  },
  "ja-JP": {
    welcome: "ようこそ",
    hello: `こんにちは`,
    replace: "置き換える",
  },
} as const;

export type MessageKeys = keyof (typeof MESSAGES)["zh-CN"];
