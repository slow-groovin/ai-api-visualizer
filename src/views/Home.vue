<template>
  <div class="min-h-screen bg-background text-foreground font-sans flex flex-col">
    <AppHeader />
    <main class="flex-1 p-2 min-h-0">
      <SplitContainer storageKey="home-split-width">
        <template #left>
          <InputPanel v-model="llmStore.inputText" :placeholder="t.pasteCodePlaceholder" />
        </template>
        <template #right>
          <OutputPanel />
        </template>
      </SplitContainer>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppFooter from "../components/AppFooter.vue";
import AppHeader from "../components/AppHeader.vue";
import InputPanel from "../components/InputPanel.vue";
import OutputPanel from "../components/OutputPanel.vue";
import SplitContainer from "../components/SplitContainer.vue";
import { useI18n } from "../composables/useI18n";
import { useLLMStore } from "../stores/llm";
import { useSampleLoader } from "../composables/useSampleLoader";

const { t } = useI18n();
const llmStore = useLLMStore();
const { initSampleFromUrl } = useSampleLoader();

onMounted(initSampleFromUrl);
</script>

<style scoped>
:deep(.highlighted-text) {
  background-color: #e0e7ff;
  padding: 2px 4px;
  border-radius: 4px;
  display: inline-block;
}
:deep(.dark .highlighted-text) {
  background-color: #3730a3;
  color: #e0e7ff;
}
</style>
