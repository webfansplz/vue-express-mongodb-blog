import express from 'express';
import { getTags, addTags, delTags } from '../server/tags/tags';
import {
  getCategory,
  addCategory,
  delCategory
} from '../server/category/category';
// token验证中间件
import checkToken from './middle/checkToken';
const router = express.Router();
//标签
router.get('/tags', getTags);
router.post('/tags', checkToken, addTags);
router.delete('/tags', checkToken, delTags);
//分类
router.get('/category', getCategory);
router.post('/category', checkToken, addCategory);
router.delete('/category', checkToken, delCategory);
module.exports = router;
