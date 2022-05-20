
import axios from "axios"

// 配置请求的基准地址
// 设置请求头

//创建请求实例
const instance = axios.create({
  baseURL : 'http://api.w0824.com/',
  timeout : 10000,
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // console.log('请求拦截器')
  // 设置超时时间

  // 开启loading

  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log('请求错误')
  
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // console.log('响应拦截器')
  // 对响应数据做点什么
  return response.data // 直接返回响应的data数据
}, function (error) {

  // 对响应错误做点什么
  console.log('响应错误')

  return Promise.reject(error);
});

export default instance
// 导出实例