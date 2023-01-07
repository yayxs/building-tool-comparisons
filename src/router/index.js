import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: 'Vite Starter'
    }
  }
]

function getHistoryMode() {
  const { VITE_APP_BASE_URL } = import.meta.env
  return createWebHistory(`/${VITE_APP_BASE_URL}`)
}

export const router = createRouter({
  history: getHistoryMode(),
  routes: routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app) {
  app.use(router)
}
