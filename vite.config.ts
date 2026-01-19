import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from '@tailwindcss/vite'
import sqlocal from 'sqlocal/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwind(), sqlocal()],
})
