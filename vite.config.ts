import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const MEDUSA_URL =
  process.env.VITE_MEDUSA_BACKEND_URL ||
  "https://apple-things-server.onrender.com";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    proxy: {
      "/store": {
        target: MEDUSA_URL,
        changeOrigin: true,
      },
    },
  },
});
