import React, { Component } from 'react';
import {Route, withRouter} from "react-router-dom";
//Switch,Redirect
import {connect} from "react-redux";
// import {bindActionCreators} from 'redux'; 

import Homepage from '../components/Homepage/Homepage';
import {authUser} from "../store/actions/auth";
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
      
class Main extends Component {
  componentDidUpdate(){
    // console.log(Object.keys(this.props.currentUser).length);
  }
  render(){
    return (
      <div>
        <Route exact path="/" render={props=>{
            return(
              <Homepage currentUser={this.props.currentUser}/>
            )
          }
        }/>
        <Route exact path="/signin" render={props=>{
            return(
              <Homepage currentUser={this.props.currentUser}/>
            )
          }
        }/>
        <Route exact path="/signup" render ={props=>{
            return(
              <RegisterForm onAuth={this.props.doAuth} currentUser={this.props.currentUser} history={this.props.history}/>
            )
          }
        }/>
      </div>
    )
  }
};

function mapStateToProps(state){
  return{
    currentUser: state.user
  }
}
function mapDispatchToProps(dispatch){
  return{
    doAuth:  ()=> dispatch(authUser())
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

        // <Route exact path="/signin" render={props=>{
        //     return (<Homepage/>);
        // }}/>
        // <Route exact path="/signup" render={props =>{
        //   return(<Homepage/>);
        // }}/>