// import Vue from 'vue';
import axios from 'axios'
const service = axios.create({
  timeout: 1000 * 60 * 5
})

service.interceptors.request.use(
  (config) => {
    const { MODE } = import.meta.env
    const tokenKey = `${MODE}_app_token`
    const token = window.localStorage.getItem(tokenKey) || ''
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    console.log('响应拦截成功回调', response)
    // 判断是否是下载
    const reqUrl = response?.config?.url || ''

    if (reqUrl.indexOf('boardDownLoad') !== -1) {
      // 是下载，把整个请求的响应数据抛出
      return Promise.resolve(response)
    } else {
      const { data } = response
      if (data?.code === 1500) {
      } else {
        return Promise.resolve(data)
      }
    }
  },
  (error) => {
    console.log('响应拦截失败回调', error)
    return Promise.reject(error)
  }
)

export default service
