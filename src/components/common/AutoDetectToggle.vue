<script setup lang="ts">
/**
 * AutoDetectToggle Component
 * 自动检测开关组件
 */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLLMStore } from '@/stores/llm';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
const llmStore = useLLMStore();
const { autoDetect, inputText, detectedStandard, detectedDataType } = storeToRefs(llmStore);

const getStandardLabel = (std: string) => {
  const labels: Record<string, string> = {
    openai: 'OpenAI',
    claude: 'Claude',
    gemini: 'Gemini'
  };
  return labels[std] || std;
};

const getDataTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    request: 'Request',
    response: 'Response',
    sse: 'Response SSE'
  };
  return labels[type] || type;
};

// 计算当前检测结果作为标题 - 直接使用 store 中的检测结果
const detectedInfo = computed(() => {
  if (!inputText.value.trim()) {
    return t.autoDetectInputHint;
  }
  if (detectedStandard.value === null || detectedDataType.value === null) {
    return t.autoDetectFailed;
  }
  return t.autoDetected(getStandardLabel(detectedStandard.value), getDataTypeLabel(detectedDataType.value));
});
</script>

<template>
  <label class="auto-detect-toggle" :title="detectedInfo">
    <input
      type="checkbox"
      :checked="autoDetect"
      @change="llmStore.autoDetect = ($event.target as any).checked"
    />
    <span class="toggle-text">Auto Detect</span>
  </label>
</template>

<style scoped>
.auto-detect-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  font-size: var(--llm-font-sm, 13px);
  color: var(--color-text-secondary, #666);
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s;
}

.auto-detect-toggle:hover {
  background: rgba(0, 0, 0, 0.04);
  color: var(--color-text-primary, #333);
}

.auto-detect-toggle input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--color-primary, #1976d2);
}

.toggle-text {
  white-space: nowrap;
}
</style>