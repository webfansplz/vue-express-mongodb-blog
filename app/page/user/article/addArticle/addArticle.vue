<template>
  <div id="addArticle">
     <Form  :label-width="80">
        <FormItem label="文章标题">
            <Input v-model="title" placeholder="Enter title..."></Input>
        </FormItem>
        <FormItem label="文章标签" class="btn-box">
            <i-button v-for="(item,i) in tagList" :key="i"  :class="{'current':tags.indexOf(item._id)>-1}" @click="chooseTaglist(item._id)">{{item.name}}</i-button>
        </FormItem>
        <FormItem label="文章分类"  class="btn-box">
            <i-button v-for="(item,i) in cateGoryList" :key="i" :class="{'current':category.indexOf(item._id)>-1}" @click="chooseArticlelist(item._id)">{{item.name}}</i-button>   
        </FormItem>
        <FormItem label="文章内容">
            <mavonEditor @save-content="getContent"></mavonEditor>
        </FormItem>
    </Form>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mavonEditor from 'components/mavonEditor/mavonEditor';
export default {
  data() {
    return {
      //文章标题
      title: '',
      //文章内容
      content: '',
      //文章标签
      tags: [],
      //文章分类
      category: []
    };
  },
  methods: {
    //获取内容
    getContent(val) {
      console.log(val);
    },
    //选择文章标签
    chooseTaglist(id) {
      let i = this.tags.indexOf(id);
      i > -1 ? this.tags.splice(i, 1) : this.tags.push(id);
    },
    //选择文章分类
    chooseArticlelist(id) {
      let i = this.category.indexOf(id);
      i > -1 ? this.category.splice(i, 1) : this.category.push(id);
    }
  },
  components: {
    mavonEditor
  },
  computed: {
    ...mapState({
      tagList: state => state.article.tagList,
      cateGoryList: state => state.article.cateGoryList
    })
  },
  created() {
    //获取文章标签
    this.$store.dispatch('article/getTags');
    //获取文章分类
    this.$store.dispatch('article/getCategory');
  }
};
</script>
<style lang="less" scoped>
@import url('./addArticle');
</style>
