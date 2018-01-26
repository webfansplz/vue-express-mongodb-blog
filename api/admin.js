import express from 'express';
import checkToken from './middle/checkToken';
import { register, login, upload } from '../server/user/user';

const router = express.Router();

//注册
router.post('/register', register);
//登录
router.post('/login', login);
//图片上传
router.post('/upload', checkToken, upload);
module.exports = router;
