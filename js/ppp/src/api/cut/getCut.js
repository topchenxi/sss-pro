import request from '@/utils/request'

export default function (id) {
  return request(`/redwood/cut/${id}`, {
    method: 'GET'
  })
}
