import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as utils from 'utils/utils';
import 'animate.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import moment from 'moment';

//全局过滤器
//格式化日期
Vue.filter('formatDate', v => moment(v).format('YYYY-MM-DD HH:mm:ss'));

Vue.use(mavonEditor);
Vue.prototype.utils = utils;
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
