<template>
  <div id="articlelist">
    <div class="list">
      <ul>
        <li class="title-box">
          <div class="img_box c">
            文章
          </div>
          <div class="contxt">
            <span>分类</span>
            <span>标签</span>
            <span>时间</span>
          </div>
          <div class="btn_box c">操作</div>   
        </li>
        <li v-for="(item,i) in articleList" :key="i">
          <div class="img_box c">
            <img :src="item.coverImg" :alt="item.title">
          </div>
          <div class="contxt c">
            <span>
              <em v-for="(v,k) in item.category" :key="k">{{v.name}}</em>
            </span>
            <span>
              <em v-for="(v,k) in item.tags" :key="k">{{v.name}}</em>
            </span>
            <span>
              <i>{{item.create_at}}</i>
            </span>
          </div>
          <div class="btn_box c"></div>          
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'articlelist',
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('article/getArticles');
  },
  computed: {
    articleList() {
      return this.$store.state.article.articleList;
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./articleList');
</style>
