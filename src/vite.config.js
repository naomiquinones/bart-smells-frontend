import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from 'dns';

// // localhost part
// dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [react()],
  esbuild: {
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx'
    },
    include: /src\/.*\.[jt]sx?$/, // Apply to .js, .jsx, .ts, and .tsx files in the src directory
    exclude: [],
  },
});
