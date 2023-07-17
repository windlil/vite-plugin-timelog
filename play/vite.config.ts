import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePluginTimeLog } from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginTimeLog({
      interval: 5,
    })
  ],
})
