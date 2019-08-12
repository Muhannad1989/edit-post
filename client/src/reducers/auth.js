import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  REGISTER2,
  REGISTER2_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  isSignedIn: false,
};

// change initial State according to different cases ('types': which is as a key between functions('action') ans cases('reducer') )
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_PASSWORD:
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
      };
    case REGISTER2:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        isSignedIn: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER2_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      // clean the storage
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        isSignedIn: false,
      };
    default:
      return state;
  }
}
