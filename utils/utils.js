import crypto from 'crypto';

module.exports = {
  md5(pwd) {
    let hmac = crypto.createHmac('md5', 'boom');
    return hmac.update(pwd).digest('hex');
  },
  responseMsg(res, code = 500, state = 3, data = {}, message = 'server error') {
    return res.status(code).json({
      state,
      data,
      message
    });
  },
  //生成token
  createToken(userName) {
    //base64编码
    let base64UrlEncode = obj =>
      Buffer.from(JSON.stringify(obj), 'utf8').toString('base64');
    //加盐secret
    const secret = 'hello-world.com';
    //JWT header 头部
    const header = {
      typ: 'JWT',
      alg: 'HS256'
    };
    //JWT playload 载荷
    const payload = {
      iss: userName,
      sub: 'everybody',
      iat: parseInt(Date.now() / 1000),
      exp: parseInt(Date.now() / 1000 + 86400)
    };
    //JWT signature 签证
    let header_paylood = `${base64UrlEncode(header)}.${base64UrlEncode(
      payload
    )}`;
    let hash = crypto.createHmac('sha256', secret);
    let signature = hash.update(header_paylood).digest('base64');
    return { token: `${header_paylood}.${signature}`, expires: payload.exp };
  },
  //验证token
  checkToken(token) {
    let resDecode = decodeToken(token);
    if (!resDecode) return false;
    let { payload, signature, PrevSignature } = resDecode;
    //是否过期或者token不对!
    if (
      payload.exp - parseInt(Date.now() / 1000) <= 0 ||
      signature != PrevSignature
    ) {
      return false;
    }
    if (signature == PrevSignature) {
      return true;
    }
  }
};

function decodeToken(token) {
  //base64解码
  let base64UrlDecode = obj =>
    JSON.parse(Buffer.from(obj, 'base64').toString('utf8'));
  //加盐secret
  const secret = 'hello-world.com';
  let tokenArr = token.split('.');
  if (tokenArr.length < 3) {
    return false;
  }
  let payload = base64UrlDecode(tokenArr[1]);
  let header_paylood = `${tokenArr[0]}.${tokenArr[1]}`;
  let hash = crypto.createHmac('sha256', secret);
  let signature = hash.update(header_paylood).digest('base64');
  return {
    payload,
    signature,
    PrevSignature: tokenArr[2]
  };
}
