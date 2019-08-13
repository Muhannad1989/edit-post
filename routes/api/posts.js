const express = require('express');
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

const addPost = require('./callbacks/posts/addPost');
const getAllPosts = require('./callbacks/posts/getAllPosts');
const getPostById = require('./callbacks/posts/getPostById');
const removePostById = require('./callbacks/posts/removePostById');

// const addLike = require('./callbacks/posts/addLike');
// const unLike = require('./callbacks/posts/unLike');
const addAndRemoveLike = require('./callbacks/posts/addAndRemoveLike');

const addComment = require('./callbacks/posts/addComment');
const removeComment = require('./callbacks/posts/removeComment');

const editPost = require('./callbacks/posts/editPost');
const editComment = require('./callbacks/posts/editComment');

const router = express.Router();

// @route           POST api/posts
// @description     Add post
// @access          Private

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is requierd')
        .not()
        .isEmpty(),
    ],
  ],
  addPost,
);

// @route           POST api/posts
// @description     edit post
// @access          Private

router.put(
  '/:id',
  [
    auth,
    [
      check('text', 'Text is requierd')
        .not()
        .isEmpty(),
    ],
  ],
  editPost,
);

// @route           PUT api/posts/comment
// @description     edit comment
// @access          Private

router.put(
  '/comment/:id/:comment_id',
  [
    auth,
    [
      check('text', 'Text is requierd')
        .not()
        .isEmpty(),
    ],
  ],
  editComment,
);

// @route           Get api/posts
// @description     Get all posts
// @access          Private

router.get('/', auth, getAllPosts);

// @route           Get api/post:id
// @description     Get post bu ID
// @access          Private

router.get('/:id', auth, getPostById);

// @route           Delete api/posts/:id
// @description     Delete post by ID
// @access          Private

router.delete('/:id', auth, removePostById);

// @route           Update api/posts/toggle-like/:id
// @description     Add/Remove Like to post by ID
// @access          Private

router.put('/like/:id', auth, addAndRemoveLike);

// @route           Update api/posts/like/:id
// @description     Add Like to post by ID
// @access          Private

// router.put('/like/:id', auth, addLike);

// @route           Update api/posts/unlike/:id
// @description     Unlike post
// @access          Private

// router.put('/unlike/:id', auth, unLike);

// @route           POST api/comment/:id /*here the means the post*/
// @description     Add comment
// @access          Private

router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is requierd')
        .not()
        .isEmpty(),
    ],
  ],
  addComment,
);

// @route           DELETE api/comment/:id/:comment_id
// @description     Delete comment
// @access          Private

router.delete('/comment/:id/:comment_id', auth, removeComment);

module.exports = router;
