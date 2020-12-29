import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import './lib/font/font.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './permission';

Vue.use(ElementUI);

Vue.config.productionTip = false;

// noinspection JSUnusedGlobalSymbols
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
