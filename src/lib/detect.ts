import type { ApiStandard, DataType } from "@/types/llm";

/**
 * Detect API standard and data type from input text
 * @param inputText - Raw input string to analyze
 * @returns Object containing detected standard and data type
 */
export function tryDetect(inputText: string): { standard: ApiStandard|null; dataType: DataType|null } {
  const trimmed = inputText.trim();

  // JSON format detection
  if (trimmed.startsWith('{')) {
    // Response detection (use string matching to avoid parse errors)
    if (trimmed.includes('"choices"') && trimmed.includes('"finish_reason"')) {
      return { standard: "openai", dataType: "response" };
    }
    
    if (trimmed.includes('"stop_reason"')) {
      return { standard: "claude", dataType: "response" };
    }
    
    if (trimmed.includes('"modelVersion"')) {
      return { standard: "gemini", dataType: "response" };
    }

    // Request detection (parse JSON to check top-level keys)
    try {
      const parsed = JSON.parse(trimmed);
      const keys = Object.keys(parsed);

      if (keys.includes('contents')) {
        return { standard: "gemini", dataType: "request" };
      }

      if (keys.includes('messages') && keys.includes('system')) {
        return { standard: "claude", dataType: "request" };
      }

      if (keys.includes('messages')) {
        return { standard: "openai", dataType: "request" };
      }
    } catch {
      // If parse fails, treat as unknown JSON
      return { standard: null, dataType: null };

    }
  }

  // SSE format detection
  if (trimmed.includes('"choices"')) {
    return { standard: "openai", dataType: "sse" };
  }

  if (trimmed.includes('"nounce"')) {
    return { standard: "gemini", dataType: "sse" };
  }

  return { standard: null, dataType: null };
}