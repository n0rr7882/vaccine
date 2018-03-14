import express from 'express';
import error from './error';

import sign from './sign';
import user from './user';
import post from './post';
import comment from './comment';
import follow from './follow';
import upload from './upload';
import mypage from './mypage';
import search from './search';

const router = express.Router();

router.use('/sign', sign);
router.use('/users', user);
router.use('/posts', post);
router.use('/comments', comment);
router.use('/follows', follow);
router.use('/uploads', upload);
router.use('/mypages', mypage);
router.use('/search', search);
router.use(error);

export default router;