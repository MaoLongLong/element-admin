import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import Dashboard from '../views/Dashboard.vue';
import BasicLayout from '../layouts/BasicLayout.vue';
import EmptyLayout from '../layouts/EmptyLayout.vue';
import { getToken } from '../utils/auth';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: '仪表盘',
          icon: 'el-icon-s-marketing',
        },
      },
      {
        path: '/cms',
        component: EmptyLayout,
        meta: {
          title: '教室管理',
          icon: 'el-icon-s-home',
        },
        children: [
          {
            path: '/cms/building',
            name: 'Building',
            component: () => import('../views/cms/Building.vue'),
            meta: {
              title: '教学楼管理',
            },
          },
          {
            path: '/cms/classroom',
            name: 'Classroom',
            component: () => import('../views/cms/Classroom.vue'),
            meta: {
              title: '教室管理',
            },
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

const whiteList = ['/login'];

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

export default router;
