import { checkToken, responseMsg } from '../../utils/utils';
module.exports = (req, res, next) => {
  let { authorization } = req.headers;
  if (authorization && checkToken(authorization)) {
    next();
  } else {
    responseMsg(res, 405, 3, '', 'token验证失败!');
  }
};
