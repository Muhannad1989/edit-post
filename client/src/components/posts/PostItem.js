import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addAndRemoveLike, deletePost } from '../../actions/post';
import { addPost } from './../../actions/post';
import EditPost from './EditPost';
const PostItem = ({
  addAndRemoveLike,
  deletePost,
  auth,
  postDetails: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
  // condition to reuse this component individual post 'Discussion '
}) => {
  const [edit, setText] = useState(false);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        {!auth.loading && user === auth.user.user._id && (
          <button onClick={() => setText(true)} className="btn btn-light">
            <i className="fas fa-edit" />
            Edit
          </button>
        )}

        {edit ? (
          <Fragment>
            <EditPost currentText={text} _id={_id} passSetEdit={setText} />
          </Fragment>
        ) : (
          <p /* contenteditable={true} */ className="my-1">{text}</p>
        )}

        <p className="my-1">{_id}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button onClick={() => addAndRemoveLike(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up" />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user.user._id && (
              <button onClick={() => deletePost(_id)} type="button" className="btn btn-danger">
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addAndRemoveLike: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
});

export default connect(
  mapStateToProps,
  { addAndRemoveLike, deletePost, addPost },
)(PostItem);
