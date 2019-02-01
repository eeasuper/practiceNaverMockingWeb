import React, { Component, Fragment} from 'react';
import {Link} from "react-router-dom";
// import { CSSTransition,TransitionGroup} from 'react-transition-group';
import { CSSTransition,transit } from "react-css-transition";
import ProfileIcon from './profile_icon.PNG';
import './LoginBox.css'
import classes from './csstransitions.css'
import pageMiddleClasses from './pageMiddleTransitions.css'
//CSS-transition doc
//https://wikiwi.github.io/react-css-transition/
CSSTransition.childContextTypes = {
    // this can be empty
}

class LoginBox extends Component{
  constructor(props){
    super(props);
    this.pageRight = React.createRef();
    this.pageMiddle = React.createRef();
    this.pageLeft = React.createRef();
    this.shiftServicePage = this.shiftServicePage.bind(this);
    this.state= {
      currentServicePage: 0,
      servicePages:{
        pageRight: true,
        pageMiddle: false,
        pageLeft:false,
        pageMiddle2: false
      }
    }
    this.servicePageKeys=Object.keys(this.state.servicePages);
  }

  shiftServicePage(e){
    switch(this.state.currentServicePage){
      case(0):
        this.setState(prevState=>({
          currentServicePage: 1,
          servicePages:{
            ...prevState.servicePages,
            pageRight: false,
            pageMiddle:true
          }
        }))
        break;
      case(1):
        this.setState(prevState=>({
          currentServicePage: 2,
          servicePages:{
            ...prevState.servicePages,
            pageMiddle: false,
            pageLeft:true
          }
        }))
        break;
      case(2):
        this.setState(prevState=>({
          currentServicePage: 3,
          servicePages:{
            ...prevState.servicePages,
            pageLeft: false,
            pageMiddle2:true
          }
        }))
        break;
      case(3):
        this.setState(prevState=>({
          currentServicePage: 0,
          servicePages:{
            ...prevState.servicePages,
            pageMiddle2: false,
            pageRight:true
          }
        }))
        break;
      default:
        this.setState(prevState=>({
          currentServicePage: 0,
          servicePages:{
            pageRight: true,
            pageMiddle: false,
            pageLeft: false,
            pageMiddle2: false
          }
        }))
    }
  }


  componentDidUpdate(){
    console.log(this.state);

  }

  render(){
    const page_right_lis = ["알림", "MY구독", "메일","카페","블로그", "페이"].map((val,ind)=>{
      return(
        <li key={ind} className="service_lis">
          <Link className="tab_noti" to="/">
            <i>{val}</i>
          </Link>
        </li>
      )
    })

    const page_middle_lis = ["포스트", "클라우드","오피스","캘린더", "해피빈"].map((val,ind)=>{
      return(
        <li key={ind} className="service_lis">
          <Link className="tab_noti" to="/">
            <i>{val}</i>
          </Link>
        </li>
      )
    })

    const page_left_lis = ["지식iN","메모"].map((val,ind)=>{
      return(
        <li key={ind} className="service_lis">
          <Link className="tab_noti" to="/">
            <i>{val}</i>
          </Link>
        </li>
      )
    })

    const {pageLeft,pageRight,pageMiddle,pageMiddle2,pageRight2} = this.state.servicePages;
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
          <div id="slide_cover">
            <div id="service_tab_list">
              <CSSTransition active={pageRight}
                defaultStyle={{transform: "translate(-100%)"}}
                enterStyle={{transform: transit("translateX(0%)",300,"ease-in-out")}}
                activeStyle={{transform: "translateX(0%)"}}
                leaveStyle={{transform: transit("translateX(-100%)",300,"ease-in-out")}}
                className="ulCon"
              >
                <ul id="page_right" ref={this.pageRight}>
                  {page_right_lis}
                </ul>
              </CSSTransition>
              <CSSTransition active={pageMiddle}
                defaultStyle={{transform: "translateX(0%)"}}
                enterStyle={{transform: transit("translateX(-100%)",300,"ease-in-out")}}
                activeStyle={{transform: "translateX(-100%)"}}
                leaveStyle={{transform: transit("translateX(-200%)",300,"ease-in-out")}}
                className="ulCon"
              >
                <ul className="page_middle" ref={this.pageMiddle}>
                  {page_middle_lis}
                </ul>
              </CSSTransition>
              <CSSTransition active={pageLeft}
                defaultStyle={{transform: "translateX(-100%)"}}
                enterStyle={{transform: transit("translateX(-200%)",300,"ease-in-out")}}
                activeStyle={{transform: "translateX(-200%)"}}
                leaveStyle={{transform: transit("translateX(-100%)",300,"ease-in-out")}}
                className="ulCon"
              >
                <ul id="page_left" ref={this.pageLeft}>
                    {page_left_lis}
                </ul>
              </CSSTransition>
              <CSSTransition active={pageMiddle2}
                defaultStyle={{transform: "translateX(-400%)"}}
                enterStyle={{transform: transit("translateX(-300%)",300,"ease-in-out")}}
                activeStyle={{transform: "translateX(-300%)"}}
                leaveStyle={{transform: transit("translateX(-200%)",300,"ease-in-out")}}
                className="ulCon"
              >
                <ul className="page_middle" ref={this.pageMiddle}>
                  {page_middle_lis}
                </ul>
              </CSSTransition>
            </div>
          </div>
            <span className="slide_btn">
              <div className="btn_text" onClick={this.shiftServicePage}>
                <i>다음판 보기</i>
              </div>
            </span>
        </div>
      </Fragment>
    )
  }
}

export default LoginBox;