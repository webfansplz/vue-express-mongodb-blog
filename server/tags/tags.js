import Tags from '../../models/tags';
import { md5, responseMsg, createToken } from '../../utils/utils';
module.exports = {
  getTags: async (req, res) => {
    try {
      let tagList = await Tags.find()
        .select('name')
        .exec();
      responseMsg(res, 200, 0, tagList, '查询成功!');
    } catch (err) {
      responseMsg();
    }
  },
  addTags: async (req, res) => {
    try {
      let { tagName } = req.body;
      let tags = await Tags.findOne({ name: tagName });
      if (tags) {
        responseMsg(res, 200, 0, '', '标签已存在');
      } else {
        let tag = await new Tags({
          name: tagName
        }).save();
        responseMsg(res, 200, 0, tag, '添加成功!');
      }
    } catch (err) {
      responseMsg();
    }
  },
  delTags: async (req, res) => {}
};
