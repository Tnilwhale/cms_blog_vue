import axiosInstance from "./axiosInstance";

export function login(userName,password){
  return axiosInstance.post('login',{
    userName:userName,
    password:password
  })
}