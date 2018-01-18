/**
 * 设置/获取 本地存储
 *
 * @export
 * @param {any} key 键
 * @param {any} val 值
 */
export function getLocal(key, val) {
  if (val) {
    return window.localStorage.setItem(key, val);
  } else {
    return window.localStorage.getItem(key);
  }
}
/**
 * 移除 本地存储
 *
 * @export
 * @param {any} key 键
 */
export function removeLocal(key) {
  if (key) {
    window.localStorage.removeItem(key);
  } else {
    window.localStorage.clear();
  }
}
/**
 * 验证token
 *
 * @export
 */
export function checkToken() {
  let exp = getLocal('expires') * 1000;
  return !getLocal('token') || Date.now() > exp ? false : true;
}
