import {LOAD_CART, ADD_TO_CART, REMOVE_FROM_CART} from '../actionTypes';

//How redux works: 
//cart.js becomes an object of state in redux. [...action.products] get inserted into state.cart. 
export default (state=[], action) => {
  //state refers to cart in the redux state.
  switch(action.type){
    case LOAD_CART:
      return [...action.products];
    case REMOVE_FROM_CART:
      //changing Object into array for filtering:
      return Object.keys(state).map(val => state[val]).filter(val =>parseInt(val.product.id) !== parseInt(action.id));
    case ADD_TO_CART:
      let key = action.product.id;
      return  {...state, [key]:action.product}
    default:
      return state;
  }
}