import fetch from '../utils/fetch';
export default {
  state: {
    tagList: []
  },
  mutations: {
    ['artilce/setTags'](state, payload) {
      state.tagList = payload;
    }
  },
  actions: {
    //获取标签列表
    async ['article/getTags']({ commit }) {
      let res = await fetch('get', 'tags');
      console.log(res.data.data);
      let tagList = res.data.data.length > 0 ? res.data.data : [];
      commit('artilce/setTags', tagList);
    },
    //删除标签
    async ['article/delTags'](context, payload) {
      let res = await fetch('delete', 'tags', payload);
      return res;
    }
  },
  getters: {}
};
