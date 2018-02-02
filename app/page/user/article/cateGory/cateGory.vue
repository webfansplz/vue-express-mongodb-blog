<template>
  <div id="cateGory">
  <Tag v-for="(item,i) in cateGoryList" :key="i"  v-if="cateGoryList.length>0"  type="dot" closable :color="randomColor()" @on-close="closeTag(item)">{{ item.name }}</Tag>
      <Tag  v-if="cateGoryList.length==0"  color="blue">暂无分类</Tag>
      <i-button icon="ios-plus-empty" type="dashed" size="small" @click="showTxt">添加分类</i-button>   
      <Modal v-model="txtStatus" title="新增分类" @on-ok="addCategory"  @on-cancel="cancel">
         <i-input size="large" placeholder="请输入分类名" v-model="cateGoryName" autofocus :maxlength=15></i-input>  
      </Modal> 
  </div>
</template>
<script>
export default {
  name: 'cateGory',
  data() {
    return {
      //分类编辑框
      txtStatus: false,
      //分类名
      cateGoryName: ''
    };
  },
  methods: {
    //获取分类列表
    getCateGoryList() {
      this.$store.dispatch('article/getCategory');
    },
    //随机颜色
    randomColor() {
      return `#${Math.floor(Math.random() * 256).toString(10)}`;
    },
    //关闭分类
    closeTag(item) {
      this.$store.dispatch('article/delCategory', item._id).then(res => {
        if (res.data.state == 0) {
          this.$Message.success(res.data.message);
          this.getCateGoryList();
        } else {
          this.$Messgae.error(res.data.message);
        }
      });
      console.log(item);
    },
    //打开新增分类框
    showTxt() {
      this.txtStatus = true;
    },
    //添加分类
    addCategory() {
      if (!this.cateGoryName) {
        this.$Message.warning('分类名称不能为空!!!');
        return false;
      }
      this.$store
        .dispatch('article/addCategory', {
          name: this.cateGoryName
        })
        .then(res => {
          if (res.data.state == 0) {
            this.$Message.success(res.data.message);
            this.getCateGoryList();
          } else {
            this.$Message.warning(res.data.message);
          }
        });
      this.cateGoryName = '';
    },
    //取消添加
    cancel() {
      this.txtStatus = false;
      this.cateGoryName = '';
    }
  },
  computed: {
    //分类列表
    cateGoryList() {
      return this.$store.state.article.cateGoryList;
    }
  },
  created() {
    this.getCateGoryList();
  }
};
</script>
<style lang="less" scoped>
@import url('./cateGory');
</style>
