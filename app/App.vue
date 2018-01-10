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
  created() {
    // fetch('get', 'articles').then(res => {
    //   console.log(res);
    // });
    // fetch('post', 'admin/register', {
    //   userName: 'caishaohui',
    //   passWord: '123456'
    // });
    fetch('post', 'admin/login', {
      userName: 'webfansplz',
      passWord: '123456'
    });
  }
};
</script>
<style lang="less">

</style>
