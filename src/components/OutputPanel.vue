<template>
  <div class="flex flex-col relative h-full">
    <!-- Output Container -->
    <div
      class="flex-1 bg-background rounded-xl shadow-sm border border-border overflow-hidden relative hover:border-green-300 transition-colors">
      <div class="w-full h-full overflow-auto">
        <template v-if="parsedData">
          <!-- Use ViewDashboardProxy for LLM data visualization -->
          <ViewDashboardProxy
            :standard="parsedData.standard"
            :data-type="parsedData.dataType"
            :data="JSON.stringify(parsedData.data)"
          />
        </template>
        <template v-else>
          <!-- Empty state -->
          <div class="h-full flex items-center justify-center text-foreground-secondary italic">
            <span>{{ placeholder || 'Waiting for input...' }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * OutputPanel Component
 * Renders the LLM API data visualization using ViewDashboardProxy.
 */
import { computed } from 'vue';
import ViewDashboardProxy from './llm/ViewDashboardProxy.vue';
import type { ApiStandard, DataType } from '../types/llm/flow';

/**
 * Parsed data interface
 */
interface ParsedData {
  /** API standard */
  standard: ApiStandard;
  /** Data type: request/response/sse */
  dataType: DataType;
  /** Parsed data object */
  data: unknown;
}

/**
 * Component props
 */
interface Props {
  /** Raw JSON string input */
  rawInput?: string;
  /** Pre-parsed data object */
  parsedData?: ParsedData | null;
  /** Placeholder text when no data */
  placeholder?: string;
}

const props = defineProps<Props>();

/**
 * Computed parsed data from raw input if no pre-parsed data is provided
 */
const effectiveParsedData = computed<ParsedData | null>(() => {
  // If pre-parsed data is provided, use it
  if (props.parsedData) {
    return props.parsedData;
  }

  // Otherwise, try to parse raw input
  if (!props.rawInput || !props.rawInput.trim()) {
    return null;
  }

  try {
    const data = JSON.parse(props.rawInput);

    // Detect API standard
    let standard: ApiStandard = 'openai';
    let dataType: DataType = 'request';

    // Detect OpenAI
    if (data.object === 'chat.completion' || data.object === 'chat.completion.chunk') {
      standard = 'openai';
      dataType = data.object === 'chat.completion.chunk' ? 'sse' : 'response';
    } else if (Array.isArray(data.messages) && data.model) {
      standard = 'openai';
      dataType = 'request';
    }

    // Detect Claude
    if (data.type === 'message' && data.role === 'assistant') {
      standard = 'claude';
      dataType = 'response';
    } else if (Array.isArray(data.messages) && data.max_tokens !== undefined && data.system !== undefined) {
      standard = 'claude';
      dataType = 'request';
    }

    // Detect Gemini
    if (Array.isArray(data.candidates) && data.usageMetadata) {
      standard = 'gemini';
      dataType = 'response';
    } else if (Array.isArray(data.contents) && data.generationConfig) {
      standard = 'gemini';
      dataType = 'request';
    }

    return {
      standard,
      dataType,
      data
    };
  } catch {
    return null;
  }
});
</script>

<style scoped>
div::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 99px;
}

div::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>
