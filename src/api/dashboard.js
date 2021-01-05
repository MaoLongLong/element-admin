import request from '../utils/request';

export function getStatus() {
  return request({
    url: '/dashboard',
    method: 'GET',
  });
}
