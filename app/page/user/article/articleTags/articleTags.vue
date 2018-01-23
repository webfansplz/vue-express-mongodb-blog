<template>
  <div id="articleTags">

      <Tag v-for="(item,i) in tagList" :key="i"  v-if="tagList.length>0"  type="dot" closable :color="randomColor()" @on-close="closeTag(item)">{{ item.name }}</Tag>
                        
      <i-button icon="ios-plus-empty" type="dashed" size="small">添加标签</i-button>      
  </div>
</template>
<script>
export default {
  name: 'articleTags',
  data() {
    return {};
  },
  methods: {
    //随机颜色
    randomColor() {
      return `#${Math.floor(Math.random() * 256).toString(10)}`;
    },
    //关闭书签
    closeTag(item) {
      this.$store
        .dispatch('article/delTags', {
          id: item._id
        })
        .then(res => {
          if (res.data.state == 0) {
            this.$Message.success(res.data.message);
            this.$store.dispatch('article/getTags');
          } else {
            this.$Messgae.error(res.data.message);
          }
        });
      console.log(item);
    }
  },
  computed: {
    //标签列表
    tagList() {
      return this.$store.state.article.tagList;
    }
  },
  created() {
    this.$store.dispatch('article/getTags');
  }
};
</script>
<style lang="less" scoped>
@import url('./articleTags');
</style>
