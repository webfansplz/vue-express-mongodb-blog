import express from 'express';
import user from './user';
import Article from '../models/article';
const router = express.Router();

router.use('/user', user);

router.get('/articles', (req, res) => {
  Article.find().then(result => {
    res.status(200).json(result);
  });
});

module.exports = router;
