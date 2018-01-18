import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import * as utils from 'utils/utils';

Vue.prototype.utils = utils;
Vue.use(iView);
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
