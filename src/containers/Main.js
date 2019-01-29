import React from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Homepage from '../components/Homepage/Homepage';
import {authUser} from "../store/actions/auth";
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';

const Main = props => {
  return (
    <div>
      <Route exact path="/" component={Homepage}/>
      <Route exact path="/signin" component={LoginForm}/>
      <Route exact path="/signup" render ={props=>{
          return(
            <RegisterForm onAuth={authUser}/>
          )
        }
      }/>
    </div>
  )
};

function mapStateToProps(state){
  return{
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps,{authUser})(Main));

        // <Route exact path="/signin" render={props=>{
        //     return (<Homepage/>);
        // }}/>
        // <Route exact path="/signup" render={props =>{
        //   return(<Homepage/>);
        // }}/>