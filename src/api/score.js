import request from '@/utils/request'
/** 获取学生成绩列表 */
export function getStudentScore(params) {
  return request({
    url: '/api/getScore',
    method: 'get',
    params
  })
}
/** 获取考试科目类别 */
export function getExamType() {
  return request({
    url: '/api/getEamType',
    method: 'get'
  })
}

/** 根据Id删除对应成绩 **/
export function removeScore(id) {
  return request({
    url: `/api/removeScore?id=${id}`,
    method: 'delete'
  })
}

/** 修改学生成绩*/
export function editExamType(data) {
  return request({
    url: '/api/editScore',
    method: 'PUT',
    data
  })
}
