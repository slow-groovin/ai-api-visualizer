/**
 * LLM Data Parser
 * 解析用户输入的 JSON 数据，识别 API 类型和请求/响应类型
 */

import type { ApiStandard, DataType } from '../../types/llm/flow';

/**
 * 解析结果接口
 */
export interface ParseResult {
  /** 是否解析成功 */
  success: boolean;
  /** 识别到的 API 标准 */
  standard: ApiStandard;
  /** 数据类型：请求/响应/SSE */
  dataType: DataType;
  /** 解析后的数据对象 */
  data: unknown;
  /** 错误信息（解析失败时） */
  error?: string;
}

/**
 * 尝试解析 JSON 字符串
 * @param input 输入字符串
 * @returns 解析结果
 */
function tryParseJson(input: string): { success: boolean; data?: unknown; error?: string } {
  try {
    const data = JSON.parse(input);
    return { success: true, data };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Invalid JSON'
    };
  }
}

/**
 * 检测是否为 OpenAI 格式的数据
 */
function detectOpenAI(data: Record<string, unknown>): boolean {
  // OpenAI 请求特征
  if (data.model && Array.isArray(data.messages)) {
    return true;
  }
  // OpenAI 响应特征
  if (data.object === 'chat.completion' && Array.isArray(data.choices)) {
    return true;
  }
  // OpenAI SSE 特征
  if (data.object === 'chat.completion.chunk') {
    return true;
  }
  return false;
}

/**
 * 检测是否为 Claude 格式的数据
 */
function detectClaude(data: Record<string, unknown>): boolean {
  // Claude 请求特征
  if (data.model && Array.isArray(data.messages) && data.max_tokens !== undefined) {
    // 检查是否有 Claude 特有的字段
    if (data.system !== undefined || data.tool_choice !== undefined) {
      return true;
    }
  }
  // Claude 响应特征
  if (data.type === 'message' && data.role === 'assistant' && Array.isArray(data.content)) {
    return true;
  }
  return false;
}

/**
 * 检测是否为 Gemini 格式的数据
 */
function detectGemini(data: Record<string, unknown>): boolean {
  // Gemini 请求特征
  if (Array.isArray(data.contents) && data.generationConfig) {
    return true;
  }
  // Gemini 响应特征
  if (Array.isArray(data.candidates) && data.usageMetadata) {
    return true;
  }
  return false;
}

/**
 * 检测数据类型（请求/响应/SSE）
 */
function detectDataType(data: Record<string, unknown>, standard: ApiStandard): DataType {
  switch (standard) {
    case 'openai':
      // 请求：有 messages 数组
      if (Array.isArray(data.messages)) {
        return 'request';
      }
      // SSE：有 object === 'chat.completion.chunk'
      if (data.object === 'chat.completion.chunk') {
        return 'sse';
      }
      // 响应：有 choices 数组
      if (Array.isArray(data.choices)) {
        return 'response';
      }
      return 'request';

    case 'claude':
      // 请求：有 messages 和 max_tokens
      if (Array.isArray(data.messages) && data.max_tokens !== undefined) {
        return 'request';
      }
      // 响应：有 type === 'message'
      if (data.type === 'message') {
        return 'response';
      }
      return 'request';

    case 'gemini':
      // 请求：有 contents 数组
      if (Array.isArray(data.contents)) {
        return 'request';
      }
      // 响应：有 candidates 数组
      if (Array.isArray(data.candidates)) {
        return 'response';
      }
      return 'request';

    default:
      return 'request';
  }
}

/**
 * 解析 LLM JSON 数据
 * @param input 用户输入的 JSON 字符串
 * @returns 解析结果
 */
export function parseLLMData(input: string): ParseResult {
  // 步骤 1: 尝试解析 JSON
  const parseResult = tryParseJson(input);
  if (!parseResult.success) {
    return {
      success: false,
      standard: 'openai',
      dataType: 'request',
      data: null,
      error: parseResult.error
    };
  }

  const data = parseResult.data;

  // 确保数据是对象
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return {
      success: false,
      standard: 'openai',
      dataType: 'request',
      data: null,
      error: 'JSON must be an object, not an array or primitive'
    };
  }

  const recordData = data as Record<string, unknown>;

  // 步骤 2: 检测 API 标准
  let standard: ApiStandard;
  if (detectOpenAI(recordData)) {
    standard = 'openai';
  } else if (detectClaude(recordData)) {
    standard = 'claude';
  } else if (detectGemini(recordData)) {
    standard = 'gemini';
  } else {
    // 默认使用 OpenAI
    standard = 'openai';
  }

  // 步骤 3: 检测数据类型
  const dataType = detectDataType(recordData, standard);

  return {
    success: true,
    standard,
    dataType,
    data
  };
}
