import axiosInstance from "./axiosInstance";
import id from "element-ui/src/locale/lang/id";

export function login(userName,password){
  return axiosInstance.post('login',{
    userName:userName,
    password:password
  })
}

export function create(user){
  return axiosInstance.post('user/create',user)
}

export function del(id){
  return axiosInstance.post('user/delete',{id:id})
}

export function update(user){
  return axiosInstance.post('user/update',user)
}

export function query(user){
  return axiosInstance.post('user/query',user)
}

export function detail(user){
  return axiosInstance.post('user/detail',{id:id})
}