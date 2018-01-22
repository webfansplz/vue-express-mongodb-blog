<template>
  <div id="user">
    <header class="header"></header>
    <div class="user-contxt">
      <Menu class="leftMenu" @toggle-menu="toggleMenu"></Menu>
      <div class="content">
        <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from './menu/userMenu';
export default {
  name: 'user',
  data() {
    return {};
  },
  methods: {
    //切换菜单
    toggleMenu(path) {
      this.$router.push(path);
    }
  },
  components: {
    Menu
  }
};
</script>
<style lang="less" scoped>
@import url('./user');
</style>
