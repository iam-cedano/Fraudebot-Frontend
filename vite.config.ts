import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, '.', '')

  return {
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    assetsInclude: ['**/*.lottie'],
    server: {
      host: true,
      port: 80,
      proxy: {
        '/api': {
          target: environment.VITE_API_PROXY_TARGET || 'http://localhost:9000',
          changeOrigin: true
        }
      },
      watch: {
        usePolling: true
      }
    }
  }
})
