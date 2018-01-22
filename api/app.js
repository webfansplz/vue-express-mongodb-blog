import express from 'express';
import { getTags, addTags, delTags } from '../server/tags/tags';
// token验证中间件
import checkToken from './middle/checkToken';
const router = express.Router();
//标签
router.get('/tags', getTags);
router.post('/tags', checkToken, addTags);
router.delete('/tags', checkToken, delTags);
module.exports = router;
