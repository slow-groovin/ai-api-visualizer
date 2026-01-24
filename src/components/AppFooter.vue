<template>
  <footer 
    v-if="shouldShowFooter"
    class="bg-background-secondary border-border px-4 py-2 mt-auto"
  >
    <div class="flex justify-between items-center text-sm">
      <!-- Left side: powered by -->
      <div 
        v-if="showPoweredBy"
        class="text-foreground-secondary"
      >
        <span class="font-medium">Powered by {{ siteName }}</span>
      </div>

      <!-- Spacer when only one side is shown -->
      <div v-else></div>

      <!-- Right side: friendly links -->
      <nav 
        v-if="showFriendlyLinks"
        class="flex items-center gap-6"
      >
        <a
          v-for="link in friendlyLinks"
          :key="link.url"
          :href="link.url"
          :title="link.description"
          target="_blank"
          rel="noopener noreferrer"
          class="text-foreground-secondary hover:text-foreground transition-colors duration-200 text-xs font-medium hover:underline"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Check if footer should be shown (has content on either side)
const shouldShowFooter = computed(() => {
  return showPoweredBy.value || showFriendlyLinks.value;
});

// Check if powered by section should be shown
const showPoweredBy = computed(() => {
  return !!import.meta.env.VITE_FOOTER_POWERED_BY_SITE;
});

// Site name for footer
const siteName = computed(() => {
  return import.meta.env.VITE_FOOTER_POWERED_BY_SITE;
});

// Check if friendly links section should be shown
const showFriendlyLinks = computed(() => {
  return friendlyLinks.value.length > 0;
});

// Friendly links configuration
const friendlyLinks = computed(() => {
  const linksEnv = import.meta.env.VITE_FOOTER_FRIENDLY_LINKS;
  
  if (!linksEnv) {
    return [];
  }
  
  try {
    return JSON.parse(linksEnv);
  } catch (error) {
    console.warn('Invalid VITE_FOOTER_FRIENDLY_LINKS format, expected JSON array:', error);
    return [];
  }
});
</script>

<style scoped>
/* 底部栏固定在页面底部的样式 */
footer {
  width: 100%;
  flex-shrink: 0;
}

/* 链接悬停效果 */
nav a {
  position: relative;
}

nav a:hover {
  transform: translateY(-0.5px);
}

/* 暗色模式会通过 Tailwind 的 dark: 前缀自动处理 */
</style>
