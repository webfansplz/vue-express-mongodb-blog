import CateGory from '../../models/category';
import { md5, responseMsg, createToken } from '../../utils/utils';
module.exports = {
  getCategory: async (req, res) => {
    try {
      // let cateGoryList = await CateGory.find()
      //   .select('name')
      //   .exec();
      let cateGoryList = await CateGory.aggregate([
        {
          $lookup: {
            from: 'articles', //关联的表
            localField: '_id', //关联的键
            foreignField: 'CateGory', //
            as: 'category'
          }
        }
      ]);
      responseMsg(res, 200, 0, cateGoryList, '查询成功!');
    } catch (err) {
      responseMsg();
    }
  },
  addCategory: async (req, res) => {
    try {
      let { name } = req.body;
      let category = await CateGory.findOne({ name: name });
      if (category) {
        responseMsg(res, 200, 3, '', '分类已存在');
      } else {
        let tag = await new CateGory({
          name: name
        }).save();
        responseMsg(res, 200, 0, tag, '添加成功!');
      }
    } catch (err) {
      responseMsg();
    }
  },
  delCategory: async (req, res) => {
    try {
      let { id } = req.body;
      await CateGory.remove({ _id: id });
      let category = await CateGory.findOne({ _id: id });
      if (!category) {
        responseMsg(res, 200, 0, '', '删除成功!');
      } else {
        responseMsg(res, 200, 3, '', '删除失败!');
      }
    } catch (err) {
      responseMsg();
    }
  }
};
