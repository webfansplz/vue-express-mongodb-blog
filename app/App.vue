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
  created() {},
  mounted() {
    require('./utils/particle');
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body,
html {
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
