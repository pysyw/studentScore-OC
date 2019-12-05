import request from '@/utils/request'

export function getTeacher(params) {
  return request({
    url: '/api/getTeacher',
    method: 'get',
    params
  })
}
export function deleteTeacher(id) {
  return request({
    url: `/api/teacher/remove?_id=${id}`,
    method: 'delete'
  })
}
export function addTeacher(data) {
  return request({
    url: '/api/addTeacher',
    method: 'post',
    data
  })
}
export function editTeacher(data) {
  return request({
    url: '/api/editTeacher',
    method: 'PUT',
    data
  })
}
