import {LOAD_CART, ADD_TO_CART, REMOVE_FROM_CART} from '../actionTypes';
import {apiCall} from '../../services/api';

export const loadCart = products => ({
  type: LOAD_CART,
  products
});

export const remove = id => ({
  type: REMOVE_FROM_CART,
  id
});

export const addCart = product => ({
  type: ADD_TO_CART,
  product
})

export const removeFromCart = (user_id, product_id) => {
  return dispatch => {
    return apiCall("delete", `/users/${user_id}/cart/${product_id}`)
      .then(()=> dispatch(remove(product_id)))
      .catch(err => {
        console.log(err.message);
        console.log("err caught in actions/cart.js err")
      });
  }
}
//erase param: products when connecting to backend...
export const fetchCart = (user_id, products) => {
  console.log("FROM cart.js in actions:")
  console.log(user_id)
  return dispatch => {
    return apiCall("get", `/users/${user_id}/cart`)
    .then(res => {
      dispatch(loadCart(products));
    })
    .catch(err => {
      console.log(err.message);
      console.log("err caught in actions/cart.js")
    })
  };
}

export const addToCart = product => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/users/${id}/cart`, {product})
  .then(res=>{
    dispatch(addCart(res));
  })
  .catch(err =>  {
    console.log(err.message);
    console.log("err caught in actions/cart.js")
  });
}