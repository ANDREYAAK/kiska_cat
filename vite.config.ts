import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // Используем переменную, если она есть, иначе корень (для локалки)
  base: process.env.BASE_URL || '/',
  resolve: {
    alias: {
      "@core": fileURLToPath(new URL("./src/core", import.meta.url)),
      "@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
      "@world": fileURLToPath(new URL("./src/world", import.meta.url)),
      "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
      "@ui": fileURLToPath(new URL("./src/ui", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url))
    }
  },
  server: {
    host: true,
    port: 5173
  }
});
