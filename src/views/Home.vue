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
        @paste="handlePaste" 
      />

      <!-- Output Column -->
      <OutputPanel 
        :content="outputText" 
        :placeholder="t.waitingForInput" 
      />
    </main>

    <!-- Footer Component -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useI18n } from "../composables/useI18n";
import AppHeader from "../components/AppHeader.vue";
import InputPanel from "../components/InputPanel.vue";
import OutputPanel from "../components/OutputPanel.vue";
import AppFooter from "../components/AppFooter.vue";

// --- State ---
const { t } = useI18n();
const inputText = ref("");
const outputText = ref("");

// Persistence settings
const autoCopy = useLocalStorage("template-auto-copy", false);

// --- Logic ---

/**
 * Main processing function
 */
const processText = async () => {
  if (!inputText.value.trim()) return;

  // Business Logic: Transform input to output
  // Currently just a placeholder implementation
  outputText.value = `<span class="highlighted-text">${inputText.value}</span>`;

  if (autoCopy.value) {
    await copyToClipboard();
  }
};

const copyToClipboard = async () => {
  if (!inputText.value) return;
  try {
    await navigator.clipboard.writeText(inputText.value);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};

const handlePaste = () => {
  // Delay processing slightly to ensure model value is updated
  setTimeout(() => {
    processText();
  }, 100);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "Enter") {
    event.preventDefault();
    processText();
  }
};

// --- Lifecycle Hooks ---
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
