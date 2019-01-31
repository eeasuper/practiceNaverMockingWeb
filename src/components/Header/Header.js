import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './Header.css'

import Logo from './naver_icon.PNG'

class Header extends Component{
  render(){
    const main_ul = ["메일","카페","블로그","지식iN","쇼핑", "Pay", "TV"].map((val, ind)=>{
      return (
        <li className="nav_main_li" key={ind}>
          <Link className="nav_main_anc" to="/">
            <span>{val}</span>
          </Link>
        </li>
      )
    })

    const second_ul = ["사전", "뉴스","증권","부동산", "지도", 
      "영화", "뮤직", "책", "웹튠"].map((val, ind)=>{
        return (
          <li className="nav_second_li" key={ind}>
            <Link className="nav_second_anc" to="/">
              <span>{val}</span>
            </Link>
          </li>
      )
    })

    return (
      <div id="headerCon" >
        <div id="header_bannerCon">
          <div id="header_banner">
            <h1 id="header_logo">
              <Link to="/" className="">
                <img src={Logo} id="header_icon" alt="Header"/> 
              </Link>
            </h1>
            <div id="header_links">
              <a className="header_link" href="/">
                네이버를 시작페이지로 
              </a>
              <a className="header_link" href="/">
                쥬니어네이버
              </a>
              <a className="header_link" href="/">
                해피빈
              </a>
            </div>
            <div id="header_search">
              <form id="header_form" action="" method="get">
                <fieldset>
                  <legend className="blind">검색</legend>
                  <span id="green_window">
                    <input id="query" maxLength="255" autoComplete="off" title="검색어 입력" tabIndex="1"/>
                  </span>
                  <button id="header_submit_button" type="submit" title="검색" disabled tabIndex="3">
                    <span id="header_submit_icon"></span>
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <nav id="header_navbarCon">
          <div id="header_navbar">
            <ul id="nav_main_ul">
              {main_ul}
            </ul>
            <ul id="nav_second_ul">
              {second_ul}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header;