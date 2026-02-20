export type ApiStandard = 'openai' | 'claude' | 'gemini';
export type DataType = 'request' | 'response' | 'sse';
// 可用的标准选项
export const standardOptions: { value: ApiStandard; label: string }[] = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'claude', label: 'Claude' },
  { value: 'gemini', label: 'Gemini' },
];

export const dataTypeOptions: { value: DataType; label: string }[] = [
  { value: 'request', label: 'Request' },
  { value: 'response', label: 'Response' },
  { value: 'sse', label: 'SSE' },
];