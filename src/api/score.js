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
export function editScore(data) {
  return request({
    url: '/api/editScore',
    method: 'PUT',
    data
  })
}

/** 新增学生成绩*/
export function addScore(data) {
  return request({
    url: '/api/addStudentScore',
    method: 'POST',
    data
  })
}
/** 根据班级id查找学生 **/
export function findStudentByCid(cid) {
  return request({
    url: `/api/getStudentByClassId?cid=${cid}`,
    method: 'get'
  })
}
