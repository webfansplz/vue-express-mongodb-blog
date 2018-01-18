<template>
  <div id="user">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'user',
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
#user {
  width: 100%;
  height: 100%;
}
</style>
