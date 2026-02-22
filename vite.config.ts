import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwind from "@tailwindcss/vite";
import sqlocal from "sqlocal/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vite.dev/config/
export default defineConfig(() => {
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';
  const base = isGitHubPages ? '/ai-api-visualizer/' : '/';
  
  return {
    base,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      headers: {
        // "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "credentialless", // 更宽松
      },
    },
    plugins: [
      vue(),
      tailwind(),
      sqlocal(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "AI API Visualizer",
          short_name: "AI API Visualizer",
          description:
            "Visualize Request/Response body of ChatGPT(Chat Completion)/Claude/Gemini API.",
          theme_color: "#ffffff",
          // id: "/",  // 固定应用 ID
          start_url: base,
          display: "fullscreen", // 👈 关键
          icons: [
            {
              src: `${base}icon-192.png`, // 至少 192x192
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable", // 关键！
            },
            {
              src: `${base}icon-512.png`, // 推荐 512x512
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ],
  };
});
