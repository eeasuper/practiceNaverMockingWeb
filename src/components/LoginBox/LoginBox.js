import React, { Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

// import { CSSTransition,TransitionGroup} from 'react-transition-group';
import { CSSTransition,transit } from "react-css-transition";
import ProfileIcon from './profile_icon.PNG';
import './LoginBox.css'
import {logout} from "../../store/actions/auth";
import UserTabs from '../UserTabs/UserTabs';

//CSS-transition doc
//https://wikiwi.github.io/react-css-transition/
//Next Time, NEVER use CSS-transitions!

class LoginBox extends Component{
  constructor(props){
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.state= {
    }

  }


  doLogout(e){
    this.props.doLogout();
  }

  componentDidUpdate(){  

  }

  render(){

    let test = 0;
    
    let {currentUser} = this.props;
    return(
      <Fragment>
        <div id="user_area">
          <div id="user_info">
            <img src={ProfileIcon} alt="Profile Icon" id="user_thumbnail"></img>
            <div id="info_title">
              <span id="info_username">
                <strong>{currentUser.user.username}</strong>
                님
              </span>
              <span id="link_myinfo">내정보</span>
              <span id="info_lock"></span>
            </div>
            <div id="info_services">
              <button id="btn_logout" onClick={this.doLogout}><span id="btn_inr">로그아웃</span></button>
              <span className="link_cover">
                <span id="link_mail">
                  <i>메일</i>
                  <span className="cnt">10</span>
                </span>
              </span>
              <span className="link_cover">
                <span id="link_note">
                  <i>쪽지</i>
                  <span className="cnt">1</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div id="service_tab">
          <UserTabs />
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state){
  return{
    currentUser: state.currentUser
  }
}
function mapDispatchToProps(dispatch){
  return{
    doLogout: ()=> dispatch(logout())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginBox);

/*
              <CSSTransition active={pageRight}
                defaultStyle={{transform: "translate(-100%)"}}
                enterStyle={{transform: transit("translateX("+{test}+"%)",300,"ease-in-out")}}
                activeStyle={{transform: "translateX(0%)"}}
                leaveStyle={{transform: transit("translateX(-100%)",300,"ease-in-out")}}
                className="ulCon"
              >
                <ul id="page_right" className="service_uls" ref={this.pageRight}>
                  {page_right_lis}
                </ul>
              </CSSTransition>
              <CSSTransition active={pageMiddle && !this.state.pageMiddleBack}
                defaultStyle={{transform: "translateX(100%)"}}
                enterStyle={{transform: transit("translateX(0%)",300,"ease-in-out")}}
                activeStyle={{transform: "translateX(0%)"}}
                leaveStyle={{transform: transit("translateX(-100%)",300,"ease-in-out")}}
                className="ulCon"
              >
                <ul className="page_middle" className="service_uls" ref={this.pageMiddle}>
                  {page_middle_lis}
                </ul>
              </CSSTransition>
              <CSSTransition active={pageLeft}
                defaultStyle={{transform: "translateX(100%)"}}
                enterStyle={{transform: transit("translateX(0%)",300,"ease-in-out")}}
                activeStyle={{transform: "translateX(0%)"}}
                leaveStyle={{transform: transit("translateX(100%)",300,"ease-in-out")}}
                className="ulCon"
              >
                <ul id="page_left" className="service_uls" ref={this.pageLeft}>
                    {page_left_lis}
                    <li className="service_lis">
                      <Link className="tab_noti tab_add_setting" to="/">
                        <i>자주 사용하는 메뉴</i>
                      </Link>
                    </li>
                </ul>
              </CSSTransition>
              <CSSTransition active={pageMiddle2}
                defaultStyle={{transform: "translateX(-100%)"}}
                enterStyle={{transform: transit("translateX(0%)",300,"ease-in-out")}}
                activeStyle={{transform: "translateX(0%)"}}
                leaveStyle={{transform: transit("translateX(100%)",300,"ease-in-out")}}
                className="ulCon"
              >
                <ul className="page_middle service_uls" ref={this.pageMiddle}>
                  {page_middle_lis}
                </ul>
              </CSSTransition>
              <CSSTransition active={this.state.pageMiddleBack}
                defaultStyle={{transform: "translateX(100%)"}}
                enterStyle={{transform: transit("translateX(0%)",300,"ease-in-out")}}
                activeStyle={{transform: "translateX(0%)"}}
                leaveStyle={{transform: transit("translateX(100%)",300,"ease-in-out")}}
                className="ulCon"
              >
                {(this.state.pageMiddleBack || pageRight || pageLeft) &&
                  <ul className="page_middle service_uls">
                  {page_middle_lis}
                </ul>
                }
              </CSSTransition>
              <CSSTransition active={this.state.pageMiddleBack2}
                defaultStyle={{transform: "translateX(-100%)"}}
                enterStyle={{transform: transit("translateX(0%)",300,"ease-in-out")}}
                activeStyle={{transform: "translateX(0%)"}}
                leaveStyle={{transform: transit("translateX(100%)",300,"ease-in-out")}}
                className="ulCon"
              >
                {(this.state.pageMiddleBack2 || pageLeft || pageRight) &&
                  <ul className="page_middle service_uls">
                  {page_middle_lis}
                </ul>
                }
              </CSSTransition>
*/


//   shiftServicePage(e){
//     switch(this.state.currentServicePage){
//       case(0):
//         this.setState(prevState=>({
//           direction: 'right',
//           currentServicePage: 1,
//           tabsChanged: true,
//           servicePages:{
//             ...prevState.servicePages,
//             pageRight: false,
//             pageMiddle:true
//           },
//           pageMiddleBack: true
//         }))
//         break;
//       case(1):
//         this.setState(prevState=>({
//           direction: 'right',
//           currentServicePage: 2,
//           tabsChanged: true,
//           servicePages:{
//             ...prevState.servicePages,
//             pageMiddle: false,
//             pageLeft:true
//           },
//           pageMiddleBack: false,
//           pageMiddleBack2: false
//         }))
//         break;
//       case(2):
//         this.setState(prevState=>({
//           currentServicePage: 3,
//           servicePages:{
//             ...prevState.servicePages,
//             pageLeft: false,
//             // pageMiddle2:true
//           }
//         }))
//         break;
//       case(3):
//         this.setState(prevState=>({
//           currentServicePage: 2,
//           servicePages:{
//             ...prevState.servicePages,
//             pageMiddle2: false,
//             pageLeft:true
//           },
//           pageMiddleBack2: false
//         }))
//         break;
//       default:
//         this.setState(prevState=>({
//           currentServicePage: 0,
//           servicePages:{
//             pageRight: true,
//             pageMiddle: false,
//             pageLeft: false,
//             pageMiddle2: false
//           },
//           middleGoingBack: false
//         }))
//     }
//   }
// //https://css-tricks.com/animating-layouts-with-the-flip-technique/

//   shiftServicePageBack(e){
//     switch(this.state.currentServicePage){
//       case(1):
//         this.setState(prevState=>({
//           direction: 'left',
//           currentServicePage: 0,
//           tabsChanged: true,
//           servicePages:{
//             ...prevState.servicePages,
//             pageMiddle: false,
//             pageRight:true
//           },
//           pageMiddleBack: false
//         }))
//         break;
//       case(2):
//         this.setState(prevState=>({
//           direction: 'left',
//           currentServicePage: 1,
//           tabsChanged: true,
//           servicePages:{
//             ...prevState.servicePages,
//             pageLeft: false,
//             pageMiddle2:true
//           },
//           pageMiddleBack2: true
//         }))
//         break;
//       case(3):
//         this.setState(prevState=>({
//           currentServicePage: 0,
//           servicePages:{
//             ...prevState.servicePages,
//             pageMiddle2: false,
//             pageRight:true
//           },
//           pageMiddleBack: false
//         }))
//         break;
//       default:
//         this.setState(prevState=>({
//           currentServicePage: 0,
//           servicePages:{
//             pageRight: true,
//             pageMiddle: false,
//             pageLeft: false,
//             pageMiddle2: false
//           }
//         }))
//     }
//   }