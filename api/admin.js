import express from 'express';
import { register, login } from '../server/user/user';
// token验证中间件
// import checkToken from './middle/checkToken';

const router = express.Router();
//注册
router.post('/register', register);
//登录
router.post('/login', login);

module.exports = router;
