import { defineConfig } from "vite";
import { VitePluginTimer } from '../src'

export default defineConfig({
  plugins: [
    VitePluginTimer({
      interval: '1s'
    })
  ]
})