<template>
  <div class="flex flex-col h-full">
    <!-- Input Container -->
    <div
      class="flex-1 bg-background rounded-xl shadow-sm border border-border overflow-hidden relative group hover:border-blue-300 transition-colors">
      <textarea 
        :value="modelValue" 
        @input="onInput"
        @paste="onPaste"
        class="w-full h-full p-4 bg-transparent border-none resize-none focus:ring-0 text-sm font-mono leading-relaxed text-foreground placeholder-foreground-secondary"
        :placeholder="placeholder"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * InputPanel Component
 * Handles user text input and paste events.
 */

defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'paste'): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

const onPaste = () => {
  // Emit paste event to trigger processing in parent
  setTimeout(() => {
    emit('paste');
  }, 50);
};
</script>

<style scoped>
textarea::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 99px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>
