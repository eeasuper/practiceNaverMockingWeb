import React, { useState } from 'react';
import {Link} from "react-router-dom";

import './LoginForm.css'

function LoginForm(props){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    let state = {
      username: username,
      password: password,
      stayLoggedIn: stayLoggedIn
    }
    props.onAuth("login", state).then((data)=>{
      props.history.push("/")
    }).catch(()=>{
      console.log("error caught in LoginForm.js")
      return;
    })
  }

  function handleFocus(e){
    e.target.parentElement.parentElement.classList.add("focus");
  }

  function handleBlur(e){
    e.target.parentElement.parentElement.classList.remove("focus");
  }

  return(
    <div>
      <div id="login_header">
        <h1>
          <Link className="sp h_logo"to="/"></Link>
        </h1>
      </div>
      <div id="login_container">
            <div id="login_content">
              <form onSubmit={handleSubmit}>
                <fieldset className="login_form">
                  <div id="id_area">
                    <div className="input_row">
                      <span className="input_box">
                        <label htmlFor="loginId" id="label_id_area" className="lbl" >아이디</label>
                        <input type="text" id="loginId" name="username" placeholder="아이디" className="int" maxLength="41" onChange={e => setUsername(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
                      </span>
                    </div>
                  </div>
                  <div id="pw_area">
                    <div className="input_row">
                      <span className="input_box">
                        <label htmlFor="pw" id="label_pw_area" className="lbl">비밀번호</label>
                        <input id="loginPw" name="password" type="password" placeholder="비밀번호" maxLength="16" className="int" onChange={e => setPassword(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
                      </span>
                    </div>
                  </div>
                  <input type="submit" title="로그인" alt="로그인" value="로그인" className="btn_global"></input>
                  <div className="check_info">
                    <div className="login_check">
                      <span className="login_check_box">
                        <input id="login_chk" className="" type="checkbox" name="nvlong" value="off" onChange={e=> setStayLoggedIn(e.target.value)}/>
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

export default LoginForm;