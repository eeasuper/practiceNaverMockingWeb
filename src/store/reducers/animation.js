import {ACTIVATE_SHOPPING_BUTTON, DEACTIVE_SHOPPING_BUTTON} from '../actionTypes';

const DEFAULT_STATE = {
  shopping_button_acti: false
}

export default (state=DEFAULT_STATE, action)=>{
  switch(action.type){
    case ACTIVATE_SHOPPING_BUTTON:
      return {
        shopping_button_acti: true
      }
    case DEACTIVE_SHOPPING_BUTTON:
      return {
        shopping_button_acti: false
      }
    default:
      return state;
  }
}