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
    fetch('get', 'articles').then(res => {
      console.log(res);
    });
  }
};
</script>
<style lang="less">

</style>
