import axios from "axios";

export function setTokenHeader(token){
  if(token){
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
} // attach the token to all future requests. BUT WHY? probably hydrating.

export function apiCall(method, path, data){
  return new Promise((resolve, reject)=>{
    return axios[method.toLowerCase()](path, data).then(res=> {
      return resolve(res.data) //in a successful request we always get back a subobject call data.
    }).catch(err => {
      //{}comes in an object called response and a sub object called data if something goes wrong. 
      return reject(err.response.data.error);
    })
  })
}