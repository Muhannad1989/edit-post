import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editPost } from './../../actions/post';
const EditPost = ({ editPost, currentText, _id }) => {
  // let data;
  // if (currentText) {
  //   data = currentText;
  // } else {
  //   data = '';
  // }

  //  current set text into the form
  // const [text, setText] = useState(currentText);
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
          editPost({ text: 'updated text' }, _id);
          // reset the form
          // setText('');
        }}
      >
        <textarea
          name="text"
          value={'updated text'}
          // onChange={e => setText(e.target.value)}
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
