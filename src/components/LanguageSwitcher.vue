<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "../composables/useI18n"; // Ensure path matches your actual location
import type { Locale } from "../types/i18n";

const { locale, setLocale, availableLocales } = useI18n();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

// Toggle display
const toggle = () => (isOpen.value = !isOpen.value);

// Select language
const handleSelect = (lang: Locale) => {
  setLocale(lang);
  isOpen.value = false;
};

// Click outside to auto-close (simplified version)
const handleClickOutside = (e: MouseEvent) => {
  if (
    isOpen.value &&
    containerRef.value &&
    !containerRef.value.contains(e.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => window.addEventListener("click", handleClickOutside));
onUnmounted(() => window.removeEventListener("click", handleClickOutside));
</script>

<template>
  <div ref="containerRef" class="relative">
    <!-- 1. Trigger button (Size 7 = 1.75rem = 28px) -->
    <button
      type="button"
      @click.stop="toggle"
      class="flex size-full items-center justify-center rounded-md transition-colors"
      title="Switch Language"
    >
      <!-- Icon: Language / Translate (A + 文) -->
      <img src="/lang-switch.png" alt="lang switch" class="size-5" />
    </button>

    <!-- 2. Dropdown menu -->
    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-2 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
    >
      <button
        v-for="option in availableLocales"
        :key="option.code"
        @click="handleSelect(option.code)"
        class="block w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        :class="{ 'font-bold text-blue-600 bg-blue-50': locale === option.code }"
      >
        {{ option.name }}
      </button>
    </div>
  </div>
</template>
