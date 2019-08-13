const Post = require('../../../../models/Post');
const User = require('../../../../models/User');

const { validationResult } = require('express-validator');

// id => post , comment_id  / user id
module.exports = async (request, response) => {
  // check  inputs (comment text)
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(404).json({ errors: errors.array() });
  }

  // check user
  try {
    const user = await User.findById(request.user.id);

    if (!user) {
      return response.status(404).json({ msg: 'User not authorized' });
    }

    let post = await Post.findById(request.params.id);
    if (!post) {
      return response.status(404).json({ msg: 'Post mot Found' });
    }

    if (post.user.toString() !== request.user.id) {
      return response.status(401).json({ msg: 'User not authorized' });
    }

    const index = post.comments.map(ele => ele._id.toString()).indexOf(request.params.comment_id);
    if (index === -1) {
      return response.status(404).json({ msg: 'Comment mot Found' });
    }

    post.comments[index].text = request.body.text;
    await post.save();

    return response.status(200).json({ msg: post });
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return response.status(400).json({ msg: 'Post not found' });
    }
    response.send(error);
  }
};
