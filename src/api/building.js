import request from '../utils/request';

export function getList(params = {}) {
  return request({
    url: '/building',
    method: 'GET',
    params,
  });
}

export function getAll() {
  return request({
    url: '/building',
    method: 'GET',
    params: {
      all: true,
    },
  });
}

export function getDetails({ id }) {
  return request({
    url: '/building/detail',
    method: 'GET',
    params: {
      id,
    },
  });
}

export function add(data) {
  return request({
    url: '/building',
    method: 'POST',
    data,
  });
}

export function remove({ id }) {
  return request({
    url: '/building',
    method: 'DELETE',
    data: {
      id,
    },
  });
}

export function update(data) {
  return request({
    url: '/building',
    method: 'PUT',
    data,
  });
}
