import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editPost } from './../../actions/post';
const EditPost = ({ currentText }) => {
  let data;
  if (currentText) {
    data = currentText;
  } else {
    data = '';
  }
  const [text, setText] = useState('');
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Edit post ID : </h3>
        <h3>Edit text : </h3>
      </div>
      <form
        class="form my-1"
        onSubmit={e => {
          e.preventDefault();
          editPost('ssssss', '5d497f167d57be1f5c65577d');
          setText('');
        }}
      >
        <textarea
          name="text"
          value={'text'}
          // onChange={e => setText('currentText')}
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
        />
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

EditPost.propTypes = {
  editPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  { editPost },
)(EditPost);
