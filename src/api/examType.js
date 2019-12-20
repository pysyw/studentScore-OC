import request from '@/utils/request'
export function getExamType(params) {
  return request({
    url: '/api/getExamType',
    method: 'get',
    params
  })
}

