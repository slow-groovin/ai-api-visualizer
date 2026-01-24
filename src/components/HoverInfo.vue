<template>
  <div class="relative inline-block" ref="containerRef" :title="tooltip">
    <!-- 
      触发区域：
      1. 使用 slot 接收外部传入的任何元素
      2. 绑定 click 事件触发显示
    -->
    <div @click="toggleTooltip" class="cursor-pointer">
      <slot></slot>
    </div>

    <!-- Tooltip 弹窗 -->
    <Transition name="fade">
      <div
        v-if="isVisible"
        class="absolute z-50 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap"
        :class="containerClasses"
      >
        {{ tooltip }}
        
        <!-- 小三角箭头 -->
        <div 
          class="absolute w-0 h-0 border-4 border-transparent"
          :class="arrowClasses"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 定义支持的对齐方向
type Placement = 
  | 'top'        // 上方居中
  | 'top-start'  // 上方左对齐
  | 'top-end'    // 上方右对齐
  | 'bottom'     // 下方居中
  | 'bottom-start' // 下方左对齐
  | 'bottom-end';  // 下方右对齐

interface Props {
  tooltip: string;
  placement?: Placement; // 可选，默认为 top
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
});

// 状态管理
const isVisible = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const toggleTooltip = () => {
  isVisible.value = !isVisible.value;
};

// 点击外部关闭逻辑
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

/**
 * 计算 Tooltip 容器的位置类名
 */
const containerClasses = computed(() => {
  switch (props.placement) {
    case 'top':
      return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    case 'top-start':
      return 'bottom-full left-0 mb-2';
    case 'top-end':
      return 'bottom-full right-0 mb-2';
    case 'bottom':
      return 'top-full left-1/2 -translate-x-1/2 mt-2';
    case 'bottom-start':
      return 'top-full left-0 mt-2';
    case 'bottom-end':
      return 'top-full right-0 mt-2';
    default:
      return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
  }
});

/**
 * 计算小三角的位置和颜色方向
 * 这里的逻辑是：如果是 top，箭头在底部；如果是 bottom，箭头在顶部
 */
const arrowClasses = computed(() => {
  const baseTop = 'border-t-gray-800 top-full'; // 箭头向下（位于tooltip底部）
  const baseBottom = 'border-b-gray-800 bottom-full'; // 箭头向上（位于tooltip顶部）

  switch (props.placement) {
    // 上方系列
    case 'top':
      return `${baseTop} left-1/2 -translate-x-1/2`;
    case 'top-start':
      return `${baseTop} left-2`; // 稍微靠左一点
    case 'top-end':
      return `${baseTop} right-2`; // 稍微靠右一点
      
    // 下方系列
    case 'bottom':
      return `${baseBottom} left-1/2 -translate-x-1/2`;
    case 'bottom-start':
      return `${baseBottom} left-2`;
    case 'bottom-end':
      return `${baseBottom} right-2`;
      
    default:
      return `${baseTop} left-1/2 -translate-x-1/2`;
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  /* 添加一点微小的位移效果，让动画更生动 */
  transform: translateY(2px); 
}
</style>