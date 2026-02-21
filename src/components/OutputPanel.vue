<template>
  <div class="flex flex-col relative h-full">
    <!-- Output Container -->
    <div class="control-bar">
      <RadioButtonGroup v-model:model-value="standard" :options="standardOptions" />
      <RadioButtonGroup v-model:model-value="dataType" :options="dataTypeOptions" />
      <AutoDetectToggle />
    </div>
    <ViewDashboardProxy :standard="standard" :data-type="dataType" :data="inputText" />
  </div>
</template>

<script setup lang="ts">
/**
 * OutputPanel Component
 * Renders the LLM API data visualization using ViewDashboardProxy.
 */
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import ViewDashboardProxy from './llm/ViewDashboardProxy.vue';
import { dataTypeOptions, standardOptions, type ApiStandard, type DataType } from '../types/llm';
import RadioButtonGroup from './common/RadioButtonGroup.vue';
import AutoDetectToggle from './common/AutoDetectToggle.vue';
import { useLLMStore } from '../stores/llm';

// 获取 store 实例
const llmStore = useLLMStore();
// 使用 storeToRefs 解构以保持响应式
const { inputText, standard, dataType } = storeToRefs(llmStore);
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

.control-bar {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 8px 12px;
}
</style>
