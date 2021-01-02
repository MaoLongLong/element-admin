import request from '../utils/request';

export function getList() {
  return request({
    url: '/user',
    method: 'GET',
  });
}

export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data,
  });
}

export function getInfo() {
  return request({
    url: '/userInfo',
    method: 'GET',
  });
}
