<template>
  <div id="articleTags">
    <div>
     <Tag v-for="(item,v) in 8" closable :key="v">标签{{ item + 1 }}</Tag>
    </div>
    <i-button icon="ios-plus-empty" type="dashed" size="small" @click="count += 1">添加标签</i-button>
  </div>
</template>
<script>
export default {
  name: 'articleTags',
  data() {
    return {};
  },
  methods: {
    //分割数组
    splitArray(ary, size) {
      let i = Math.ceil(ary.length / size),
        count = 0,
        box = [];
      while (count < i) {
        let s = count * size;
        box.push(ary.slice(s, s + size));
        count++;
      }
      return box;
    }
  },
  computed: {
    randomColor() {
      return `#${Math.floor(Math.random() * 256).toString(10)}`;
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./articleTags');
</style>
