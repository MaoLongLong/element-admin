import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import { getToken } from './utils/auth';
import store from './store';
import router from './router';

const whiteList = ['/login'];

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (to.meta.title) {
    document.title = `${to.meta.title} | cms`;
  } else {
    document.title = 'cms';
  }
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      next('/');
      Message.info('已登录');
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          await store.dispatch('user/getInfo');
          next();
        } catch (error) {
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next(`/login?redirect=${to.path}`);
    Message.warning('请登录');
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
