/**
 * LLM Flow 类型定义
 * 定义 API 标准和数据类型
 */

/** 支持的 API 标准 */
export type ApiStandard = 'openai' | 'claude' | 'gemini';

/** 数据类型 */
export type DataType = 'request' | 'response' | 'sse';

/** Flow 调用动作 */
export type CallAction = {
  uuid: string;
  action: 'request' | 'response';
};

/** HTTP Flow 定义 */
export type Flow = {
  id: string;
  intercepted: boolean;
  is_replay: null;
  type: 'http';
  modified: boolean;
  marked: string;
  comment: string;
  timestamp_created: number;
  request: {
    method: string;
    scheme: string;
    host: string;
    port: number;
    path: string;
    http_version: string;
    headers: Array<[string, string[]]>;
    contentLength: number;
    contentHash: string;
    timestamp_start: number;
    timestamp_end: number;
    pretty_host: string;
  };
  response: {
    http_version: string;
    status_code: number;
    reason: string;
    headers: Array<[string, string[]]>;
    contentLength: number;
    contentHash: string;
    timestamp_start: number;
    timestamp_end: number;
  };
};
