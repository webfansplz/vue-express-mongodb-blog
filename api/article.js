import express from 'express';
import checkToken from './middle/checkToken';
import {
  newArticle,
  getArticles,
  updateArticle,
  removeArticle
} from '../server/article/article';

const router = express.Router();

//新增文章
router.post('/newArticle', checkToken, newArticle);
//获取文章
router.get('/getArticles', getArticles);
//修改文章
router.put('/updateArticle', updateArticle);
//删除文章
router.delete('/removeArticle/:id', checkToken, removeArticle);
module.exports = router;
