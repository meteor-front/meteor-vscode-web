import axios from 'axios'
import utils from '@/util/utils'
const request = axios.create({
  baseURL: utils.constant.baseUrl,
  withCredentials: false
})
request.prototype.token = ''
request.interceptors.request.use(
  config => {
    config.headers.token = request.token
    return config
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

export default request
