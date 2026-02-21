import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useLocalStorage, useDebounceFn } from '@vueuse/core';
import type { ApiStandard, DataType } from '../types/llm';
import { tryDetect } from '../lib/detect';

export const useLLMStore = defineStore('llm', () => {
  // 状态 - 直接使用 ref 创建可写的响应式数据
  const inputText = ref('');
  const standard = ref<ApiStandard>('openai');
  const dataType = ref<DataType>('response');
  const autoDetect = useLocalStorage('llm-auto-detect', false);
  const detectedStandard = ref<ApiStandard | null>(null);
  const detectedDataType = ref<DataType | null>(null);

  // 计算属性
  const isInputEmpty = computed(() => !inputText.value.trim());

  // 检测并更新 detectedStandard 和 detectedDataType
  const execDetection = () => {
    if(!autoDetect.value) {
      return;
    }
    if (!inputText.value.trim()) {
      detectedStandard.value = null;
      detectedDataType.value = null;
      return;
    }
    try {
      const result = tryDetect(inputText.value);
      console.log('Detection result:', result);
      detectedStandard.value = result.standard;
      detectedDataType.value = result.dataType;
      standard.value = result.standard || standard.value;
      dataType.value = result.dataType || dataType.value;
    } catch {
      detectedStandard.value = null;
      detectedDataType.value = null;
    }
  };

  watch(inputText, useDebounceFn(() => {
    execDetection();
  }, 1300));
  // 监听自动检测开关变化
  watch(autoDetect, (newVal) => {
    if (newVal) {
      execDetection();
    }
  });

  // 业务逻辑方法 - 只在有复杂逻辑时使用
  const reset = () => {
    inputText.value = '';
    standard.value = 'openai';
    dataType.value = 'response';
    autoDetect.value = false;
    detectedStandard.value = null;
    detectedDataType.value = null;
  };

  return {
    // 状态
    inputText,
    standard,
    dataType,
    autoDetect,
    detectedStandard,
    detectedDataType,
    // 计算属性
    isInputEmpty,
    // 业务逻辑方法
    reset,
  };
});