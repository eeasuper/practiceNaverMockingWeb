import React, { Component } from 'react';
import './LeftColumn.css'

class LeftColumn extends Component {

  render(){
    return(
      <div className="left_container">
        <div className="info_box">
          <div className="info_innerbox">
            <h3>안녕하세요. 로그인/회원가입부터 시작해주세요 --></h3>
          </div>
        </div>
        <div className="info_box2">
          <div className="info_innerbox2">
            <p>
              로그인할 경우:
                <br/>
                <br/>
              &nbsp; &nbsp; &nbsp;로그인할 ID:  username
                <br/>
              &nbsp; &nbsp; &nbsp;로그인할 암호:  password
                <br/>


            </p>
          </div>
        </div>
      </div>
    )
  }
}
/*
                <br/>
              로그인/회원가입 성공 후:
                <br/>
              &nbsp; &nbsp; &nbsp;쇼핑으로 이동해주세요.
                <br/>
              &nbsp; &nbsp; &nbsp;쇼핑페이지에 도착한 후에 아무 상품을 클릭해주세요.
*/
export default LeftColumn;