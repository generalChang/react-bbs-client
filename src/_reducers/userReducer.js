import {
  AUTH_USER,
  EMAIL_CERTIFICATED,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  SEND_TMP_PASSWORD,
  SET_TMP_PASSWORD,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
} from "../_actions/types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
    case LOGOUT_USER:
      return { ...state };
      break;
    case REGISTER_USER:
      return { ...state };
      break;
    case EMAIL_CERTIFICATED:
      return { ...state };
      break;
    case SEND_TMP_PASSWORD:
      return { ...state };
      break;
    case SET_TMP_PASSWORD:
      return { ...state };
      break;
    case UPDATE_PASSWORD:
      return { ...state };
      break;
    case UPDATE_PROFILE:
      return { ...state };
      break;
    default:
      return { ...state };
      break;
  }
};

export default userReducer;
