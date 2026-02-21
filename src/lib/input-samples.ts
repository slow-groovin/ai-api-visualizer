import type { ApiStandard, DataType } from "@/types/llm";

export interface SampleInfo {
  id: string;
  standard: ApiStandard;
  dataType: DataType;
  label: string;
}

export const sampleInfoList: SampleInfo[] = [
  { id: "openai-request", standard: "openai", dataType: "request", label: "OpenAI Request" },
  { id: "openai-response", standard: "openai", dataType: "response", label: "OpenAI Response" },
  { id: "openai-sse", standard: "openai", dataType: "sse", label: "OpenAI SSE" },
  { id: "claude-request", standard: "claude", dataType: "request", label: "Claude Request" },
  { id: "claude-response", standard: "claude", dataType: "response", label: "Claude Response" },
  { id: "claude-sse", standard: "claude", dataType: "sse", label: "Claude SSE" },
  { id: "gemini-request", standard: "gemini", dataType: "request", label: "Gemini Request" },
  { id: "gemini-response", standard: "gemini", dataType: "response", label: "Gemini Response" },
  { id: "gemini-sse", standard: "gemini", dataType: "sse", label: "Gemini SSE" },
];

const sampleLoaders: Record<string, () => Promise<Record<DataType, string>>> = {
  openai: () => import("./samples/openai").then(m => m.default),
  claude: () => import("./samples/claude").then(m => m.default),
  gemini: () => import("./samples/gemini").then(m => m.default),
};

export async function loadSample(standard: ApiStandard, dataType: DataType): Promise<string> {
  const loader = sampleLoaders[standard];
  if (!loader) {
    throw new Error(`No sample loader for standard: ${standard}`);
  }
  const samples = await loader();
  return samples[dataType] || "";
}

export async function loadSampleById(sampleId: string): Promise<{ standard: ApiStandard; dataType: DataType; content: string } | null> {
  const sampleInfo = sampleInfoList.find(s => s.id === sampleId);
  if (!sampleInfo) {
    return null;
  }
  const content = await loadSample(sampleInfo.standard, sampleInfo.dataType);
  return {
    standard: sampleInfo.standard,
    dataType: sampleInfo.dataType,
    content,
  };
}

export function getSampleUrl(sampleId: string): string {
  const url = new URL(window.location.href);
  url.searchParams.set("sample", sampleId);
  return url.toString();
}

export function parseSampleFromUrl(): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get("sample");
}
