import Tags from '../../models/tags';
import { md5, responseMsg, createToken } from '../../utils/utils';
module.exports = {
  getTags: async (req, res) => {
    let tagList = await Tags.find();
    console.log(tagList);
  },
  addTags: async (req, res) => {},
  delTags: async (req, res) => {}
};
