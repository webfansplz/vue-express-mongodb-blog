import crypto from 'crypto';

export function md5(pwd) {
  let hmac = crypto.createHmac('md5', 'boom');
  return hmac.update(pwd).digest('hex');
}
