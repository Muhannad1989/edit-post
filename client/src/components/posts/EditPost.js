import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editPost } from './../../actions/post';
const EditPost = ({ passSetEdit, editPost, currentText, _id }) => {
  const [text, setText] = useState(currentText);
  const cancel = () => {
    setText(currentText);
    passSetEdit(false);
  };

  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Edit post ID : {_id} </h3>
        <h3>Edit text : {currentText}</h3>
      </div>
      <form
        class="form my-1"
        onSubmit={e => {
          e.preventDefault();
          // write new text on this id
          editPost({ text }, _id);
          // reset the form
          setText('');
          // close editing
          passSetEdit(false);
        }}
      >
        <textarea
          name="text"
          value={text}
          onChange={e => setText(e.target.value)}
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
        />
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
        <input onClick={cancel} type="cancel" class="btn btn-info my-1" value="Cancel" />
      </form>
    </div>
  );
};

EditPost.propTypes = {
  editPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { editPost },
)(EditPost);
