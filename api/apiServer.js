import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from '../config/apiConfig';
const app = express();

// 跨域设置
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  // 这里获取 origin 请求头 而不是用 *
  res.header('Access-Control-Allow-Origin', req.headers['origin'] || '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', require('./app'));
app.use('/admin', require('./admin'));

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function(
  err
) {
  if (err) {
    console.log('数据库连接失败!');
    return;
  }
  console.log('数据库连接成功!');
  app.listen(config.apiPort, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `apiServer is listen in ${config.apiHost}:${config.apiPort}!!!`
      );
    }
  });
});