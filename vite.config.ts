// import path from 'path';
// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [react()],

//   server: {
//     port: 3010,
//     host: '0.0.0.0', // Enables LAN access
//     hmr: {
//       host: '192.168.31.141', // Your local network IP
//       protocol: 'ws',        // WebSocket for HMR
//     },
//     proxy: {
//       '/api': {
//         target: 'http://192.168.31.141:3000', // ✅ correct now
//         changeOrigin: true,
//         // rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },

//   },

//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'), // Use @ as src alias
//     },
//   },

//   optimizeDeps: {
//     exclude: ['lucide-react'], // Avoid pre-bundling this if needed
//   },
// });

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    host: "0.0.0.0", // Enables LAN access
    hmr: {
      host: "192.168.10.102", // Your local network IP
      protocol: "ws", // WebSocket for HMR
    },
    proxy: {
      "/api": {
        target: "http://192.168.10.102:3000", // ✅ correct now
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Use @ as src alias
    },
  },

  optimizeDeps: {
    exclude: ["lucide-react"], // Avoid pre-bundling this if needed
  },
});
