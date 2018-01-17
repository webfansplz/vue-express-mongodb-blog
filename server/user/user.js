import User from '../../models/user';
import { md5, responseMsg, createToken } from '../../utils/utils';
module.exports = {
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
        password: passWord
      });
      await user.save();
      let { username } = await User.findOne({ username: userName });
      responseMsg(res, 200, 0, { username: username }, '注册成功!');
    }
  },
  login: async (req, res) => {
    let { userName, passWord } = req.body;
    let userInfo = await User.findOne({ username: userName });
    //用户名不存在
    if (!userInfo) {
      responseMsg(res, 200, 3, '', '用户名不存在!');
      return;
    } else {
      let { username } = userInfo;
      let token = createToken(userName);
      let expires = parseInt(Date.now() / 1000 + 86400);
      responseMsg(res, 200, 0, { token, username, expires }, '登录成功!');
    }
  }
};
