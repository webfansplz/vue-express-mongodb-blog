import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as utils from 'utils/utils';
import 'animate.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);
Vue.prototype.utils = utils;
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
