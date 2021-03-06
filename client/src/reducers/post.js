import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_POST,
  EDIT_ERROR,
  EDIT_COMMENT,
  EDIT_COMMENT_FAIL,
} from './../actions/types';

const initState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};
export default function(state = initState, action) {
  const { payload, type } = action;

  switch (type) {
    case EDIT_COMMENT:
      return {
        ...state,
        loading: false,
      };
    case EDIT_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case EDIT_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case EDIT_ERROR:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      // case EDIT_POST:
      return {
        ...state,
        posts: [payload, ...state.posts], // add new post (payload)
        loading: false,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      // case EDIT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post,
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(comment => comment._id !== payload),
          loading: false,
        },
      };

    default:
      return state;
  }
}
