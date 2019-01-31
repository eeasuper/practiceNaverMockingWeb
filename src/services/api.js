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
    let data = {
      token: "ASDFWEFDf1244y231Ff",
      username: "TEST_USERNAME",
      name: "TEST_NAME",
      password: "TEST_PASSWORD"
    }
    return resolve(data)
  })

  //=================
  //-----NOTE: Code below is to be uncommented when backend is uploaded onto cloud, and production stage is attempted.
  //=================
  // return new Promise((resolve, reject)=>{
  //   console.log("attempting");
     // return axios[method.toLowerCase()](path, data).then(res=> {
  //     console.log("attempting POST");
  //     console.log("successful");
  //     console.log(res);
  //     return resolve(res.data) //in a successful request we always get back a subobject call data.
  //   }).catch(err => {
  //     //{}comes in an object called response and a sub object called data if something goes wrong. 
  //     console.log("caught in apiCall")
  //     console.log(err);
  //     return reject(err.response);
  //   })
  //  }
  // })
}