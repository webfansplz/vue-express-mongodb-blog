import express from 'express';
import user from './user';

const router = express.Router();

router.use('/user', user);

module.exports = router;
