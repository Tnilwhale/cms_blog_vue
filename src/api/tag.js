import axiosInstance from "./axiosInstance";

export function create(tag) {
  return axiosInstance.post('tag/create',tag)
}

export function del(id) {
  return axiosInstance.post('tag/delete?id='+id)
}

export function update(tag) {
  return axiosInstance.post('tag/update',tag)
}

export function query(tag) {
  return axiosInstance.post('tag/query',tag)
}

export function all(tag) {
  return axiosInstance.post('tag/all')
}

export function detail(id) {
  return axiosInstance.post('tag/detail', {id:id})
}