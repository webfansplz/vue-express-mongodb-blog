<template>
  <div id="newArticle">
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
        <FormItem label="文章封面">
             <Upload action="http://localhost:3333/admin/uploadData" :max-size=200 :headers="{'Authorization':token}" :format="['jpg','jpeg','png']" :on-success="sucUpload" >
              <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
        </FormItem>
        <FormItem label="文章内容">
            <mavonEditor @save-content="getContent"></mavonEditor>
        </FormItem>
        <FormItem label="公布程度">
          <i-button>公开</i-button>
          <i-button>不公开</i-button>
          <i-button>登录公开</i-button>          
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
      //文章封面
      coverImg: '',
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
    },
    //上传文章封面成功
    sucUpload(res, file, fileList) {
      if (fileList.length && fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.coverImg = fileList[0].response.data['imgUrl'];
      console.log(this.coverImg);
      console.log(fileList);
    }
  },
  components: {
    mavonEditor
  },
  computed: {
    ...mapState({
      tagList: state => state.article.tagList,
      cateGoryList: state => state.article.cateGoryList
    }),
    token() {
      return window.localStorage.getItem('token');
    }
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
@import url('./newArticle');
</style>
