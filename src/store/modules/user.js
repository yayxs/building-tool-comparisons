import { defineStore } from 'pinia'
import { loginApi } from '@/api/home'
import { getMainKey } from '@/utils'
export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    token: undefined
  }),
  getters: {
    getToken() {
      const tokenKey = getMainKey()
      return this.token || window.localStorage.getItem(tokenKey)
    }
  },
  actions: {
    setToken(info) {
      this.token = info ? info : '' // for null or undefined value
      const tokenKey = getMainKey()
      window.localStorage.setItem(tokenKey, info)
    },
    async login() {
      try {
        const formData = new FormData()
        const { VITE_APP_USER_NAME, VITE_APP_PWD } = import.meta.env
        formData.append('username', VITE_APP_USER_NAME)
        formData.append('password', VITE_APP_PWD)
        const res = await loginApi(formData)
        console.log('登录的结果', res)
        if (res?.code === 200) {
          const token = res?.data
          // save token
          this.setToken(token)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
