import mongoose from 'mongoose';
//自增ID插件
// import autoIncrement from 'mongoose-auto-increment';
//自增ID初始化
// autoIncrement.initialize(mongoose.connection);
const CateGory = new mongoose.Schema({
  name: String
});
// CateGory.plugin(autoIncrement.plugin, {
//   model: 'CateGory',
//   fiele: 'id',
//   startAt: 1,
//   incrementBy: 1
// });
module.exports = mongoose.model('CateGory', CateGory);
