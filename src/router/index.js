import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import BasicLayout from '../layouts/BasicLayout.vue';
import EmptyLayout from '../layouts/EmptyLayout.vue';

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
      {
        path: '/sys',
        component: EmptyLayout,
        meta: {
          title: '系统管理',
          icon: 'el-icon-setting',
        },
        children: [
          {
            path: '/sys/user',
            name: 'User',
            component: () => import('../views/sys/User.vue'),
            meta: {
              title: '用户管理',
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

export default router;
