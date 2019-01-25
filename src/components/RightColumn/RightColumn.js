import React, { Component } from 'react';
import {Link} from "react-router-dom";

import './RightColumn.css';
import LoginBar from './LoginBar.PNG'

class RightColumn extends Component{
  render(){
    return(
      <div  id="homepage_container">
        <div id="column_right">
          <div id="account">
            <h2 class="blind">로그인</h2>
            <div id="login_con">
              <p id="login_intro">네이버를 더 안전하고 편리하게 이용하세요.</p>
              <Link id="login_button" to="/">
                <img src={LoginBar}/>
              </Link>
              <div id="login_links">
                <span id="login_links_find">
                  <Link id="login_link_register" to="/signup">회원가입</Link>
                  <Link class="login_find_text" to="/signin">아이디</Link>
                  ·
                  <Link class="login_find_text" to="/">비밀번호 찾기</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default RightColumn;

// 아이디·비밀번호 찾기