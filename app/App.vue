<template>
  <div id="app">
    <canvas id="canvas"></canvas>
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
    fetch('get', '/tags').then(res => {
      console.log(res);
    });
  },
  mounted() {
    //实例化粒子连线背景
    require('./utils/particle');
  }
};
</script>
<style lang="less">
@import url('assets/style/common');
@import url('assets/style/mixin');
#app {
  .mx_wh(100%,100%);
  background-color: #eee;
  #canvas {
    .mx_fixtl(0,0);
    z-index: 0;
    .mx_wh(100%,100%);
  }
}
</style>
