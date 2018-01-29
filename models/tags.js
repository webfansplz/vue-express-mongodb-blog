import mongoose from 'mongoose';
//自增ID插件
// import autoIncrement from 'mongoose-auto-increment';
//自增ID初始化
// autoIncrement.initialize(mongoose.connection);
const Tags = new mongoose.Schema({
  name: String
});
// Tags.plugin(autoIncrement.plugin, {
//   model: 'Tags',
//   fiele: 'id',
//   startAt: 1,
//   incrementBy: 1
// });
module.exports = mongoose.model('Tags', Tags);
