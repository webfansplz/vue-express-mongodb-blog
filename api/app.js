import express from 'express';
// import { resMsg } from './utils';
// import user from './user';
// import Article from '../models/article';
const router = express.Router();

import { md5, resMsg, createToken, checkToken } from '../utils/utils';
// router.use('/user', user);

router.get('/articles', (req, res) => {
  resMsg(res, 0, 200, 'wahahei');
  // Article.find().then(result => resMsg(res, 0, 200, result));
});

module.exports = router;
