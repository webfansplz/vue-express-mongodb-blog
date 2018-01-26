import express from 'express';
import multipart from 'connect-multiparty';
import checkToken from './middle/checkToken';
import { register, login, upload } from '../server/user/user';

const router = express.Router();

let multipartMiddleware = multipart();
//注册
router.post('/register', register);
//登录
router.post('/login', login);
//图片上传
router.post('/upload', checkToken, multipartMiddleware, upload);
module.exports = router;
