import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({
  // 动画方式
  easing: 'ease',
  // 递增进度条的速度
  speed: 500,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3
})

export function setupRouterGuard(router) {
  createProgressGuard(router)
}

export function createProgressGuard(router) {
  router.beforeEach(async (to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    nProgress.start()
    next()
  })

  router.afterEach(async () => {
    nProgress.done()
    return true
  })
}
