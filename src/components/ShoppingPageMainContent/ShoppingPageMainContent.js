import React, { Component } from 'react';
import {connect} from "react-redux";

import {doShopButtonAni,deactiShopBut} from '../../store/actions/animation';
import './ShoppingPageMainContent.css'
import Product1 from './product_1.png'
import Product2 from './product_2.png'
import Product3 from './product_3.PNG';
import Product4 from './product_4.PNG';
import Product5 from './product_5.PNG';
import Product6 from './product_6.PNG';

const product_lis = [
      {
        price: "20,000",
        details: "[대구백화점 1관] [시에로코스메틱]유니 어 데이",
        picture: Product1,
        id: 1
      },
      {
        price: "22,000",
        details: "[PUPA] 멀티플레이 트리플 퍼포즈 아이펜슬 5종",
        picture: Product2,
        id: 2
      },{
        price: "69,700",
        details:"[시세이도] 맨 토탈 리바이탈라이저 라이트 플루이드",
        picture: Product3,
        id: 3
      },
      {
        price: "48,770",
        details: "[비디비치](신세계강남점)[2월] 퍼펙트 브이 핏 쿠션 (정품 픽서 증정)",
        picture: Product4,
        id: 4
      },
      {
        price: "46,750",
        details: "[시세이도] 트렌스루센트 프레스드 파우더",
        picture: Product5,
        id: 5
      },
      {
        price:"25,500",
        details: "[시세이도] 맨 클렌징 폼",
        picture: Product6,
        id: 6
      }
    ];

class ShoppingPageMainContent extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      timeoutID: 0
    }
  }

  handleClick(e){
    let product = product_lis.filter((val, ind)=>{
      return val.id === parseInt(e.target.id);
    });
    this.props.onAdd(product[0]);
    this.props.onShopButAni();
    if(this.state.timeoutID === 0){
      let timeout = setTimeout(()=>{
        if(this.props.buttonActi){
          this.props.deactiButton();
        }
        this.setState(prevState=>({
          ...prevState,
          timeoutID: 0
        }))
      },2000);
      this.setState(prevState=>({
        ...prevState,
        timeoutID: timeout
      }));
    }else if(this.state.timeoutID){
      return null;
    }
  }

  render(){
    const product_lis = [
      {
        price: "20,000",
        details: "[대구백화점 1관] [시에로코스메틱]유니 어 데이",
        picture: Product1,
        id: 1
      },
      {
        price: "22,000",
        details: "[PUPA] 멀티플레이 트리플 퍼포즈 아이펜슬 5종",
        picture: Product2,
        id: 2
      },{
        price: "69,700",
        details:"[시세이도] 맨 토탈 리바이탈라이저 라이트 플루이드",
        picture: Product3,
        id: 3
      },
      {
        price: "48,770",
        details: "[비디비치](신세계강남점)[2월] 퍼펙트 브이 핏 쿠션 (정품 픽서 증정)",
        picture: Product4,
        id: 4
      },
      {
        price: "46,750",
        details: "[시세이도] 트렌스루센트 프레스드 파우더",
        picture: Product5,
        id: 5
      },
      {
        price:"25,500",
        details: "[시세이도] 맨 클렌징 폼",
        picture: Product6,
        id: 6
      }
    ].map((val,ind,arr)=>{
      
      let remainder_left = ind % 5;
      const placement_left = (remainder_left * 180) + (10 * remainder_left)

      let remainder_top = Math.floor(ind / 5);
      const placement_top = remainder_top * 423

      const topLeft = {
        top: placement_top + "px",
        left: placement_left + "px"
      }

      return(
        <li className="product_li" style={topLeft} key={ind} >
          <div className="product_div">
            <div className="product_thumbnail">
              <img src={val.picture} />
            </div>
            <div className="product_details">
              <div className="price_area">
                <div className="product_price">
                  <span className="product_price_span">
                  {val.price}
                  </span>
                  <span>원</span>
                </div>
              </div>
              <p className="product_description">{val.details}</p>
            </div>
            <a className="product_anchor" id={val.id} onClick={this.handleClick}></a>
          </div>
        </li>
      )
    })

    return(
      <div className="products_container">
        <ul className="products_ul">
          {product_lis}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    buttonActi: state.animation.shopping_button_acti
  }
}

function mapDispatchToProps(dispatch){
  return{
    // actiButton: (bool) => dispatch(actiShopBut(bool)),
    deactiButton: () => dispatch(deactiShopBut()),
    onShopButAni: ()=>dispatch(doShopButtonAni())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingPageMainContent);