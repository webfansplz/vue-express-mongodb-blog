<template>
  <div id="h_menu">
    <ul>
      <li v-for="(item,i) in Menu" :key="i" :class="{'active':tabIndex==i}" @click="tabIndex=i">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'h_menu',
  data() {
    return {
      tabIndex: 0,
      Menu: ['HOME', 'CODE', 'PROJECT', 'THINK', 'ABOUT']
    };
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/style/mixin');
#h_menu {
  ul {
    width: 80%;
    margin: 0 auto;
  }
  li {
    .mx_whlh(100%,45px,45px);
    .mx_fc(14px,#757575);
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: hsla(0, 0%, 100%, 0.3);
      color: #3da8f5;
    }
    &.active {
      background-color: hsla(0, 0%, 100%, 0.6);
      color: #0088f5;
    }
  }
}
</style>