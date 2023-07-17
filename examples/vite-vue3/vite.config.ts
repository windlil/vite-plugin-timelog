import { defineConfig } from 'vite'
import { VitePluginTimeLog } from '../../src'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    VitePluginTimeLog({
      interval: 5,
      spaced: true,
    })
  ]
})