<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import fetch from './utils/fetch';
export default {
  name: 'app',
  data() {
    return {};
  },
  created() {
    fetch('post', 'admin/register', {
      userName: 'caishaohui',
      passWord: '123456'
    });
    // fetch('get', 'articles').then(res => {
    //   console.log(res);
    // });
  }
};
</script>
<style lang="less">

</style>
