/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-12-16 16:26:12
 * @LastEditTime: 2020-01-08 11:27:56
 * @Description: axios request封装
 */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { Notification } from 'element-ui'
import { ACCESS_TOKEN } from '@/config/variableInit'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

// console.log(process.env.NODE_ENV)

// error handle
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      Notification.error({
        title: 'Forbidden',
        message: data.message
      })
    }
    if (error.response.status === 401) {
      Notification.error({
        title: 'Unauthorized',
        message: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers[ACCESS_TOKEN] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const AxiosPlugin = {}
AxiosPlugin.install = (Vue) => {
  Vue.prototype.$http = service
}

export {
  service,
  AxiosPlugin
}
