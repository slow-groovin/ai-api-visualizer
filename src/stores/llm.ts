import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ApiStandard, DataType } from '../types/llm';

export const useLLMStore = defineStore('llm', () => {
  // 状态 - 直接使用 ref 创建可写的响应式数据
  const inputText = ref('');
  const standard = ref<ApiStandard>('openai');
  const dataType = ref<DataType>('response');

  // 计算属性
  const isInputEmpty = computed(() => !inputText.value.trim());

  // 业务逻辑方法 - 只在有复杂逻辑时使用
  const reset = () => {
    inputText.value = '';
    standard.value = 'openai';
    dataType.value = 'response';
  };

  return {
    // 状态
    inputText,
    standard,
    dataType,
    // 计算属性
    isInputEmpty,
    // 业务逻辑方法
    reset
  };
});