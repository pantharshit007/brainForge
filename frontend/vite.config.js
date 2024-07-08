import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = env.VITE_BASE_URL

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/v1': API_URL,
      },
    },
    define: {
      global: "globalThis",
    }
  }
})
