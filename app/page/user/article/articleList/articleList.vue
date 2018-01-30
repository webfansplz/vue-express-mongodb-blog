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
            <span>发布</span>            
          </div>
          <div class="btn_box c">操作</div>   
        </li>
        <li v-for="(item,i) in articleList" :key="i">
          <div class="img_box c">
            <img :src="item.coverImg" :alt="item.title">
            <div>
             {{item.title}}
            </div>
          </div>
          <div class="contxt c">
            <span>
              <em v-for="(v,k) in item.category" :key="k">{{v.name}}</em>
            </span>
            <span>
              <em v-for="(v,k) in item.tags" :key="k">{{v.name}}</em>
            </span>
            <span>
              <i>{{item.create_at|formatDate}}</i>
            </span>
            <span>
              <em>{{item.isPublish|isPublish}}</em>
            </span>
          </div>
          <div class="btn_box">
            <div>
              <span><Button type="primary">详情</Button></span>
              <span><Button type="success">修改</Button></span> 
              <span><Button type="warning">删除</Button></span> 
            </div>              
          </div>          
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
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
  },
  filters: {
    isPublish(v) {
      return v ? '已发布' : '未发布';
    },
    formatDate(v) {
      return moment(v).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./articleList');
</style>
