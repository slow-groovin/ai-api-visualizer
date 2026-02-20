<script setup lang="ts">
import { computed, ref, onErrorCaptured, defineAsyncComponent, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import type { ApiStandard, DataType } from '@/types/llm';
import type { TransferResult } from '@/lib/transfer/types';
import { unifiedTransferData } from '@/lib/transfer/unified';

const { t } = useI18n();

interface Props {
  standard: ApiStandard;
  dataType: DataType;
  data: string;
  path?: string;
}

const props = defineProps<Props>();

// 组件映射表
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
const isRetrying = ref(false);

// 监听 props 变化,自动重置错误状态
watch(() => [props.standard, props.dataType, props.data], () => {
  componentError.value = null;
  isRetrying.value = false;
});

onErrorCaptured((err: Error) => {
  console.error('[ViewDashboardProxy] 组件错误:', err);
  componentError.value = err;
  return false;
});

// 数据转换结果
const transferResult = computed<TransferResult>(() => {
  if (!props.data) {
    return {
      success: false,
      timestamp: Date.now()
    } as TransferResult;
  }

  try {
    return unifiedTransferData(props.standard, props.dataType, props.data);
  } catch (err) {
    console.error('[ViewDashboardProxy] 数据转换失败:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : '数据转换失败',
      timestamp: Date.now()
    };
  }
});

// 当前组件
const currentComponent = computed(() => {
  return componentMap[props.standard]?.[props.dataType];
});

// 组件数据
const componentData = computed(() => {
  return transferResult.value.success ? transferResult.value.data : null;
});

// 错误信息
const errorMessage = computed(() => {
  if (componentError.value) {
    return `组件渲染错误: ${componentError.value.message}`;
  }
  if (!currentComponent.value) {
    return `不支持的组件类型: ${props.standard} - ${props.dataType}`;
  }
  return transferResult.value.error || null;
});

// 重试
const retry = () => {
  isRetrying.value = true;
  componentError.value = null;

  // 短暂延迟后重置重试状态
  setTimeout(() => {
    isRetrying.value = false;
  }, 300);
};
</script>

<template>
  <div class="view-dashboard-proxy">
    <!-- 空数据状态 -->
    <div v-if="!props.data" class="state-container empty-state">
      <span class="state-icon">📭</span>
      <span class="state-title">{{ t.waitingForInput }}</span>
    </div>

    <!-- 组件错误状态 -->
    <div v-else-if="componentError" class="state-container error-state">
      <div class="state-icon">💥</div>
      <div class="state-title">组件加载失败</div>
      <div class="state-message">{{ componentError.message }}</div>
      <button @click="retry" class="retry-btn" :disabled="isRetrying">
        {{ isRetrying ? '重试中...' : '重试' }}
      </button>
    </div>

    <!-- 数据解析错误状态 -->
    <div v-else-if="errorMessage" class="state-container error-state">
      <div class="state-icon">⚠️</div>
      <div class="state-title">数据解析失败</div>
      <div class="state-message">{{ errorMessage }}</div>
    </div>

    <!-- 无数据状态 -->
    <div v-else-if="!componentData" class="state-container empty-state">
      <div class="state-icon">📭</div>
      <div class="state-title">暂无数据</div>
    </div>

    <!-- 组件渲染 -->

    <Suspense v-else>
      <!-- @vue-ignore -->
      <component :is="currentComponent" :data="componentData" :path="path" />
      <template #fallback>
        <div class="state-container loading-state">
          <div class="loading-spinner"></div>
          <div class="state-title">加载中...</div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.view-dashboard-proxy {
  position: relative;
  min-height: 200px;
}

.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 16px;
}

.state-icon {
  font-size: 48px;
  line-height: 1;
}

.state-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary, #333);
}

.state-message {
  font-size: 14px;
  color: var(--color-text-secondary, #666);
  text-align: center;
  max-width: 500px;
  word-break: break-word;
}

.empty-state {
  opacity: 0.6;
}

.error-state .state-icon {
  animation: shake 0.5s ease-in-out;
}

.error-state .state-title {
  color: var(--color-error, #d32f2f);
}

.error-state .state-message {
  color: var(--color-error-light, #ef5350);
  font-family: monospace;
  font-size: 12px;
  background: var(--color-error-bg, #ffebee);
  padding: 12px;
  border-radius: 4px;
  max-height: 200px;
  overflow: auto;
}

.loading-state {
  opacity: 0.8;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border, #e0e0e0);
  border-top-color: var(--color-primary, #1976d2);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.retry-btn {
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background: var(--color-primary, #1976d2);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-btn:hover:not(:disabled) {
  background: var(--color-primary-dark, #1565c0);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
}

.retry-btn:active:not(:disabled) {
  transform: translateY(0);
}

.retry-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-8px);
  }

  75% {
    transform: translateX(8px);
  }
}
</style>