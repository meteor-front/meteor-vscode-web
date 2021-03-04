/**
 * http请求封装
 */
import axios from 'axios'
const http = axios.create({
  baseURL: 'http://mock.cs2025.cn/mock/5f2a751a96a9de00182aea59/warehouse',
  timeout: 5000,
  withCredentials: false
})
// 请求预处理
http.interceptors.request.use((config) => {
  return config
})
// 响应预处理
http.interceptors.response.use((response) => {
  return response
})
export default {
  axios,
  http
}