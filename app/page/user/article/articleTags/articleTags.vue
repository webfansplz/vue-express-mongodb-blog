<template>
  <div id="articleTags">
      <Tag v-for="(item,i) in tagList" :key="i"  v-if="tagList.length>0"  type="dot" closable :color="randomColor()" @on-close="closeTag(item)">{{ item.name }}</Tag>
      <Tag v-if="tagList.length==0" :color="randomColor()">暂无标签!</Tag>
      <i-button icon="ios-plus-empty" type="dashed" size="small" @click="showTxt">添加标签</i-button>   
      <Modal v-model="txtStatus" title="新增标签" @on-ok="addTag"  @on-cancel="cancel">
         <i-input size="large" placeholder="请输入标签名" v-model="tagName" autofocus :maxlength=15></i-input>  
      </Modal>   
  </div>
</template>
<script>
export default {
  name: 'articleTags',
  data() {
    return {
      //标签编辑框
      txtStatus: false,
      //标签名
      tagName: ''
    };
  },
  methods: {
    //获取标签列表
    getTagList() {
      this.$store.dispatch('article/getTags');
    },
    //随机颜色
    randomColor() {
      return `#${Math.floor(Math.random() * 256).toString(10)}`;
    },
    //关闭标签
    closeTag(item) {
      this.$store
        .dispatch('article/delTags', {
          id: item._id
        })
        .then(res => {
          if (res.data.state == 0) {
            this.$Message.success(res.data.message);
            this.getTagList();
          } else {
            this.$Messgae.error(res.data.message);
          }
        });
      console.log(item);
    },
    //打开新增标签框
    showTxt() {
      this.txtStatus = true;
    },
    //添加标签
    addTag() {
      if (!this.tagName) {
        this.$Message.warning('标签名称不能为空!!!');
        return false;
      }
      this.$store
        .dispatch('article/addTags', {
          name: this.tagName
        })
        .then(res => {
          if (res.data.state == 0) {
            this.$Message.success(res.data.message);
            this.getTagList();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      this.tagName = '';
    },
    //取消添加
    cancel() {
      this.txtStatus = false;
      this.tagName = '';
    }
  },
  computed: {
    //标签列表
    tagList() {
      return this.$store.state.article.tagList;
    }
  },
  created() {
    this.getTagList();
  }
};
</script>
<style lang="less" scoped>
@import url('./articleTags');
</style>
