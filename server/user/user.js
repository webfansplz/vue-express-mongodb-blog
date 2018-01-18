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
        password: md5(passWord)
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
  }
};
