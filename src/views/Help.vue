<template>
  <!-- //TODO Change to hyperlink method for better SEO -->
  <div class="p-6">
    <router-link to="/" class="text-foreground underline">← Back</router-link>
  </div>

  <div class="text-center mb-8 text-foreground">
    <h1 class="text-2xl mb-2">Help & Tutorial</h1>
    <p class="text-base text-gray-600 dark:text-gray-400">
      setting rules, replace sensitive information in your context before
      sending it to LLM
    </p>
  </div>
  <div class="flex justify-center items-center min-h-screen">
    <div
      class="aspect-video min-h-[60vh] bg-gray-100 dark:bg-gray-800 flex flex-col rounded-lg overflow-hidden shadow-2xl m-16"
    >
      <!-- Browser Header -->
      <div
        class="h-10 bg-linear-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center px-2.5 border-b border-gray-600 dark:border-gray-500"
      >
        <div class="flex gap-2">
          <div
            class="w-3 h-3 rounded-full border border-gray-500 bg-red-500"
          ></div>
          <div
            class="w-3 h-3 rounded-full border border-gray-500 bg-yellow-400"
          ></div>
          <div
            class="w-3 h-3 rounded-full border border-gray-500 bg-green-500"
          ></div>
        </div>
        <!-- <div class="address-bar">
          <span class="address-text">https://opencode.ai/help</span>
        </div> -->
        <div class="w-15"></div>
      </div>

      <!-- Browser Content -->
      <div class="flex-1 bg-black relative">
        <video
          :src="videoSrc"
          autoplay
          playsinline
          loop
          muted
          preload="auto"
          :poster="posterSrc"
          class="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const videoSrc = "https://www.w3schools.com/html/mov_bbb.webm";
const posterSrc =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4";
</script>
