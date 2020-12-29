import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '../store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const cfg = { ...config };
  if (store.getters.token) {
    cfg.headers.Authorization = `Bearer ${store.getters.token}`;
  }
  return cfg;
},
(error) => {
  console.log(error);
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  const { data } = response;
  if (data.code === 200) {
    return data;
  }
  if (data.code === 401) {
    MessageBox.confirm('您的token已过期，可以取消停留在此页面上，或者重新登录', '确认注销', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      store.dispatch('user/resetToken').then(() => {
        document.location.reload();
      });
    });
  }
  return Promise.reject(new Error(data.message || 'Error'));
}, (error) => {
  console.log(error);
  Message.error(error.message);
  return Promise.reject(error);
});

export default instance;
