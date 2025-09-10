import { defineConfig } from "vite";
import netlify from "@netlify/vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), netlify()],
});
