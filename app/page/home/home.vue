<template>
  <div id="home">
    <nav class="navbar">
      <div class="container">

      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'home'
};
</script>
<style lang="less" scoped>
@import url('../../assets/style/mixin');
#home {
  .navbar {
    .mx_wh(100%,60px);
    .mx_fixtl(0,0);
    z-index: 666;
    background-color: hsla(0, 0%, 100%, 0.6);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
    .container {
      .mx_wh(75%,100%);
      margin: 0 auto;
    }
  }
}
</style>
