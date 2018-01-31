import fetch from '../utils/fetch';
export default {
  state: {
    //标签列表
    tagList: [],
    //分类列表
    cateGoryList: [],
    //文章列表
    articleList: [],
    //是否显示文章详情
    detailState: false,
    //文章详情
    articleDetails: {}
  },
  mutations: {
    //设置标签列表
    ['artilce/setTags'](state, payload) {
      state.tagList = payload;
    },
    //设置分类列表
    ['artilce/setCategory'](state, payload) {
      state.cateGoryList = payload;
    },
    //设置文章列表
    ['article/setArticles'](state, payload) {
      state.articleList = payload;
    },
    //设置是否显示文章详情
    ['article/setDetailState'](state, payload) {
      state.detailState = payload;
    },
    //显示文章详情
    ['article/setArticleDetails'](state, payload) {
      state.detailState = true;
      state.articleDetails = payload;
      console.log(state.articleDetails);
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
    },
    //图片上传
    async ['article/upload'](context, payload) {
      let res = await fetch('post', 'admin/upload', payload);
      return res;
    },
    //新增文章
    async ['article/newArticle'](context, payload) {
      let res = await fetch('put', 'article/newArticle', payload);
      return res;
    },
    //获取文章
    async ['article/getArticles']({ commit }, payload) {
      let res = await fetch('get', 'article/getArticles', payload);
      console.log(res.data.data);
      commit('article/setArticles', res.data.data);
    },
    //删除文章
    async ['article/removeArticle'](context, payload) {
      let res = await fetch('delete', `article/removeArticle/${payload}`);
      return res;
    }
  },
  getters: {}
};
