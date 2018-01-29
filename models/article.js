import mongoose from 'mongoose';
//自增ID插件
import autoIncrement from 'mongoose-auto-increment';
//分页插件
import paginate from 'mongoose-paginate';
//自增ID初始化
autoIncrement.initialize(mongoose.connection);
const Articles = new mongoose.Schema({
  title: String, //文章标题
  content: String, //文章内容
  // viewCount: Number, //浏览次数
  // commentCount: Number, //评论次数
  time: String, //发表时间
  coverImg: String, //封面图片
  // author: String, //作者
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }], //标签
  category: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'CateGory', required: true }
  ], //分类
  isPublish: Boolean, //是否发布,
  // 发布日期
  create_at: { type: Date, default: Date.now },
  // 最后修改日期
  update_at: { type: Date, default: Date.now }
});

//插件配置
Articles.plugin(paginate);
Articles.plugin(autoIncrement.plugin, {
  model: 'Article',
  fiele: 'id',
  startAt: 1,
  incrementBy: 1
});
//
Articles.pre('findOneAndUpdate', next => {
  this.findOneAndUpdate({}, { update_at: Date.now() });
  next();
});
module.exports = mongoose.model('Article', Articles);
