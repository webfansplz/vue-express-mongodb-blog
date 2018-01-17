<template>
  <div id="login">
      <div class="loginBox"></div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import url("../../../assets/style/mixin");
#login {
  .mx_wh(100%,100%);
  .mx_fixtl(0,0);
  z-index: 1;
  .mx_flex;
  .mx_flex_mid;
  .loginBox {
    .mx_wh(500px,250px);
    .mx_bdrs(8px);
    background-color: #1c2438;
  }
}
</style>
