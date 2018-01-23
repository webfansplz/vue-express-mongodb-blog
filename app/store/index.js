import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import user from './user.module.js';
import article from './article.module.js';
const store = {
  modules: {
    user,
    article
  }
};
export default new Vuex.Store(store);
