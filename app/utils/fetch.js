import axios from 'axios';
import config from '../../config/apiConfig';

axios.defaults.baseURL = config.apiPort
  ? `${config.apiHost}:${config.apiPort}`
  : `${config.apiHost}`;

//检测是否有token和token是否过期!
const token = window.localStorage.getItem('token');
const expires = window.localStorage.getItem('expires');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}
// //请求拦截器
// axios.interceptors.request.use(
//   config => {
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );
// //返回值拦截器
// axios.interceptors.response.use(
//   res => {
//     return res;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );

export default (type, url, params) => {
  const reqConfig = {
    method: type,
    url: url
  };
  const m = type.toLocaleLowerCase();

  if (m != 'get') {
    reqConfig.data = params;
    axios.defaults.headers['Content-Type'] = 'application/json';
  }
  return new Promise((resolve, reject) => {
    axios(reqConfig)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
