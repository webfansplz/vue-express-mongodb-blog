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
      let { page_size, page } = req.query;
      const options = {
        populate: 'tags category',
        page: Number(page || 1),
        limit: Number(page_size || 5)
      };
      let articles = await Article.paginate({}, options);
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
  removeArticle: async ({ params: { id } }, res) => {
    try {
      await Article.findByIdAndRemove(id);
      responseMsg(res, 200, 0, '', '删除成功!');
    } catch (err) {
      responseMsg(res);
    }
  }
};
