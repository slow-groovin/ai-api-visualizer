<template>
  <div class="min-h-screen bg-background text-foreground font-sans flex flex-col">
    <!-- Header Component -->
    <AppHeader />

    <!-- Main Workspace -->
    <main class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 min-h-0">
      <!-- Input Column -->
      <InputPanel
        v-model="inputText"
        :placeholder="t.pasteCodePlaceholder"
        @update:modelValue="handleInput"
      />

      <div>
        {{ parsedData?.standard }} - {{ parsedData?.dataType }}
      </div>
      <!-- Output Column -->
      <OutputPanel
        :parsed-data="parsedData"
        :placeholder="t.waitingForInput"
      />
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
import { ref, computed } from "vue";
import { useI18n } from "../composables/useI18n";
import AppHeader from "../components/AppHeader.vue";
import InputPanel from "../components/InputPanel.vue";
import OutputPanel from "../components/OutputPanel.vue";
import AppFooter from "../components/AppFooter.vue";
import { parseLLMData } from "../utils/llm/parser";
import type { ApiStandard, DataType } from "../types/llm/flow";

// --- State ---
const { t } = useI18n();
const inputText = ref("");

/**
 * Parsed data interface
 */
interface ParsedData {
  standard: ApiStandard;
  dataType: DataType;
  data: unknown;
}

/**
 * Computed parsed data from input
 */
const parsedData = computed<ParsedData | null>(() => {
  if (!inputText.value.trim()) {
    return null;
  }

  const result = parseLLMData(inputText.value);

  if (!result.success) {
    return null;
  }

  return {
    standard: result.standard,
    dataType: result.dataType,
    data: result.data,
  };
});

// --- Event Handlers ---

/**
 * Handle input change
 */
const handleInput = () => {
  // Computed property will automatically update parsedData
};

// --- Keyboard Shortcuts ---
const handleKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "Enter") {
    event.preventDefault();
    // Trigger any additional processing if needed
  }
};

// --- Lifecycle Hooks ---
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
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
