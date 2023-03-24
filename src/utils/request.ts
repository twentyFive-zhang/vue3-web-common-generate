import axios from 'axios'

const request = axios.create({
  baseURL: '/',
  timeout: 36000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

const errorHandler = () => {}

request.interceptors.request.use((config) => {
  return config
}, errorHandler)

request.interceptors.response.use((response) => {
  return response
}, errorHandler)

export default request
