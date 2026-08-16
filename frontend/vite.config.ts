import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser", // Use Terser for minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove all console.* statements
        drop_debugger: true, // Remove debugger statements
      },
    },
  },
});
