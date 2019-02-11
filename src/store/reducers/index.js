import { combineReducers } from "redux";
import currentUser from "./currentUser";
// import errors from "./errors";
import cart from './cart';
import animation from './animation';

const rootReducer = combineReducers({
  currentUser,
  cart,
  animation
})

// const rootReducer = currentUser;

export default rootReducer;