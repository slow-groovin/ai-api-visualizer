<template>
  <footer class="bg-background-secondary border-border px-4 py-2 mt-auto">
    <div class="flex justify-between items-center text-sm">
      <!-- Left side: powered by -->
      <div class="text-foreground-secondary">
        <span class="font-medium">Powered by {{ siteName }}</span>
      </div>

      <!-- Right side: friendly links -->
      <nav class="flex items-center gap-6">
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

const siteName = import.meta.env.VITE_SITE_NAME || "Context Protector";

/**
 * 友情链接配置
 * 可以根据需要扩展更多链接
 */
const friendlyLinks = computed(() => [
  {
    label: "api2o.com",
    url: "https://api2o.com",
    description: "api2o",
  },
]);
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
