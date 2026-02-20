<script setup lang="ts" generic="T extends string">
interface Option {
  value: T;
  label: string;
  icon?: string;
}

interface Props {
  modelValue: T;
  options: Option[];
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: T];
}>();

const handleSelect = (value: T) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="radio-button-group">
    <button
      v-for="opt in options"
      :key="opt.value"
      class="radio-btn"
      :class="{ active: modelValue === opt.value }"
      @click="handleSelect(opt.value)"
    >
      <img v-if="opt.icon" :src="opt.icon" class="option-icon" :alt="opt.label" />
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped>
.radio-button-group {
  display: inline-flex;
  gap: 2px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 2px;
}

.radio-btn {
  padding: 4px 10px;
  font-size: var(--llm-font-base);
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.option-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.radio-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
}

.radio-btn.active {
  background: white;
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-weight: 500;
}
</style>
