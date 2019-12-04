import request from '@/utils/request'

export function getTeacher(params) {
  return request({
    url: '/api/getTeacher',
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
