import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslintConfig from "vite-plugin-eslint";
import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintConfig({
      cache: false,
      include: ["./src//*.js", "./src//*.jsx"],
      exclude: [],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL(".", import.meta.url)),
    },
    extensions: [".js", ".jsx"],
  },
});
