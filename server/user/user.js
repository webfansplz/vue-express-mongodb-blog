import User from '../../models/user';
import { md5, responseMsg, createToken } from '../../utils/utils';
import { apiHost, apiPort } from '../../config/apiConfig';
import fs from 'fs';
import path from 'path';
module.exports = {
  //注册
  register: async (req, res) => {
    let { userName, passWord } = req.body;
    let userInfo = await User.findOne({ username: userName });
    //判断用户名存在
    if (userInfo) {
      responseMsg(res, 200, 3, '', '用户名已存在!');
      return;
    } else if (
      typeof userName == 'number' ||
      userName.length < 6 ||
      userName.length > 18
    ) {
      //判断用户名格式
      responseMsg(res, 200, 3, '', '用户名格式有误!');
      return;
    } else {
      let user = await new User({
        username: userName,
        password: md5(passWord)
      });
      await user.save();
      let { username } = await User.findOne({ username: userName });
      responseMsg(res, 200, 0, { username: username }, '注册成功!');
    }
  },
  //登录
  login: async (req, res) => {
    let { userName, passWord } = req.body;
    let userInfo = await User.findOne({ username: userName });
    //用户名不存在
    if (!userInfo) {
      responseMsg(res, 200, 3, '', '用户名不存在!');
    } else if (userInfo.password != md5(passWord)) {
      responseMsg(res, 200, 3, '', '密码错误!');
    } else {
      let { username } = userInfo;
      responseMsg(
        res,
        200,
        0,
        { username, ...createToken(userName) },
        '登录成功!'
      );
    }
  },
  //图片上传
  upload: async (req, res) => {
    let { name, cxt } = req.body;
    let s = cxt.replace(/^data:image\/\w+;base64,/, ''); //去掉base64码前面部分data:image/png;base64
    let img = new Buffer(s, 'base64'); //base64->buffer对象
    let url = apiPort ? `${apiHost}:${apiPort}` : `${apiHost}`;
    let imgPath = `./api/static/${name}`;
    fs.readFile(imgPath, (err, data) => {
      //图片已存在,直接读取覆盖
      if (data) {
        if (err) {
          responseMsg();
        }
        fs.readFile(imgPath, (err, result) => {
          responseMsg(res, 200, 0, { imgUrl: `${url}/${name}` }, 'ok');
        });
      } else {
        fs.writeFile(imgPath, img, err => {
          if (err) {
            responseMsg();
          }
          responseMsg(res, 200, 0, { imgUrl: `${url}/${name}` }, 'ok');
        });
      }
    });
  },
  //formdata上传图片
  uploadData: async (req, res) => {
    let f = req.files.file;
    let imgData = fs.readFileSync(f.path);
    let imgPath = `./api/static/${f.name}`;
    let url = apiPort ? `${apiHost}:${apiPort}` : `${apiHost}`;

    fs.readFile(imgPath, (err, data) => {
      //图片已存在,直接读取覆盖
      if (data) {
        if (err) {
          responseMsg();
        }
        fs.readFile(imgPath, (err, result) => {
          responseMsg(res, 200, 0, { imgUrl: `${url}/${f.name}` }, 'ok');
        });
      } else {
        fs.writeFile(imgPath, imgData, err => {
          if (err) {
            responseMsg();
          }
          responseMsg(res, 200, 0, { imgUrl: `${url}/${f.name}` }, 'ok');
        });
      }
    });
  }
};
