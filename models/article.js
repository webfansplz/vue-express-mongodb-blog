import mongoose from 'mongoose';

const Articles = new mongoose.Schema({
  title: String, //文章标题
  content: String, //文章内容
  time: String, //发表时间
  coverImg: String, //封面图片
  author: String, //作者
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

Articles.pre('findOneAndUpdate', next => {
  this.findOneAndUpdate({}, { update_at: Date.now() });
  next();
});
module.exports = mongoose.model('Article', Articles);
