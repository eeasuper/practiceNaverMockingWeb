import React from 'react';
// import {Switch, Route, withRouter, Redirect} from "react-router-dom";
// import {BrowserRouter as Router} from "react-router-dom";
import {Router} from 'react-router-dom';
import {Provider} from "react-redux";
import {setAuthorizationToken,setCurrentUser } from "./store/actions/auth";
import jwtDecode from "jwt-decode";
import './App.css'
import history from './services/history';

import Main from './containers/Main'
import {configureStore} from "./store";
import {loadCart} from './store/actions/cart';
import Product1 from './resources/products/product_1.png'
import Product2 from './resources/products/product_2.png'
const store = configureStore();
//Testing:
    let user = {
      username: "username",
      id: 1
    }
    store.dispatch(setCurrentUser(user));

    // store.dispatch(loadCart([{
    //     product:{
    //       price: "20,000",
    //     productName: "[대구백화점 1관] [시에로코스메틱]유니 어 데이",
    //     picture: Product1,
    //     id: 2  
    //     }
    //   },
    //   {
    //     product:{
    //       price: "22,000",
    //     productName: "[PUPA] 멀티플레이 트리플 퍼포즈 아이펜슬 5종",
    //     picture: Product2,
    //     id: 3
    //   }
    //     }
    //     ]));

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  //prevent someone from manually tampering with the key of jwtToken in localStorage
  try{
    let jwt = jwtDecode(localStorage.jwtToken);
    let user = {
      username: jwt.sub,
      id: jwt.usr_id
    }
    store.dispatch(setCurrentUser(user));

  } catch(e){ 
    store.dispatch(setCurrentUser({}))
  }
}//this is hydration. If the server were to go down, or such, when the page refreshes we can still se a token in localStorage. If so, we can repopulate our state with the current user.


const App = () => (
  <Provider store={store}>
    <Router history = {history}>
      <div id="wrap">
        <Main dispatch={store.dispatch}/>
      </div>
    </Router>
  </Provider>
);

export default App;
