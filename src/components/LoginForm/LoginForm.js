import React, { Component } from 'react';
import {Link} from "react-router-dom";
// import {connect} from "react-redux";
// import {authUser} from "../../store/actions/auth";
import './LoginForm.css'

// function LoginForm(props){
  class LoginForm extends Component{
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [stayLoggedIn, setStayLoggedIn] = useState(false);

  // function handleSubmit(e){
    constructor(props){
      super(props);
      this.state={
        username: "",
        password: "",
        stayLoggedIn: false
      }
      this.handleBlur = this.handleBlur.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
    e.preventDefault();
    let state = {
      username: this.state.username,
      password: this.state.password,
      stayLoggedIn: this.state.stayLoggedIn
    }
    this.props.onAuth("login", state, "get").then((data)=>{
      this.props.history.push("/")
    }).catch(()=>{
      console.log("error caught in LoginForm.js")
      return;
    })
  }

  handleFocus(e){
    e.target.parentElement.parentElement.classList.add("focus");
  }

  handleBlur(e){
    e.target.parentElement.parentElement.classList.remove("focus");
  }
  render(){
  return(
    <div>
      <div id="login_header">
        <h1>
          <Link className="sp h_logo"to="/"></Link>
        </h1>
      </div>
      <div id="login_container">
            <div id="login_content">
              <form onSubmit={this.handleSubmit}>
                <fieldset className="login_form">
                  <div id="id_area">
                    <div className="input_row">
                      <span className="input_box">
                        <label htmlFor="loginId" id="label_id_area" className="lbl" >아이디</label>
                        <input type="text" id="loginId" name="username" placeholder="아이디" className="int" maxLength="41" onChange={e => {
                          e.persist();
                          let val = e.target.value;
                          this.setState(prevState=>({...prevState,username:val}))
                        }
                      } onFocus={this.handleFocus} onBlur={this.handleBlur}/>
                      </span>
                    </div>
                  </div>
                  <div id="pw_area">
                    <div className="input_row">
                      <span className="input_box">
                        <label htmlFor="pw" id="label_pw_area" className="lbl">비밀번호</label>
                        <input id="loginPw" name="password" type="password" placeholder="비밀번호" maxLength="16" className="int" onChange={e => {
                          e.persist();
                          let val = e.target.value;
                          this.setState(prevState=>({...prevState,password:val}))
                          }
                        } onFocus={this.handleFocus} onBlur={this.handleBlur}/>
                      </span>
                    </div>
                  </div>
                  <input type="submit" title="로그인" alt="로그인" value="로그인" className="btn_global"></input>
                  <div className="check_info">
                    <div className="login_check">
                      <span className="login_check_box">
                        <input id="login_chk" className="" type="checkbox" name="nvlong" value="off" onChange={e=> this.setState(prevState=>({...prevState,stayLoggedIn:e.target.value}))}/>
                        <label htmlFor="login_chk" id="label_login_chk">로그인 상태 유지</label>
                      </span>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
    </div>
  )
  }
}

export default LoginForm;