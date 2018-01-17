import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

//webpack按需加载组件
const Home = r =>
  require.ensure([], () => r(require("../page/home/home")), " home");
const User = r =>
  require.ensure([], () => r(require("../page/user/user")), " user");
const Login = r =>
  require.ensure([], () => r(require("../page/user/login/login")), " login");
export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/user",
      name: "user",
      component: User,
      children: [
        {
          path: "login",
          component: Login
        }
      ]
    }
  ]
});
