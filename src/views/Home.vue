<template>
  <div class="min-h-screen bg-background text-foreground font-sans flex flex-col">
    <!-- 1. Restore/Expand Strip (Visible only when header is collapsed) -->
    <div v-if="!isHeaderExpanded" @click="isHeaderExpanded = true"
      class="w-full h-6 flex items-center justify-center bg-background-secondary border-b border-border cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors group z-50 flex-none"
      title="Show Header">
      <svg class="w-4 h-4 text-foreground-secondary group-hover:text-blue-500 transition-colors" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- 2. Top App Bar (Visible when expanded) -->
    <header v-show="isHeaderExpanded"
      class="z-50 bg-background-secondary border-b border-border px-4 py-3 shadow-sm flex-none">
      <div class="w-full flex  items-start gap-4">
        <!-- Brand & Info -->
        <div class="flex items-center gap-4 pt-1">
          <div class="flex flex-col">
            <div class="relative">
              <h1 class="text-xl font-bold tracking-tight text-foreground leading-none">
                AI API Visualizer
              </h1>
            </div>
            <span class="text-xs font-medium text-foreground-secondary mt-1">
              Visualize Request/Response of ChatGPT(Chat Completion)/Claude/Gemini API Online.
            </span>
          </div>
        </div>


        <!-- Actions -->
        <div class="flex items-center gap-2  mt-3 ">
          <HoverInfo class="p-1.5 rounded border bg-orange-100 border-orange-200 opacity-80" :tooltip="t.offlineTooltip"
            placement="bottom">
            <img src="/offline.png" :alt="t.offlineFunction" class="size-4" />
          </HoverInfo>
          <a href="https://github.com/slow-groovin/ai-api-visualizer" target="_blank"
            class="size-7 p-1 bg-button-bg hover:bg-button-bg text-foreground-secondary hover:text-foreground rounded-md flex items-center justify-center text-sm font-bold transition-colors"
            title="View on GitHub">
            <svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          <!-- Language Switch -->
          <LanguageSwitcher
            class="size-7 p-1 bg-button-bg hover:bg-button-bg text-foreground-secondary hover:text-foreground rounded-md" />

          <!-- Dark Mode Toggle -->
          <DarkModeToggle />

          <router-link to="/help"
            class="size-7 bg-button-bg hover:bg-button-bg text-foreground-secondary hover:text-foreground rounded-md flex items-center justify-center text-sm font-bold transition-colors"
            title="Help">
            ?
          </router-link>

          <!-- 3. New Collapse Button -->
          <button @click="isHeaderExpanded = false"
            class="size-7 bg-button-bg hover:bg-button-bg text-foreground-secondary hover:text-foreground rounded-md flex items-center justify-center transition-colors"
            title="Collapse Header (Focus Mode)">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>


      </div>

    </header>

    <!-- Main Workspace -->
    <main class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 min-h-0">
      <!-- ... Rest of your main content remains unchanged ... -->
      <!-- ================= INPUT COLUMN ================= -->
      <div class="flex flex-col h-full">
       

        <!-- Left: Pasted Area  -->
        <div
          class="flex-1 bg-background rounded-xl shadow-sm border border-border overflow-hidden relative group hover:border-blue-300 transition-colors">
          <textarea v-model="inputText" ref="inputTextarea"
            class="w-full h-full p-4 bg-transparent border-none resize-none focus:ring-0 text-sm font-mono leading-relaxed text-foreground placeholder-foreground-secondary"
            :placeholder="t.pasteCodePlaceholder" @paste="handlePaste"></textarea>
        </div>
      </div>

      <!-- Right: Visualization  -->
      <div class="flex flex-col relative">
        <!-- Output Show (Card) -->
        <div
          class="flex-1 bg-background rounded-xl shadow-sm border border-border overflow-hidden relative hover:border-green-300 transition-colors">
          <div ref="outputContainer"
            class="w-full h-full p-4 overflow-auto font-mono text-sm whitespace-pre-wrap leading-relaxed selection:bg-green-100 selection:text-green-900 pb-20"
            :class="{
              'text-foreground-secondary italic flex items-center justify-center':
                !outputText,
            }">
            <template v-if="outputText">
              <div v-html="outputText"></div>
            </template>
            <template v-else>
              <span>{{ t.waitingForInput }}</span>
            </template>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useI18n } from "../composables/useI18n";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import DarkModeToggle from "../components/DarkModeToggle.vue";
import AppFooter from "../components/AppFooter.vue";
import HoverInfo from "../components/HoverInfo.vue";

// --- State & Constants ---
const { t } = useI18n();

// UI References
const inputText = ref("");
const outputText = ref("");
const outputContainer = ref<HTMLDivElement>();
// 使用 useLocalStorage 持久化自动复制状态到本地存储
const autoCopy = useLocalStorage("template-auto-copy", false);
// 使用 useLocalStorage 持久化头部展开/折叠状态到本地存储
const isHeaderExpanded = useLocalStorage("template-header-expanded", true);

// Logic State
const replaceCount = ref(0);
const currentSearchIndex = ref(-1);

// Template function - process input text
const processText = async () => {
  if (!inputText.value.trim()) return;

  // Template logic: echo input for now
  outputText.value = `<span style="background-color: #e0e7ff; padding: 2px;">${inputText.value}</span>`;
  replaceCount.value = 1;

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

const clearInput = () => {
  inputText.value = "";
  outputText.value = "";
  replaceCount.value = 0;
};

const handlePaste = (_?: ClipboardEvent) => {
  setTimeout(() => {
    processText();
  }, 150);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "Enter") {
    event.preventDefault();
    processText();
  }
};

onMounted(async () => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
textarea::-webkit-scrollbar,
div::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

textarea::-webkit-scrollbar-track,
div::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb,
div::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 99px;
}

textarea::-webkit-scrollbar-thumb:hover,
div::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

:deep(span[style*="background-color"]) {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
}
</style>