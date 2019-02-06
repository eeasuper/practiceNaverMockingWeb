import React, {Fragment, Component} from 'react';
import Flipping from 'flipping';
import {Link} from "react-router-dom";

import './UserTabs.css'
//https://css-tricks.com/robust-react-user-interfaces-with-finite-state-machines/
//https://css-tricks.com/animating-layouts-with-the-flip-technique/
const tabsMachine = {
  first: {
    RIGHT: 'second'
  },
  second:{
    RIGHT: 'third',
    LEFT: 'first'
  },
  third: {
    LEFT: 'second'
  }
}

class UserTabs extends Component{
  constructor(props){
    super(props);
    this.state= {
      tab: 'first'
    }

    this.handleClick = this.handleClick.bind(this);
  }

  //-----NOTE:when extra code has to be executed when doing transition, uncomment command()
  // command(nextState, action){
  //   switch(nextState){
  //     case 'first':
  //       break;
  //     case 'second':
  //       break;
  //     case 'third':
  //       break;
  //     default:
  //       break;
  //   }
  // }

  transition(action){
    const currentTabState = this.state.tab;
    const nextTabState = tabsMachine[currentTabState][action.type];

    if(nextTabState){
      //-----NOTE:when extra code has to be executed when doing transition, uncomment command() and the line below:
      // const nextState = this.command(nextTabState, action);

      this.setState(prevState =>({
        ...prevState,
        tab: nextTabState,
        tabPage: this.props.changedTab
      }));
    }
  }

  handleClick(e){
    let direction = e.target.dataset.direction;
    this.transition({type: direction});
  }

  componentDidMount(){
    this.flipping = new Flipping({
    })

    this.flipping.read();
  }

  componentWillUpdate(){
    this.flipping.read();

  }

  componentDidUpdate(){
    this.flipping.flip();
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
        <li key={ind} className="service_lis service_middle">
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

    const tabState = this.state.tab;
    const direction = this.props.direction;
    return(
      <Fragment>
        <div id="slide_cover">
          <div id="service_tab_list">
            <ul id="page_right" className="service_uls" data-state={tabState}>
              {page_right_lis}
            </ul>
            <ul id="page_middle" className="service_uls"  data-state={tabState} data-direction={direction}>
              {page_middle_lis}
            </ul>
            <ul id="page_left" className="service_uls" data-state={tabState}>
              {page_left_lis}
              <li className="service_lis">
                <Link className="tab_noti tab_add_setting" to="/">
                  <i>자주 사용하는 메뉴</i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <span className="slide_btn">
          {(this.state.tab === "second" || this.state.tab === "third") &&
            <div className="btn_prev_tab" onClick= {this.handleClick} data-direction="LEFT">
              <i data-direction="LEFT">이전판 보기</i>
            </div>
          }
          {(this.state.tab === "first" || this.state.tab==="second") &&
            <div className="btn_next_tab" onClick= {this.handleClick} data-direction="RIGHT">
              <i data-direction="RIGHT">다음판 보기</i>
            </div>
          }
        </span>
      </Fragment>
    )
  }
}

export default UserTabs