import axios from "axios";

export function setTokenHeader(token){
  if(token){
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
} // attach the token to all future requests. BUT WHY? probably hydrating.

const config={
  headers: {
   'Origin': 'http://localhost:3000',
   // 'X-Requested-With': 'http://localhost:3000',
   'Access-Control-Request-Method' : 'POST, OPTIONS',
   'Access-Control-Request-Headers': 'access-control-allow-origin'
  }
}

export function apiCall(method, path, data){
  return new Promise((resolve, reject)=>{
    console.log("attempting");
    // return axios[method.toLowerCase()](path, data).then(res=> {
    return axios.get("http://localhost:8080/greeting-posttest",{content: "POSTING!"}, config).then(res=> {
      console.log("successful");
      console.log(res);
      return resolve(res.data) //in a successful request we always get back a subobject call data.
    }).catch(err => {
      //{}comes in an object called response and a sub object called data if something goes wrong. 
      console.log("caught in apiCall")
      console.log(err);
      return reject(err.response);
    })
  })
}