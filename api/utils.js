import crypto from 'crypto';

module.exports = {
  md5(pwd) {
    let hmac = crypto.createHmac('md5', 'boom');
    return hmac.update(pwd).digest('hex');
  },
  resMsg(res, state = 3, code = 500, data = {}) {
    return res.status(code).json({
      state,
      data
    });
  }
};
