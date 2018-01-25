import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import { checkToken } from '../utils/utils';
Vue.use(iView);
Vue.use(Router);

//webpack按需加载组件
const Home = r =>
  require.ensure([], () => r(require('../page/home/home')), ' home');
//后台管理
const User = r =>
  require.ensure([], () => r(require('../page/user/user')), ' user');
//后台登录
const Login = r =>
  require.ensure([], () => r(require('../page/user/login/login')), ' login');
//文章列表
const ArticleList = r =>
  require.ensure(
    [],
    () => r(require('../page/user/article/articleList/articleList')),
    ' login'
  );
//新增文章
const AddArticle = r =>
  require.ensure(
    [],
    () => r(require('../page/user/article/addArticle/addArticle')),
    ' login'
  );
//文章分类
const CateGory = r =>
  require.ensure(
    [],
    () => r(require('../page/user/article/cateGory/cateGory')),
    ' login'
  );
//文章标签
const ArticleTags = r =>
  require.ensure(
    [],
    () => r(require('../page/user/article/articleTags/articleTags')),
    ' login'
  );
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
      component: User,
      children: [
        {
          path: '/articleList',
          component: ArticleList
        },
        {
          path: '/addArticle',
          component: AddArticle
        },
        {
          path: '/cateGory',
          component: CateGory
        },
        {
          path: '/articleTags',
          component: ArticleTags
        }
      ],
      beforeEnter: (to, form, next) => {
        !checkToken() ? next('/login') : next();
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});
router.afterEach(transition => {
  setTimeout(() => {
    iView.LoadingBar.finish();
  }, 200);
});
export default router;
