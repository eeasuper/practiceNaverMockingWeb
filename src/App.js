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


const store = configureStore();

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
