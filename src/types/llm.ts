export type ApiStandard = 'openai' | 'claude' | 'gemini';
export type DataType = 'request' | 'response' | 'sse';
// 可用的标准选项
export const standardOptions: { value: ApiStandard; label: string; icon?: string }[] = [
  { value: 'openai', label: 'OpenAI', icon: new URL('../assets/openai.svg', import.meta.url).href },
  { value: 'claude', label: 'Claude', icon: new URL('../assets/claude.svg', import.meta.url).href },
  { value: 'gemini', label: 'Gemini', icon: new URL('../assets/gemini.svg', import.meta.url).href },
];

export const dataTypeOptions: { value: DataType; label: string; icon?: string }[] = [
  { value: 'request', label: 'Request' },
  { value: 'response', label: 'Response' },
  { value: 'sse', label: 'Response SSE' },
];