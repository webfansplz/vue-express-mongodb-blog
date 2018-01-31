<template>
<div id="articleDetails">
  <div class="back" @click="goBack">
    <Icon type="ios-undo"></Icon>
  </div>
  <h1 class="title">{{articleDetails.title}}</h1>
  <div class="create_time">{{articleDetails.create_at|formatDate}}</div>
  <div class="tagList">
     <i-button v-for="(item,i) in articleDetails.tags" :key="i">{{item.name}}</i-button>
  </div>
  <div class="categoryList">
    <i-button type="dashed" v-for="(item,i) in articleDetails.category" :key="i">{{item.name}}</i-button>
  </div>
  <img :src="articleDetails.coverImg" alt="文章封面">
  <div v-html="articleDetails.content" class="contxt"></div>
</div>
</template>
<script>
export default {
  name: 'articleDetails',
  computed: {
    //文章详情
    articleDetails() {
      return this.$store.state.article.articleDetails;
    }
  },
  methods: {
    //返回文章列表
    goBack() {
      this.$store.commit('article/setDetailState', false);
    }
  }
};
</script>
<style  lang="less" scoped>
@import url('../../../../assets/style/mixin');
#articleDetails {
  position: relative;
  text-align: center;
  .back {
    .mx_postl(0,0);
    cursor: pointer;
    i {
      .mx_fc(66px,#333);
    }
  }
  .title {
    .mx_fc(28px,#333);
    .mx_single_ellipsis;
    font-weight: 600;
    padding: 20px 0;
  }
  .tagList,
  .categoryList {
    padding: 10px 0;
    button {
      margin: 0 3px;
    }
  }
  .create_time {
    .mx_fc(14px,#666);
    .mx_single_ellipsis;
    padding: 10px 0;
  }
  img {
    .mx_bdrs(3px);
    display: block;
    max-height: 300px;
    margin: 0 auto;
  }
  .contxt {
    margin-top: 30px;
  }
}
</style>
