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
  created() {}
};
</script>
<style lang="less">

</style>
