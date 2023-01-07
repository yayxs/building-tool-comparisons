import { createApp } from 'vue'
import { router, setupRouter } from './router'
import { setupRouterGuard } from './router/guard'
import { setupStore } from './store'
import { setupEcharts } from '@/plugins/echarts' // 兼容vue2的写法
import { useElementPlusIcons } from '@/plugins/element-plus'
import { setupMotion } from '@/plugins/motion'
import { setupIcon } from '@/plugins/iconify'

import App from './App.vue'
import './styles/index.scss'
// 消息API的样式需要导入
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/notification.scss'
import 'element-plus/theme-chalk/src/loading.scss'

import 'uno.css'

async function bootstrap() {
  // App 应用
  const app = createApp(App)
  setupStore(app)
  // 注册路由
  setupRouter(app)
  // 路由守卫
  setupRouterGuard(router)
  // 使用图标
  useElementPlusIcons(app)
  // 使用图表
  setupEcharts(app)
  // 使用动画
  setupMotion(app)
  // 使用图标
  setupIcon(app)
  app.mount('#app')
}

bootstrap()
