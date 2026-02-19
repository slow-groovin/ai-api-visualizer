<template>
  <div class="flex flex-col relative h-full">
    <!-- Output Show (Card) -->
    <div
      class="flex-1 bg-background rounded-xl shadow-sm border border-border overflow-hidden relative hover:border-green-300 transition-colors">
      <div 
        class="w-full h-full p-4 overflow-auto font-mono text-sm whitespace-pre-wrap leading-relaxed selection:bg-green-100 selection:text-green-900 pb-20"
        :class="{
          'text-foreground-secondary italic flex items-center justify-center': !content,
        }">
        <template v-if="content">
          <div v-html="content"></div>
        </template>
        <template v-else>
          <span>{{ placeholder || 'Waiting for input...' }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * OutputPanel Component
 * Renders the HTML output or a placeholder message.
 */

defineProps<{
  content: string;
  placeholder?: string;
}>();
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

/* Ensure deep styles for v-html content are handled if necessary in parent or globally */
</style>
