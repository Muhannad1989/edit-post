const Post = require('../../../../models/Post');
const { validationResult } = require('express-validator');

module.exports = async (request, response) => {
  // check  inputs
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(404).json({ errors: errors.array() });
  }

  // find post from data base
  const post = await Post.findById(request.params.id);

  // check if exsist
  if (!post) {
    return response.status(404).json({ msg: 'Post mot Found' });
  }

  // check authorized
  if (post.user.toString() !== request.user.id) {
    return response.status(401).json({ msg: 'User not authorized' });
  }

  try {
    // update post
    post.text = request.body.text;
    // save in database
    await post.save();
    // return result to deal with frontEnd
    response.json(post);
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return response.status(400).json({ msg: 'Post not found' });
    }
    response.send(error);
  }
};
