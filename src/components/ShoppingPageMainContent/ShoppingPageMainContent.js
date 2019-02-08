import React, { Component } from 'react';

import './ShoppingPageMainContent.css'
import Product1 from './product_1.png'
import Product2 from './product_2.png'
import Product3 from './product_3.PNG';
import Product4 from './product_4.PNG';
import Product5 from './product_5.PNG';
import Product6 from './product_6.PNG';

class ShoppingPageMainContent extends Component{



  render(){
    const product_lis = [
      {
        price: "20,000",
        details: "[대구백화점 1관] [시에로코스메틱]유니 어 데이",
        picture: Product1
      },
      {
        price: "22,000",
        details: "[PUPA] 멀티플레이 트리플 퍼포즈 아이펜슬 5종",
        picture: Product2
      },{
        price: "69,700",
        details:"[시세이도] 맨 토탈 리바이탈라이저 라이트 플루이드",
        picture: Product3
      },
      {
        price: "48,770",
        details: "[비디비치](신세계강남점)[2월] 퍼펙트 브이 핏 쿠션 (정품 픽서 증정)",
        picture: Product4
      },
      {
        price: "46,750",
        details: "[시세이도] 트렌스루센트 프레스드 파우더",
        picture: Product5
      },
      {
        price:"25,500",
        details: "[시세이도] 맨 클렌징 폼",
        picture: Product6
      }
    ].map((val,ind,arr)=>{
      //423px * remainder
      
      let remainder_left = ind % 5;
      const placement_left = remainder_left !== 0 ? (remainder_left * 180) + (10 * remainder_left): 0;

      let remainder_top = Math.floor(ind / 5); //if length is 6, returns 1.
      const placement_top = remainder_top !== 0 ? (remainder_top * 423) : 0;

      const topLeft = {
        top: placement_top + "px",
        left: placement_left + "px"
      }

      return(
        <li className="product_li" style={topLeft}>
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
            <a className="product_anchor"></a>
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

export default ShoppingPageMainContent;