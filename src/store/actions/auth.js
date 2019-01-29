import {apiCall, setTokenHeader} from "../../services/api";
import {SET_CURRENT_USER} from "../actionTypes";
// import {addError,removeError} from "./errors";

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
  }
}

export function authUser(type, userData){
  return (dispatch) => {
    console.log("FDD")
    return new Promise((resolve, reject)=>{
      //-----NOTE: localhost:8080 might be wrong 
      return apiCall("post", `localhost:8080/${type}`, userData)
      .then(({token, ...user}) => {
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(user));
        // dispatch(removeError()); 
        resolve();
      })
      .catch(err=>{
        // dispatch(addError(err.message));
        console.log("error")
        reject();
      })
    })
  }
}
//at .then destructuring is used. It unpacks files from objects passed as function parameter.