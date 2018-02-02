import Article from '../../models/article';
import { responseMsg, createToken } from '../../utils/utils';
module.exports = {
  //新增文章
  newArticle: async (req, res) => {
    try {
      let obj = req.body;
      let isExist = await Article.findOne({ title: req.body.title });
      if (isExist) {
        responseMsg(res, 200, 3, '', '已存在相同的文章名称!');
      } else {
        console.log(req.body);
        let article = await new Article(obj).save();
        responseMsg(res, 200, 0, article, '添加成功!');
      }
    } catch (err) {
      responseMsg(res);
    }
  },
  //获取文章
  getArticles: async (req, res) => {
    try {
      let articles = await Article.find()
        .populate('tags category')
        .exec();
      responseMsg(res, 200, 0, articles, '获取成功!');
    } catch (err) {
      responseMsg(res);
    }
  },
  //修改文章
  updateArticle: async ({ body }, res) => {
    try {
      let id = body._id;
      delete body._id;
      await Article.update({ _id: id }, body);
      responseMsg(res, 200, 0, '', '修改成功!');
    } catch (err) {
      responseMsg(res);
    }
  },
  //删除文章
  removeArticle: async (req, res) => {
    try {
      let { id } = req.params;
      await Article.remove({ _id: id });
      let article = await Article.findOne({ _id: id });
      if (!article) {
        responseMsg(res, 200, 0, '', '删除成功!');
      } else {
        responseMsg(res, 200, 3, '', '删除失败!');
      }
    } catch (err) {
      responseMsg(res);
    }
  }
};
