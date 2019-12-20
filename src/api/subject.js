import request from '@/utils/request'
export function getSubject(params) {
  return request({
    url: '/api/getSubject',
    method: 'get',
    params
  })
}

