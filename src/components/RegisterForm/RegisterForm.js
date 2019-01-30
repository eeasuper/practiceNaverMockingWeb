import React, { Component } from 'react';
import {Link} from "react-router-dom";

import NaverBigIcon from './NaverBigIcon.PNG';
import './RegisterForm.css';
import {authUser}from '../../store/actions/auth';


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
        password1:null,
        password2:null,
        name:null,
        email:null
      },
      username: "",
      password: "",
      name: "",
      email: ""
    }

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.testClick = this.testClick.bind(this);
  }
  componentDidUpdate(){
    // console.log(this.state);
  }

  handleFocus(e){
    e.target.parentElement.classList.add("focus");
    let isClean = this.state.dirty[e.target.name];
    let name = e.target.name;
    if(!isClean){
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
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
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
    console.log(state);
    this.props.onAuth("register", state)().then(()=>{
      this.props.history.push("/");
    }).catch(()=>{
      console.log("error");
      return;
    })
  }

  testclick(e){
    this.props.onAuth("test", state)().then(()=>{
      this.props.history.push("/");
    }).catch(()=>{
      console.log("error");
      return;
    })
  }

  render(){
    const {email, username, name} = this.state;
    //why is password missing in c9 example?

    return(
      <div>
        <div id="register_header">
          <h1>
            <Link id="register_logo" to="/">
              <img src={NaverBigIcon}/>
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
                      <input className="register_input" type="text" name="username" title="Username" maxLength="20" value={username} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}/>
                      <span className="step_url">@naver.com</span>
                    </span>
                    {this.state.dirty.username && !this.state.valid.username && <span id="" className="error_box">필수 정보입니다.</span>}
                  </div>
                  <div className="register_row">
                    <h3 className="register_title"><label>비밀번호</label></h3>
                    <span className="form_box" id="pswd1_span">
                      <input id="pswd1" className="register_input" type="password" name="password" title="Input password" maxLength="20" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}/>
                      <span className="lock_icon"><span></span></span>
                    </span>
                    {this.state.dirty.password1 && !this.state.valid.password1 && <span id="" class="error_box">필수 정보입니다.</span>}
                    <h3 className="register_title"><label>비밀번호 재확인</label></h3>
                    <span className="form_box" id="pswd2_span">
                      <input id="pswd2" className="register_input" type="password" title="Confirm password" maxLength="20" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}/>
                      <span className="lock_icon"><span></span></span>
                    </span>
                    {this.state.dirty.password2 && !this.state.valid.password2 && <span id="" className="error_box">필수 정보입니다.</span>}
                  </div>
                  <div className="register_row">
                    <h3 className="register_title"><label>이름</label></h3>
                    <span className="form_box" id="name_span">
                      <input className="register_input" type="text" name="name" title="Name" maxLength="20" placeholder="Full Name" value={name} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}/>
                    </span>
                    {this.state.dirty.name && !this.state.valid.name && <span id="" className="error_box">필수 정보입니다.</span>}
                  </div>
                  <div className="register_row">
                    <h3 className="register_title"><label>본인 확인 이메일</label></h3>
                    <span className="form_box" id="email_span">
                      <input className="register_input" type="text" name="email" title="Email" maxLength="20" placeholder="Email" value={email} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}/>
                    </span>
                    {this.state.dirty.email && !this.state.valid.email && <span id="" className="error_box">필수 정보입니다.</span>}
                  </div>
                </div>
                <div class="btn_area">
                  <button id="register_button" className="btn_type btn_primary" type="submit"><span>Sign Up</span></button>
                </div>
              </div>
              <div class="btn_area">
                <button id="testtt" className="btn_type btn_primary" onClick={this.testClick}>CLICK TO TEST GET</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterForm;