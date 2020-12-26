import axios from 'axios';
import { Message } from 'element-ui';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

instance.interceptors.response.use((response) => {
  const { data } = response;
  if (data.code === 200) {
    return data;
  }
  Message.error(data.message || 'Error');
  return Promise.reject(new Error(data.message || 'Error'));
}, (error) => {
  console.log(error);
  Message.error(error.message);
  return Promise.reject(error);
});

export default instance;
