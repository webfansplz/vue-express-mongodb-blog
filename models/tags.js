import mongoose from 'mongoose';

const Tags = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Tags', Tags);
