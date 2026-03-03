import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: '/', // Đảm bảo đường dẫn asset đúng khi deploy
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://server-6kk9.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Tùy chọn: Gom font vào một thư mục riêng cho gọn trong dist
    assetsInlineLimit: 4096, // File nhỏ hơn 4kb sẽ được convert sang base64
  }
})