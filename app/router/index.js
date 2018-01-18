import Vue from 'vue';
import Router from 'vue-router';
import { checkToken } from '../utils/utils';
Vue.use(Router);

//webpack按需加载组件
const Home = r =>
  require.ensure([], () => r(require('../page/home/home')), ' home');
const User = r =>
  require.ensure([], () => r(require('../page/user/user')), ' user');
const Login = r =>
  require.ensure([], () => r(require('../page/user/login/login')), ' login');
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.name == 'user' && !checkToken()) {
    next('/login');
  } else {
    next();
  }
});
export default router;
