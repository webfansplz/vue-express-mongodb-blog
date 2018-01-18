import fetch from '../utils/fetch';
export default {
  state: {},
  mutations: {},
  actions: {
    async ['user/login'](state, payload) {
      let res = await fetch('post', 'admin/login', payload);
      return res.data;
    }
  },
  getters: {}
};
