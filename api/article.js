import express from 'express';
import checkToken from './middle/checkToken';
import { newArticle, getArticles } from '../server/article/article';

const router = express.Router();

//新增文章
router.put('/newArticle', checkToken, newArticle);
//获取文章
router.get('/getArticles', getArticles);
module.exports = router;
