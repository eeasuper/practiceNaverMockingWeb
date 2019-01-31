import React, { Component, Fragment} from 'react';
import ProfileIcon from './profile_icon.PNG';
import './LoginBox.css'

class LoginBox extends Component{

  render(){
    let {currentUser} = this.props;
    return(
      <Fragment>
        <div id="user_area">
          <div id="user_info">
            <img src={ProfileIcon} alt="Profile Icon" id="user_thumbnail"></img>
            <div id="info_title">
              <span id="info_username">
                <strong>{currentUser.username}</strong>
                님
              </span>
              <span id="link_myinfo">내정보</span>
              <span id="info_lock"></span>
            </div>
            <div id="info_services">
              <button id="btn_logout"><span id="btn_inr">로그아웃</span></button>
              <span className="link_cover">
                <span id="link_mail">
                  <i>메일</i>
                  <span class="cnt">10</span>
                </span>
              </span>
              <span className="link_cover">
                <span id="link_note">
                  <i>쪽지</i>
                  <span class="cnt">1</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div id="service_tab">

        </div>
      </Fragment>
    )
  }
}

export default LoginBox;