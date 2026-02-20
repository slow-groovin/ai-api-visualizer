<script setup lang="ts">
import { computed, ref, onErrorCaptured, defineAsyncComponent } from 'vue';
import type { ApiStandard, DataType } from '@/types/llm';
import type { TransferResult } from '@/lib/transfer/types';
import { unifiedTransferData } from '@/lib/transfer/unified';

interface Props {
  standard: ApiStandard;
  dataType: DataType;
  data: string;
  path?: string;
}

const props = defineProps<Props>();

const componentMap = {
  openai: {
    request: defineAsyncComponent(() => import('./openai/OpenaiRequestView.vue')),
    response: defineAsyncComponent(() => import('./openai/OpenaiResponseView.vue')),
    sse: defineAsyncComponent(() => import('./openai/OpenaiResponseView.vue')),
  },
  claude: {
    request: defineAsyncComponent(() => import('./claude/ClaudeRequestView.vue')),
    response: defineAsyncComponent(() => import('./claude/ClaudeResponseView.vue')),
    sse: defineAsyncComponent(() => import('./claude/ClaudeResponseView.vue')),
  },
  gemini: {
    request: defineAsyncComponent(() => import('./gemini/GeminiRequestView.vue')),
    response: defineAsyncComponent(() => import('./gemini/GeminiResponseView.vue')),
    sse: defineAsyncComponent(() => import('./gemini/GeminiResponseView.vue')),
  },
} as const;

const componentError = ref<Error | null>(null);
const hasComponentError = computed(() => componentError.value !== null);

onErrorCaptured((err: Error) => {
  console.error('子组件错误:', err);
  componentError.value = err;
  return false;
});

const transferResult = computed<TransferResult>(() => {
  try {
    return unifiedTransferData(props.standard, props.dataType, props.data);
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Data Conversion Failed',
      timestamp: Date.now()
    };
  }
});

const currentComponent = computed(() => {
  return componentMap[props.standard]?.[props.dataType];
});

const componentData = computed(() => {
  return transferResult.value.success ? transferResult.value.data : null;
});

const errorMessage = computed(() => {
  if (hasComponentError.value) {
    return `Component Render Error: ${componentError.value?.message}`;
  }
  return transferResult.value.error || null;
});

const retry = () => {
  componentError.value = null;
};
</script>

<template>
  <div class="view-dashboard-proxy">
    <div v-if="hasComponentError" class="error-state">
      <div class="error-icon">💥</div>
      <div class="error-title">Component Load Failed</div>
      <div class="error-message">{{ componentError?.message }}</div>
      <button @click="retry" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="errorMessage" class="error-state">
      <div class="error-icon">⚠️</div>
      <div class="error-title">Data Parse Failed</div>
      <div class="error-message">{{ errorMessage }}</div>
    </div>

    <div v-else-if="!componentData" class="empty-state">
      <div class="empty-icon">📭</div>
      <div class="empty-title">No Data</div>
    </div>

    <Suspense v-else>
      <!-- @vue-ignore -->
      <component :is="currentComponent" :data="componentData" :path="path" />
      <template #fallback>
        <div class="loading-state">⏳ Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.view-dashboard-proxy {
  position: relative;
}
</style>
