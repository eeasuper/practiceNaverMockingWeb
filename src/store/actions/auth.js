import {apiCall, setTokenHeader} from "../../services/api";
import {SET_CURRENT_USER} from "../actionTypes";
import {loadCart, fetchCart} from './cart';


export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token){
  setTokenHeader(token);
}

export function logout(){
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch(loadCart([]));
  }
}

export function authUser(type, userData, method){  
  return (dispatch) => {
    return new Promise((resolve, reject)=>{
      return apiCall(method, "/"+`${type}`, userData)
      .then((data) => {
        let response = {
          name: data.name,
          username: data.username,
          password: data.password,
          email: data.email,
          token: data.token,
          id: data.id
        };
        localStorage.setItem("jwtToken", data.token);
        setAuthorizationToken(data.token);
        dispatch(setCurrentUser(response));
        dispatch(fetchCart(data.id));
        resolve();
      })
      .catch(err=>{
        console.log("error in auth")
        console.log(err);
        reject();
      })
    })
  }
}
