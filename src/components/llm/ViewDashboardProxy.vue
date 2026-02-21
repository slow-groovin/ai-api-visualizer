<script setup lang="ts">
import { computed, ref, onErrorCaptured, defineAsyncComponent, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import type { ApiStandard, DataType } from '@/types/llm';
import type { TransferResult } from '@/lib/transfer/types';
import { unifiedTransferData } from '@/lib/transfer/unified';
import { useSampleLoader } from '@/composables/useSampleLoader';

const { t } = useI18n();
const { sampleInfoList, handleSampleClick } = useSampleLoader();
interface Props {
  standard: ApiStandard;
  dataType: DataType;
  data: string;
  path?: string;
}

const props = defineProps<Props>();

// ... (componentMap 和其他原有逻辑保持不变)
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

watch(() => [props.standard, props.dataType, props.data], () => {
  componentError.value = null;
  isRetrying.value = false;
});

onErrorCaptured((err: Error) => {
  console.error('[ViewDashboardProxy] 组件错误:', err);
  componentError.value = err;
  return false;
});

const transferResult = computed<TransferResult>(() => {
  if (!props.data) {
    return { success: false, timestamp: Date.now() } as TransferResult;
  }
  try {
    return unifiedTransferData(props.standard, props.dataType, props.data);
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : '数据转换失败', timestamp: Date.now() };
  }
});





const currentComponent = computed(() => componentMap[props.standard]?.[props.dataType]);
const componentData = computed(() => transferResult.value.success ? transferResult.value.data : null);
const errorMessage = computed(() => {
  if (componentError.value) return `组件渲染错误: ${componentError.value.message}`;
  if (!currentComponent.value) return `不支持的组件类型: ${props.standard} - ${props.dataType}`;
  return transferResult.value.error || null;
});

const retry = () => {
  isRetrying.value = true;
  componentError.value = null;
  setTimeout(() => { isRetrying.value = false; }, 300);
};

// 辅助函数：生成简短的显示名称 (e.g., "OpenAI Stream")
const getSampleLabel = (standard: string, label: string) => {
  // 假设 label 格式为 "OpenAI Chat Completion"，我们取后半部分
  const parts = label.split(' ');
  const suffix = parts.length > 1 ? parts.slice(1).join(' ') : label;
  // 首字母大写 standard
  const prefix = standard.charAt(0).toUpperCase() + standard.slice(1);
  return `${prefix} ${suffix}`;
};
</script>

<template>
  <div class="view-dashboard-proxy">
    
    <!-- 状态：等待输入 (Empty State) -->
    <div v-if="!props.data" class="state-container empty-state">
      <div class="main-icon">📭</div>
      <div class="state-title">{{ t.waitingForInput }}</div>

      <!-- 极简风格的 Sample Links -->
      <div class="quick-samples">
        <span class="samples-label">No data? Here are some samples:</span>
        <template v-for="(sample, index) in sampleInfoList" :key="sample.id">
          <a 
            href="#" 
            @click.prevent="handleSampleClick(sample.id)" 
            class="sample-link"
          >
            {{ getSampleLabel(sample.standard, sample.label) }}
          </a>
          <span v-if="index < sampleInfoList.length - 1" class="separator">/</span>
        </template>
      </div>
    </div>

    <!-- 状态：组件加载错误 -->
    <div v-else-if="componentError" class="state-container error-state">
      <div class="state-icon">💥</div>
      <div class="state-title">组件加载失败</div>
      <div class="state-message">{{ componentError.message }}</div>
      <button @click="retry" class="retry-btn" :disabled="isRetrying">
        {{ isRetrying ? '重试中...' : '重试' }}
      </button>
    </div>

    <!-- 状态：数据解析错误 -->
    <div v-else-if="errorMessage" class="state-container error-state">
      <div class="state-icon">⚠️</div>
      <div class="state-title">数据解析失败</div>
      <div class="state-message">{{ errorMessage }}</div>
    </div>

    <!-- 状态：无数据内容 -->
    <div v-else-if="!componentData" class="state-container empty-state">
      <div class="state-icon">📭</div>
      <div class="state-title">暂无数据</div>
    </div>

    <!-- 状态：正常显示组件 -->
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

.main-icon {
  font-size: var(--llm-font-2xl);
  line-height: 1;
  opacity: 0.5;
}

.state-title {
  font-size: var(--llm-font-base);
  font-weight: 500;
  color: var(--color-text-primary, #333);
  margin-bottom: 8px;
}

/* === 极简 Sample 样式 === */
.quick-samples {
  margin-top: 10vh;
  font-size: var(--llm-font-base);
  color: var(--color-text-tertiary, #999);
  text-align: center;
  line-height: 1.6;
  max-width: 600px;
}

.samples-label {
  margin-right: 8px;
}

.sample-link {
  color: var(--color-text-secondary, #666);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  /* 确保看起来像普通文字链接 */
  border-bottom: 1px dashed transparent; 
}

.sample-link:hover {
  color: var(--color-primary, #1976d2);
  border-bottom-color: var(--color-primary, #1976d2);
}

.separator {
  margin: 0 6px;
  opacity: 0.3;
  font-size: 0.9em;
}

/* 其他原有样式保持不变 */
.state-message {
  font-size: var(--llm-font-sm);
  color: var(--color-text-secondary, #666);
  text-align: center;
  max-width: 500px;
  word-break: break-word;
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
  font-size: var(--llm-font-xs);
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
  font-size: var(--llm-font-sm);
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

.retry-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}
</style>