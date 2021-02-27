import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://localhost:8088/cms_blog/',
  timeout: 1000,
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
  return config;
}, // 在发送请求之前做些什么
    error =>{
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(response =>{
  // 对响应数据做点什么
  return response;
}, error =>{
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axiosInstance