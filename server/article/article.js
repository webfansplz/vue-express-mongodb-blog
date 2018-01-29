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
      responseMsg();
    }
  }
};
