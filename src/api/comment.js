import axiosInstance from "./axiosInstance";

export function create(comment) {
  return axiosInstance.post('comment/create',comment)
}

export function del(id) {
  return axiosInstance.post('comment/delete?id='+id)
}

export function query(comment) {
  return axiosInstance.post('comment/query',comment)
}

export function detail(id) {
  return axiosInstance.post('comment/detail?id='+id)
}