<template>
  <div id="home">
    <nav class="navbar">
      <div class="container">
        There is always someone to win . So why not me .
      </div>
    </nav>
    <div class="container">
      <Menu class="menu"></Menu>
      <Context class="context"></Context>
      <SideBar class="side-bar"></SideBar>
    </div>
  </div>
</template>
<script>
import Menu from './h_menu/menu';
import Context from './h_context/context';
import SideBar from './h_sideBar/sideBar';
export default {
  name: 'home',
  components: {
    Menu,
    Context,
    SideBar
  }
};
</script>
<style lang="less" scoped>
@import url('../../assets/style/mixin');
#home {
  .mx_wh(100%,100%);
  padding-top: 60px;
  .navbar {
    .mx_wh(100%,60px);
    .mx_fixtl(0,0);
    z-index: 666;
    background: #fafafa;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1), 0 1px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    .container {
      .mx_wh(70%,100%);
      display: flex;
      align-items: center;
      margin: 0 auto;
      padding-left: 300px;
      .mx_fc(16px,#3da8f5);
    }
  }
  & > .container {
    margin: 30px auto 0;
    background-color: transparent;
    .mx_wh(70%,100%);
    display: flex;
    .menu {
      flex: 1.5;
      background-color: #3da8f5;
    }
    .context {
      flex: 6;
      background-color: #d56d58;
    }
    .side-bar {
      flex: 2.5;
      background-color: #dca456;
    }
  }
}
</style>
