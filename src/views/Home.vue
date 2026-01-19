<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-800">Context Protector</h1>
      <div v-if="appStore.isDebugMode" class="mt-8">
        <router-link to="/debug" class="text-blue-600 hover:text-blue-800 underline">
          Go to Debug Page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/app'
const appStore = useAppStore()
</script>