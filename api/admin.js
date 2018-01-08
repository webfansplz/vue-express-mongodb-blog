import express from 'express';
import { md5, resMsg } from './utils';
import User from '../models/user';

const router = express.Router();
// router.post('/register', (req, res) => {
//   let user = new User({
//     username: req.username,
//     passage: md5(req.passage)
//   });
// });
module.exports = router;
