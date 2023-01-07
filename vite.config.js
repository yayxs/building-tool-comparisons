import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { createVitePlugins } from './build/vite'
import dayjs from './src/utils/dateUtil'
import pkg from './package.json'
const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(env)
  const { VITE_APP_BASE_URL, VITE_APP_BASE_API } = env
  return {
    root: process.cwd(),
    base: `/${VITE_APP_BASE_URL}/`,
    resolve: {
      alias: {
        '@': resolve(__dirname, '.', 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/element/index.scss" as *;`
        }
      }
    },
    plugins: createVitePlugins(),
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: VITE_APP_BASE_API,
          changeOrigin: true
        }
      }
    },
    optimizeDeps: {
      include: ['@vueuse/core', 'dayjs']
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 4000,
      outDir: VITE_APP_BASE_URL,
      assetsDir: 'assets'
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  }
})
