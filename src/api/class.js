import request from '@/utils/request'
export function getClass(params) {
  return request({
    url: '/api/getClass',
    method: 'get',
    params
  })
}

