<template>
  <div id="newArticle">
    <Form :label-width="80">
      <FormItem label="文章标题">
        <Input v-model="title" placeholder="Enter title..."></Input>
      </FormItem>
      <FormItem label="文章标签" class="btn-box">
        <i-button v-for="(item,i) in tagList" :key="i" :class="{'current':tags.indexOf(item._id)>-1}" @click="chooseTaglist(item._id)">{{item.name}}</i-button>
      </FormItem>
      <FormItem label="文章分类" class="btn-box">
        <i-button v-for="(item,i) in cateGoryList" :key="i" :class="{'current':category.indexOf(item._id)>-1}" @click="chooseArticlelist(item._id)">{{item.name}}</i-button>
      </FormItem>
      <FormItem label="文章封面">
        <Upload :action="uploadDataUrl" ref="fileBox" :max-size=300 :headers="{'Authorization':token}" :format="['jpg','jpeg','png']" :on-success="sucUpload" :on-remove="rmCoverImg">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="封面预览" v-if="coverImg">
        <img :src="coverImg" alt="文章封面" class="coverImg">
      </FormItem>
      <FormItem label="文章内容">
        <mavonEditor @save-content="getContent" :status="clearMd"></mavonEditor>
      </FormItem>
      <FormItem label="是否发布" class="btn-box">
        <i-button :class="{'current':isPublish}" @click="isPublish=true">公开</i-button>
        <i-button :class="{'current':!isPublish}" @click="isPublish=false">不公开</i-button>
      </FormItem>
      <div class="bot-box">
        <i-button type="info" @click="saveData">保存</i-button>
        <i-button @click="clearData">重置</i-button>
      </div>
    </Form>
  </div>
</template>
<script>
import config from '../../../../../config/apiConfig';
import { mapState } from 'vuex';
import mavonEditor from 'components/mavonEditor/mavonEditor';
export default {
  name: 'newArticle',
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
      category: [],
      //是否发布
      isPublish: true,
      //上传地址
      uploadDataUrl: '',
      //清空markdown内容
      clearMd: false,
      //markdown内容
      markCxt: ''
    };
  },
  methods: {
    //获取内容
    getContent({ content, markCxt }) {
      this.content = content;
      this.markCxt = markCxt;
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
    },
    //移除文章封面
    rmCoverImg(file, fileList) {
      this.coverImg = '';
    },
    //清空数据
    clearData() {
      this.title = '';
      this.content = '';
      this.coverImg = '';
      this.markCxt = '';
      this.isPublish = true;
      this.tags = [];
      this.category = [];
      this.$refs.fileBox.fileList = [];
      this.clearMd = true;
      setTimeout(() => {
        this.clearMd = false;
      }, 200);
    },
    //验证文章表单填写是否完整
    testArticle() {
      if (!this.title) {
        this.$Message.warning('请填写文章标题!');
        return false;
      } else if (this.tags.length == 0) {
        this.$Message.warning('请至少选择一项文章标签!');
        return false;
      } else if (this.category.length == 0) {
        this.$Message.warning('请至少选择一项文章分类!');
        return false;
      } else if (!this.coverImg) {
        this.$Message.warning('请上传文章封面!');
        return false;
      } else if (!this.content) {
        this.$Message.warning('请填写文章内容!');
        return false;
      } else {
        return true;
      }
    },
    //保存文章
    saveData() {
      if (!this.testArticle()) return false;
      let reqData = {
        title: this.title,
        content: this.content,
        coverImg: this.coverImg,
        tags: this.tags,
        category: this.category,
        isPublish: this.isPublish,
        markCxt: this.markCxt
      };
      let url;
      if (JSON.stringify(this.articleDetails) != '{}') {
        url = 'article/updateArticle';
        reqData._id = this.articleDetails._id;
      } else {
        url = 'article/newArticle';
      }
      this.$store.dispatch(url, reqData).then(res => {
        if (res.data.state == 0) {
          this.$Message.success(res.data.message);
          this.clearData();
        } else {
          this.$Message.warning(res.data.message);
        }
      });
    },
    //抽取id
    getListId(list) {
      const box = [];
      list.map(v => {
        box.push(v._id);
      });
      return box;
    },
    //是否修改
    isAlter() {
      //修改
      if (JSON.stringify(this.articleDetails) != '{}') {
        let {
          title,
          coverImg,
          content,
          category,
          isPublish,
          tags
        } = this.articleDetails;
        this.title = title;
        this.coverImg = coverImg;
        this.isPublish = isPublish;
        this.tags = this.getListId(tags);
        this.category = this.getListId(category);
        this.content = content;
      }
    }
  },
  components: {
    mavonEditor
  },
  computed: {
    ...mapState({
      tagList: state => state.article.tagList,
      cateGoryList: state => state.article.cateGoryList,
      articleDetails: state => state.article.articleDetails,
      token: () => window.localStorage.getItem('token')
    })
  },
  created() {
    //设置文件上传地址
    let url = config.apiPort
      ? `${config.apiHost}:${config.apiPort}`
      : `${config.apiHost}`;
    this.uploadDataUrl = `${url}/admin/uploadData`;
    //获取文章标签
    this.$store.dispatch('article/getTags');
    //获取文章分类
    this.$store.dispatch('article/getCategory');
    this.isAlter();
  },
  beforeDestroy() {
    this.$store.commit('article/setArticleDetails', {});
  }
};
</script>
<style lang="less" scoped>
@import url('./newArticle');
</style>
