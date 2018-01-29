import express from 'express';
import checkToken from './middle/checkToken';
import { register, login, upload, uploadData } from '../server/user/user';
import multipart from 'connect-multiparty';
let multipartMiddleware = multipart();
const router = express.Router();

//注册
router.post('/register', register);
//登录
router.post('/login', login);
//图片上传
router.post('/upload', checkToken, upload);
//formdata上传
router.post('/uploadData', checkToken, multipartMiddleware, uploadData);
module.exports = router;
