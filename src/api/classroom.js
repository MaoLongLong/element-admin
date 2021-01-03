import request from '../utils/request';

export function getList(params = {}) {
  return request({
    url: '/classroom',
    method: 'GET',
    params,
  });
}

export function add(data) {
  return request({
    url: '/classroom',
    method: 'POST',
    data,
  });
}

export function remove({ id }) {
  return request({
    url: '/classroom',
    method: 'DELETE',
    params: {
      id,
    },
  });
}

export function update(data) {
  return request({
    url: '/classroom',
    method: 'PUT',
    data,
  });
}
