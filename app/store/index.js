import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import user from './user.module.js';
const store = {
  modules: {
    user
  }
};
export default new Vuex.Store(store);
