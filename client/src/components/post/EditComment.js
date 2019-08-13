import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editComment } from './../../actions/post';

// import './editPost.css';
const EditComment = ({ currentText, passSetEdit, editComment, postId, _id }) => {
  const [text, setText] = useState(currentText);
  const cancel = () => {
    setText(currentText);
    passSetEdit(false);
  };

  return (
    <div className="post-form">
      <div className="bg-primary p edit-post-title">
        <h3>post ID : {postId} </h3>
        <h3>Comment ID : {_id} </h3>
        <h3>Current Post: {currentText}</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          // write new text on this id
          editComment({ text }, postId, _id);
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
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
        <button onClick={cancel} type="cancel" className="btn btn-info my-1">
          <i classNameName="fas fa-cancel" /> {'  '} Cancel
        </button>
      </form>
    </div>
  );
};

EditComment.propTypes = {
  editComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { editComment },
)(EditComment);
