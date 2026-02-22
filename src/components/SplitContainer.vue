<template>
  <div class="split-container">
    <div class="left-panel" :style="{ width: leftWidth + 'px' }">
      <slot name="left"></slot>
    </div>
    <div class="divider" @mousedown="startDrag"></div>
    <div class="right-panel">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  storageKey?: string;
  minLeftWidth?: number;
  minRightWidth?: number;
}>();

const storageKey = props.storageKey || 'split-container-width';
const minLeftWidth = props.minLeftWidth || 300;
const minRightWidth = props.minRightWidth || 300;

const leftWidth = ref(500);

const loadSavedWidth = () => {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    leftWidth.value = parseInt(saved, 10);
  } else {
    setDefaultWidth();
  }
};

const setDefaultWidth = () => {
  const container = document.querySelector('.split-container');
  if (container) {
    leftWidth.value = container.clientWidth / 2;
  }
};

const saveWidth = () => {
  localStorage.setItem(storageKey, leftWidth.value.toString());
};

const startDrag = (e: MouseEvent) => {
  const startX = e.clientX;
  const startWidth = leftWidth.value;
  const container = document.querySelector('.split-container') as HTMLElement;
  const containerWidth = container.clientWidth;

  const onMouseMove = (e: MouseEvent) => {
    const newWidth = startWidth + (e.clientX - startX);
    const maxWidth = containerWidth - minRightWidth;
    leftWidth.value = Math.max(minLeftWidth, Math.min(maxWidth, newWidth));
  };

  const onMouseUp = () => {
    saveWidth();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

onMounted(() => {
  loadSavedWidth();
  const container = document.querySelector('.split-container');
  if (container) {
    const observer = new ResizeObserver(() => {
      if (!localStorage.getItem(storageKey)) {
        setDefaultWidth();
      }
    });
    observer.observe(container);
  }
});
</script>

<style scoped>
.split-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.left-panel {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.divider {
  width: 4px;
  background: #e5e7eb;
  cursor: col-resize;
  border-radius: 2px;
  transition: background 0.2s;
  flex-shrink: 0;
}

.divider:hover {
  background: #3b82f6;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
</style>
