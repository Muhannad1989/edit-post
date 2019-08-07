import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

import { getPosts, editPost } from '../../actions/post';

const Posts = ({ editPost, getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const [text, setText] = useState('');

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community x
      </p>

      <form
        class="form my-1"
        onSubmit={e => {
          e.preventDefault();
          editPost({ text: 'this is a new text from redux' });
          setText('');
        }}
      >
        <textarea
          name="text"
          value={text}
          cols="30"
          rows="5"
          onChange={e => setText(e.target.value)}
          placeholder="Create a post"
          required
        />
        <input type="submit" class="btn btn-dark my-1" value="change" />
      </form>

      {/* <PostForm /> */}
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} postDetails={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  { getPosts, editPost },
)(Posts);
