import express from 'express';
import checkToken from './middle/checkToken';
import { newArticle } from '../server/article/article';

const router = express.Router();

//新增文章
router.put('/newArticle', newArticle);

module.exports = router;
