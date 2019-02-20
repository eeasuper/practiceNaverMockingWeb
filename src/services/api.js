import axios from "axios";

export function setTokenHeader(token){
  if(token){
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
} // attach the token to all future requests. WHY? hydrating the app with a 'logged in user'


const backendDomain = "https://naver-mock-app-backend.herokuapp.com";

export function apiCall(method, path, data){
 
   return new Promise((resolve, reject)=>{
    console.log("attempting");
     return axios[method.toLowerCase()](backendDomain+path, data).then(res=> {
      console.log("successful apiCall");
      console.log(res);
      return resolve(res.data) //in a successful request we always get back a subobject call data.
    }).catch(err => {
      //{}comes in an object called response and a sub object called data if something goes wrong. 
      console.log("caught in apiCall")
      console.log(err);
      return reject(err.response);
    })
   
  })


  // return new Promise((resolve, reject)=>{
  //   let data1;
  //   if(path === "localhost:8080/register" || path === "localhost:8080/login"){
  //     data1 = {
  //       token: "ASDFWEFDf1244y231Ff",
  //       username: "TEST_USERNAME",
  //       name: "TEST_NAME",
  //       password: "TEST_PASSWORD",
  //       id: "TEST_ID"
  //     }  
  //   }
  //   else if((path === "/users/TEST_ID/cart" || path === "/users/undefined/cart") && method==="get"){
  //     data1 = {
  //       product_one:{
  //         product_name: "PRODUCT_TEST_NAME",
  //         product_id: "PRODUCT_TEST_ID",
  //         product_price: "PRODUCT_TEST_PRICE",
  //         product_desc: "PRODUCT_TEST_DESC"
  //       },
  //       product_two:{
  //         product_name: "PRODUCT_TEST_NAME2",
  //         product_id: "PRODUCT_TEST_ID2",
  //         product_price: "PRODUCT_TEST_PRICE2",
  //         product_desc: "PRODUCT_TEST_DESC2"
  //       }
  //     }
  //   }
  //   else if((path === "/users/TEST_ID/cart"|| path === "/users/undefined/cart") && method==="post"){
  //     data1 = data;
  //   }else{
  //     data1 = {};  
  //   }
    
  //   return resolve(data1)
  // })

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