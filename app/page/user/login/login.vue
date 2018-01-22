<template>
  <div id="login">
      <div class="login_box">
         <Input v-model="username" placeholder="Enter your username..."  class="txt_box" :maxlength=16></Input>
         <Input type="password"  @on-enter="checkLogin" v-model="password" placeholder="Enter your password..."  class="txt_box" :maxlength=16></Input>
         <div class="btn_box">
           <Button type="info" @click="checkLogin">登录</Button>     
         </div>    
      </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    //验证用户名
    checkUsername() {
      if (!this.username) {
        this.$Message.warning('用户名不能为空!');
        return false;
      } else if (this.username.length < 6 || this.username.length > 16) {
        this.$Message.warning('请输入6-16位用户名!');
        return false;
      } else {
        return true;
      }
    },
    //验证密码
    checkPassword() {
      if (!this.password) {
        this.$Message.warning('密码不能为空!');
        return false;
      } else {
        return true;
      }
    },
    //是否登录
    checkLogin() {
      this.checkUsername() && this.checkPassword() && this.login();
    },
    //登录
    login() {
      let userInfo = {
        userName: this.username,
        passWord: this.password
      };
      let { getLocal } = this.utils;
      this.$store.dispatch('user/login', userInfo).then(res => {
        if (res.state == 0) {
          getLocal('token', res.data.token);
          getLocal('expires', res.data.expires);
          this.$Message.success('登录成功!');
          this.$router.push('/user');
        } else {
          this.$Message.warning(res.message);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./login.less');
</style>
