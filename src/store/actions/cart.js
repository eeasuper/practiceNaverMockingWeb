import {LOAD_CART, ADD_TO_CART, REMOVE_FROM_CART} from '../actionTypes';
import {apiCall} from '../../services/api';
import {productArray} from '../../resources/products/Products';
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

// export const fetchCart = (user_id, products) => {
  export const fetchCart = (user_id) => {
  console.log("FROM cart.js fetchCart()")
  return dispatch => {
    return new Promise((resolve, reject)=>{
      return apiCall("get", `/users/${user_id}/cart`)
      .then(data => {
        /*
          response format (could fix this later if possible in backend to make it "cleaner":
          {
            "_embedded":{
              "orderDetailsList":[{
                 "id": 8 
                  ... 
              },{...}]
            }
          }
        */
        let preloadedCart = [];
        data._embedded.orderDetailsList.forEach((val, ind)=>{
          //$$_hibernate_interceptor & hibernateLazyInitializer is deleted because it is unnecessary info sent from backend.(should fix this later).
          // let product = val.product.slice(0);
          // if(product.$$_hibernate_interceptor){
          //   delete product.$$_hibernate_interceptor;
          //   delete product.hibernateLazyInitializer;
          // }

          let p = productArray.find((v,i)=>{
            return v.id === val.productId;
          })
          preloadedCart.push(p);
        });
        console.log(preloadedCart);
        dispatch(loadCart(preloadedCart));
        resolve(preloadedCart);
      })
      .catch(err => {
        console.log("err caught in actions/cart.js")
      })
    })
  };
}

export const addToCart = order => (dispatch, getState) => {
  let {currentUser} = getState();
  const userId = currentUser.user.id;
  console.log("in cart.js: id of currentuser: "+ userId);
  return apiCall("post", `/users/${userId}/cart`, order)
  .then(res=>{
    dispatch(addCart(res));
  })
  .catch(err =>  {
    console.log(err.message);
    console.log(err);
    console.log("err caught in actions/cart.js")
  });
}