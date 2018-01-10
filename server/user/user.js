import User from '../../models/user';
import {
  md5,
  resMsg,
  createToken,
  decodeToken,
  checkToken
} from '../../utils/utils';
module.exports = {
  register: async (req, res) => {
    let { userName, passWord } = req.body;
    let userInfo = await User.findOne({ username: userName });
    //判断用户名存在
    if (userInfo) {
      resMsg(res, 3, 200, {}, '用户名已存在!');
      return;
    } else if (
      typeof userName == 'number' ||
      userName.length < 6 ||
      userName.length > 18
    ) {
      //判断用户名格式
      resMsg(res, 3, 200, {}, '用户名格式有误!');
      return;
    } else {
      let user = await new User({
        username: userName,
        password: passWord
      });
      await user.save();
      let { username } = await User.findOne({ username: userName });
      resMsg(res, 0, 200, { username: username }, '注册成功!');
    }
  },
  login: async (req, res) => {
    let { userName, passWord } = req.body;
    let userInfo = await User.findOne({ username: userName });
    //用户名不存在
    if (!userInfo) {
      resMsg(res, 3, 200, {}, '用户名不存在!');
      return;
    } else {
      let token = createToken(userName);
      let token1 = decodeToken(token);
      console.log(token);
      console.log(token1);
    }
  }
};
