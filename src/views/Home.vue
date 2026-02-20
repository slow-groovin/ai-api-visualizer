<template>
  <div class="min-h-screen bg-background text-foreground font-sans flex flex-col">
    <!-- Header Component -->
    <AppHeader />

    <!-- Main Workspace -->
    <main class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 min-h-0">
      <!-- Input Column -->
      <InputPanel
        v-model="llmStore.inputText"
        :placeholder="t.pasteCodePlaceholder"
      />

      <!-- Output Column -->
      <OutputPanel />
    </main>

    <!-- Footer Component -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * Home View
 * Main page with input/output panels for LLM API data visualization.
 */
import AppFooter from "../components/AppFooter.vue";
import AppHeader from "../components/AppHeader.vue";
import InputPanel from "../components/InputPanel.vue";
import OutputPanel from "../components/OutputPanel.vue";
import { useI18n } from "../composables/useI18n";
import { useLLMStore } from "../stores/llm";

// --- State ---
const { t } = useI18n();
const llmStore = useLLMStore();

</script>


<style scoped>
:deep(.highlighted-text) {
  background-color: #e0e7ff;
  padding: 2px 4px;
  border-radius: 4px;
  display: inline-block;
}

/* Dark mode adjustments for highlighted text if needed */
:deep(.dark .highlighted-text) {
  background-color: #3730a3;
  color: #e0e7ff;
}
</style>
