import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { viteMockServe } from 'vite-plugin-mock'; 

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), viteMockServe({
      localEnabled: mode === 'development', // 仅在开发环境启用 mock
    })],
    base: mode === '/zheng-mingkai.github.io/',
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        assets: resolve(__dirname, "./src/assets"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      proxy: {
        "/v1/api": {
          target: "http://127.0.0.1:8091/",
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  };
});
