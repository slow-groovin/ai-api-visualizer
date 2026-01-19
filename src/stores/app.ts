import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isDebugMode: import.meta.env.DEV
  }),
  actions: {
    toggleDebugMode() {
      this.isDebugMode = !this.isDebugMode
    }
  }
})