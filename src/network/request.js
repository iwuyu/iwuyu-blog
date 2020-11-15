import axios from 'axios'

let baseurls = 'http://localhost:5000';

axios.defaults.withCredentials=true //跨域
// 1.创建axios实例
const instance = axios.create({
  baseURL: baseurls, // 后台地址http://172.17.143.169:3000
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' 
  },
})
export { instance } 



