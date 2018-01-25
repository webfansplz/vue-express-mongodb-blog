import fetch from '../utils/fetch';
export default {
  state: {
    //标签列表
    tagList: [],
    //分类列表
    cateGoryList: []
  },
  mutations: {
    //设置标签列表
    ['artilce/setTags'](state, payload) {
      state.tagList = payload;
    },
    //设置分类列表
    ['artilce/setCategory'](state, payload) {
      state.cateGoryList = payload;
    }
  },
  actions: {
    //获取标签列表
    async ['article/getTags']({ commit }) {
      let res = await fetch('get', 'tags');
      let tagList = res.data.data.length > 0 ? res.data.data : [];
      commit('artilce/setTags', tagList);
    },
    //删除标签
    async ['article/delTags'](context, payload) {
      let res = await fetch('delete', 'tags', payload);
      return res;
    },
    //新增标签
    async ['article/addTags'](context, payload) {
      let res = await fetch('post', 'tags', payload);
      return res;
    },
    //获取分类列表
    async ['article/getCategory']({ commit }) {
      let res = await fetch('get', 'category');
      let cateGoryList = res.data.data.length > 0 ? res.data.data : [];
      commit('artilce/setCategory', cateGoryList);
    },
    //删除分类
    async ['article/delCategory'](context, payload) {
      let res = await fetch('delete', 'category', payload);
      return res;
    },
    //新增分类
    async ['article/addCategory'](context, payload) {
      let res = await fetch('post', 'category', payload);
      return res;
    }
  },
  getters: {}
};
