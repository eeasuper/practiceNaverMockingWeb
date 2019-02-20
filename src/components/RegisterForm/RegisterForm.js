import React, { Component } from 'react';
import {Link} from "react-router-dom";

import NaverBigIcon from './NaverBigIcon.PNG';
import './RegisterForm.css';
import {apiCall} from '../../services/api';

class RegisterForm extends Component{
  constructor(props){
    super(props);
    this.state={
      dirty:{
        username:false,
        password1:false,
        password2:false,
        name:false,
        email:false
      },
      valid:{
        username:null,
        name:null,
        email:null,
        password1:null,
        password2:null
      },
      username: "",
      name: "",
      email: "",
      password1:"",
      password2:"",
      timeoutID: 0,
      isCheckingUsername: null
    }
    this.path = "register";
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.validatePassword1 = this.validatePassword1.bind(this);
  }
  componentDidUpdate(){
    // console.log(this.state);
  }

  handleFocus(e){
    e.target.parentElement.classList.add("focus");
    let isDirty = this.state.dirty[e.target.name];
    let name = e.target.name;
    if(!isDirty){
      this.setState(prevState=>({
        dirty:{
          ...prevState.dirty,
          [name]: true
        }
      }))
    }
  }

  handleBlur(e){
    e.target.parentElement.classList.remove("focus");
    if(e.target.id === "password1"){
      this.validatePassword1(e.target);
    }else if(e.target.name==="username"){
      this.validateUsername(e.target);
    }else if(e.target.name ==="name"){
      this.validateName(e.target);
    }else if(e.target.name==="email"){
      this.validateEmail(e.target);
    }else if(e.target.id === "password2"){
      this.validatePassword2(e.target);
    }
  }

  handleChange(e){
    if(e.target.id === "password2" || e.target.id === "password1"){
      this.setState({
        [e.target.id]: e.target.value
      })          
    }else{
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    if(e.target.id === "username"){
      this.setState(prevState=>({
        ...prevState,
        isCheckingUsername: null
      }))
    }
  }

  handleSubmit(e){
    e.preventDefault();
    let {username, name, email, password} = this.state;
    let state = {
      username: username,
      name: name,
      email: email,
      password: password
    }
    this.props.onAuth("register", state).then((data)=>{
      this.props.history.push("/");
    }).catch(()=>{
      console.log("error caught in RegisterForm.js");
      return;
    });
  }

  setStateForValidity(target, name="",validity=false){
    let isSecondParamExist = !!name.length;
    if(!isSecondParamExist){
      name = target.name;
    }

    this.setState(prevState=>({
      ...prevState,
      [name]:target.value,
      valid:{
        ...prevState.valid,
        [name]:validity
      }
    }))
  }

  validateName(target){
    if(target.value !== ""){
     this.setStateForValidity(target,"",true);
    }
  }

  validateUsername(target){
    //-----NOTE: do backend connection here.Check if there is already a user with the same username as target.value existing in database.
    //---Timeout is for debouncing:
    let valid = false;
    if(this.state.timeoutID === 0){
      let timeout = setTimeout(()=>{
        //do api call here.
        //for backend: https://stackoverflow.com/questions/30895286/spring-mvc-how-to-return-simple-string-as-json-in-rest-controller
        apiCall("get","localhost:8080/users/"+target.value, {}).then((data)=>{
          //not sure what data will give.
          console.log("RegisterForm.js validateUesrname:")
          console.log(data);
          if(data=== [true]){
            valid = true;
          }
          else if(data === [false]){
            valid = false;
          }
        }).catch(()=>{
          console.log("error caught in RegisterForm.js validateUsername");
          return;
        });
        this.setState(prevState=>({
          ...prevState,
          timeoutID: 0,
          isCheckingUsername: false
        }))
      },2000);
      this.setState(prevState=>({
        ...prevState,
        timeoutID: timeout,
        isCheckingUsername: true
      }));
    }else if(this.state.timeoutID){
      clearTimeout(this.state.timeoutID);
      //   this.setState(prevState=>({
      //   ...prevState,
      //   isCheckingUsername: false
      // }));
      return null;
    }
    //-----NOTE: check if the below code is working properly...
    let isEmpty = !!(target.value === "");
    if(valid && !isEmpty){
      this.setStateForValidity(target, "", true)
    }else if(!valid && !isEmpty){
      this.setStateForValidity(target,"",false);
    }else{
      this.setStateForValidity(target,"",false);
    }
  }

  validateEmail(target){
    let isEmailRegex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isMatch = target.value.match(isEmailRegex);
    if(isMatch){
      this.setStateForValidity(target,"",true);
    }else{
      this.setStateForValidity(target,"",false);
    }
  }

  validatePassword1(target){
    //-----NOTE:improve regex when I have time.
    let canUsePassRegex = /[a-zA-Z0-9\W]{8,16}/g;
    let isMatch = target.value.match(canUsePassRegex);
    console.log(isMatch);
    if(isMatch){
      console.log("password matched")
      this.setStateForValidity(target,"password1",true);
      return true;
    }else{
      console.log("password not matched")
      this.setStateForValidity(target,"password1",false);
      return false;
    }
  }

  validatePassword2(target){
    let isMatch = !!(target.value === this.state.password1);
    console.log(isMatch);
    if(isMatch){
      this.setStateForValidity(target, "password2", true)
    }else{
      this.setStateForValidity(target, "password2", false)
    }
  }

  render(){
    const {email, username, name, password1, password2, timeoutID, isCheckingUsername, dirty, valid} = this.state;
    //-----NOTE: In product stage:when user clicks register without writing anything, make all columns in state dirty! (handle this in handleSubmit
    return(
      <div>
        <div id="register_header">
          <h1>
            <Link id="register_logo" to="/">
              <img src={NaverBigIcon} alt="Register Header"/>
            </Link>
          </h1>
        </div>
        <form id="register_form" onSubmit={this.handleSubmit}>
          <div id="form_container">
            <div id="register_content">
              <div id="join_content">
                <div className="row_group">
                  <div className="register_row">
                    <h3 className="register_title"><label>아이디</label></h3>
                    <span className="form_box" id="username_span">
                      <input id="username" className="register_input" type="text" name="username" title="Username" maxLength="20" value={username} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}/>
                      <span className="step_url">@naver.com</span>
                    </span>
                    {dirty.username && !valid.username && username === "" && <span id="" className="error_box">필수 정보입니다.</span>}
                    {dirty.username && valid.username && username !== ""  && timeoutID === 0 && <span className="error_box green">멋진 아이디네요!</span>}
                    {dirty.username && !valid.username && username !== "" && isCheckingUsername === true && <span id="" className="error_box green">확인중...</span>}
                    {dirty.username && !valid.username && username !== "" && timeoutID === 0 && isCheckingUsername === false && <span id="" className="error_box">이미 사용중인 아이디입니다.</span>}
                  </div>
                  <div className="register_row">
                    <h3 className="register_title"><label>비밀번호</label></h3>
                    <span className="form_box" id="pswd1_span">
                      <input id="password1" className="register_input" type="password" name="password1" title="Input password" maxLength="20" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}/>
                      <span className="lock_icon"><span></span></span>
                    </span>
                    {dirty.password1 && !valid.password1 && password1 === "" && <span id="" className="error_box">필수 정보입니다.</span>}
                    {dirty.password1 && !valid.password1 && password1 !== "" && <span className="error_box">8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>}
                    <h3 className="register_title"><label>비밀번호 재확인</label></h3>
                    <span className="form_box" id="pswd2_span">
                      <input id="password2" className="register_input" type="password" name="password2" title="Confirm password" maxLength="20" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}/>
                      <span className="lock_icon"><span></span></span>
                    </span>
                    {dirty.password2 && !valid.password2 && <span id="" className="error_box">필수 정보입니다.</span>}
                  </div>
                  <div className="register_row">
                    <h3 className="register_title"><label>이름</label></h3>
                    <span className="form_box" id="name_span">
                      <input className="register_input" type="text" name="name" title="Name" maxLength="20" placeholder="Full Name" value={name} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}/>
                    </span>
                    {dirty.name && !valid.name && name === "" && <span id="" className="error_box">필수 정보입니다.</span>}
                  </div>
                  <div className="register_row">
                    <h3 className="register_title"><label>본인 확인 이메일</label></h3>
                    <span className="form_box" id="email_span">
                      <input className="register_input" type="text" name="email" title="Email" maxLength="20" placeholder="Email" value={email} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}/>
                    </span>
                    {dirty.email && !valid.email && email === "" && <span id="" className="error_box">필수 정보입니다.</span>}
                    {dirty.email && !valid.email && email !== "" && <span id="" className="error_box">이메일 주소를 다시 확인해주세요..</span>}
                  </div>
                </div>
                <div className="btn_area">
                  <button id="register_button" className="btn_type btn_primary" type="submit"><span>회원가입</span></button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterForm;