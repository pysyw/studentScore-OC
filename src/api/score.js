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
