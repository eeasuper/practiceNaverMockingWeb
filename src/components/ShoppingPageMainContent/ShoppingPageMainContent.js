import React, { Component } from 'react';
import {connect} from "react-redux";

import {doShopButtonAni,deactiShopBut} from '../../store/actions/animation';
import './ShoppingPageMainContent.css'

import {productArray} from '../../resources/products/Products';

class ShoppingPageMainContent extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      timeoutID: 0
    }
  }

  handleClick(e){
    // let product = Object.create(productArray.filter((val, ind)=>{
    //   return val.id === parseInt(e.target.id);
    // })[0]);
    let product = productArray.filter((val, ind)=>{
      return val.id === parseInt(e.target.id);
    })[0];
    const user = this.props.currentUser.user;
    let data = {
      productId: product.id,
      userId: user.id,
      quantity: 1
    }

    console.log(data);
    this.props.onAdd(data);
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
    const product_lis = productArray.slice(0).map((val,ind)=>{
      
      let remainder_left = ind % 5;
      const placement_left = (remainder_left * 180) + (10 * remainder_left)

      let remainder_top = Math.floor(ind / 5);
      const placement_top = remainder_top * 423

      const topLeft = {
        top: placement_top + "px",
        left: placement_left + "px"
      }

      const image_alt = ind + " product image on page"

      function pipePrice(price){
        //This regex is not necessary.
        let regexCondition = new RegExp('^[0-9]{4}$');
        if(regexCondition.test(price)){
          return price.toLocaleString()
        }else{
          return price;
        }
      }
      const price = pipePrice(val.price);

      return(
        <li className="product_li" style={topLeft} key={ind} >
          <div className="product_div">
            <div className="product_thumbnail">
              <img src={val.picture} alt={image_alt} />
            </div>
            <div className="product_details">
              <div className="price_area">
                <div className="product_price">
                  <span className="product_price_span">
                  {price}
                  </span>
                  <span>원</span>
                </div>
              </div>
              <p className="product_description">{val.productName}</p>
            </div>
            <div className="product_anchor" id={val.id} onClick={this.handleClick}></div>
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