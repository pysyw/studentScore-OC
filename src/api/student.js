import request from '@/utils/request'
export function addStudent(data) {
  return request({
    url: '/api/addStudent',
    method: 'post',
    data
  })
}
export function getStudent(params) {
  return request({
    url: '/api/getStudent',
    method: 'get',
    params
  })
}
export function deleteStudent(id) {
  return request({
    url: `/api/student/remove?_id=${id}`,
    method: 'delete'
  })
}
export function editStudent(data) {
  return request({
    url: '/api/student/edit',
    method: 'put',
    data
  })
}
