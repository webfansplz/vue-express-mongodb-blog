import fetch from '../utils/fetch';
export default {
  state: {},
  mutations: {},
  actions: {
    async ['user/login'](context, payload) {
      let res = await fetch('post', 'admin/login', payload);
      return res.data;
    }
  },
  getters: {}
};
