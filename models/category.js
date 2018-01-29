import mongoose from 'mongoose';

const CateGory = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('CateGory', CateGory);
