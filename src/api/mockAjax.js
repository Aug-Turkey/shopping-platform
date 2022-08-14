// 对 axios 进行二次封装
import axios from 'axios'
// 进度条
import nprogress from 'nprogress'
// 进度条样式
import 'nprogress/nprogress.css'

const requests = axios.create({
  // 根路径
  baseURL: '/mock',
  // 请求超时时间
  timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 进度条结束
  nprogress.done()
  return res.data
}), (error) => {
  // 响应失败
  return Promise.reject(new Error(error.message))
}

export default requests