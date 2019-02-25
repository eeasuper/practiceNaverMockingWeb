import React, { Component,Fragment} from 'react';
import Flipping from 'flipping'
import {connect} from "react-redux";
 import "@reach/dialog/styles.css";
import {
  DialogOverlay,
  DialogContent
} from "@reach/dialog";

import './ShoppingButton.css'
import TestPic from './product_1.png';
import {loadCart} from '../../store/actions/cart';
import {productArray} from '../../resources/products/Products';

class ShoppingButton extends Component{
  constructor(props){
    super(props);
    this.state ={
      showDialog: false,
      itemToErase: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleOkayClick = this.handleOkayClick.bind(this);
    this.confirmButtonRef = React.createRef();
    this.buy_button = React.createRef();
    this.fetchCart = this.fetchCart.bind(this);
  }

  componentDidMount(){
    this.flipping = new Flipping({
    })
    this.flipping.read();

    if(this.props.currentUser.user.id && !(!!Object.values(this.props.cart).length)){
      this.fetchCart();
    }
  }

  fetchCart(){
    //do Fetch then dispatch Load Cart with the products received from backend as action payload.
    this.props.onFetch(this.props.currentUser.user.id)
    .then((data)=>{
      console.log(data);
      // this.props.loadCart(preloadedCart);
    }).catch((err)=>{
      console.log("error in ShoppingButton.js fetchCart");
      console.log(err);
    })
  }

  componentWillUpdate(){
    //componentWillUpdate has changed to UNSAFE in new versions of React. Some implementation will be required here in future.
   this.flipping.read();
  }

  componentDidUpdate(){
    this.flipping.flip();

    if(this.props.buttonActi){
      this.buy_button.current.setAttribute("data-buttonActi",true)
    }else{
      this.buy_button.current.setAttribute("data-buttonActi", false);
    }
  }


  handleClick(e){
    if(this.props.currentUser.user.id && !(!!Object.values(this.props.cart).length)){
      console.log("empty cart.");
      this.fetchCart();
    }
  }
  handleCloseClick(e){
    // console.log(e.target.id);
    let id = e.target.id;
    this.setState(prevState=>({
      showDialog: true,
      itemToErase: id
    }));
  }
  handleOkayClick(e){
    //if user is not logged in, this method will not work(maybe).
    this.props.onRemove(this.props.currentUser.user.id, this.state.itemToErase);
    this.setState(prevState=>({
      ...prevState, itemToErase: null
    }))
  }

  render(){
    const products = Object.keys(this.props.cart).map((val, ind)=>{
      return this.props.cart[val]
    }).map((val, ind)=>{
      //make a REGEX that erases [], ()and skips to the words after them for details.
      let img_alt = ind + " image for cart menu"
      return(
        <div className="cart_product" key={ind}>
          <div className="cart_p_thumb">
            <img src={TestPic} alt={img_alt}/>
          </div>
          <div className="cart_p_details">
            <p className="cart_p_name">{val.product.details}</p>
            <div className="cart_p_price">
              <span className="cart_p_price_s">{val.product.price}</span>
              <span>원</span>
            </div>
            <div className="cart_p_quantity">
              <span>수: 1</span>
            </div>
          </div>
          <button className="cart_p_remove" id={val.product.id} onClick={this.handleCloseClick}>
            <svg height="9" width="9" id="close" viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M4 8 L8 4 L16 12 L24 4 L28 8 L20 16 L28 24 L24 28 L16 20 L8 28 L4 24 L12 16 z"/></svg>
          </button>
          
        </div>
      )
    })

    return(
      <Fragment>
        <input type="checkbox" className="button_checkbox"/>
        <button className="buy_button" onClick={this.handleClick} ref={this.buy_button}>
          <i></i>
        </button>
        <div className="cart_menu">
          <div className= "cart_menu_sub">
            {products.length < 1 &&
            <span>바구니가 비어있습니다. 상품을 선택해주세요.</span>
            }
            {products}
          </div>

        </div>
        <DialogOverlay  isOpen={this.state.showDialog}
            onDismiss={()=> {
              this.setState(prevState=>({
                itemToErase: null,
                showDialog: false
              }))
              }
            }
            initialFocusRef={this.confirmButtonRef}>
            <DialogContent>
              <p className="dialog_p">선택한 상품을 바구니에서 지우시겠습니까?</p>
              <span>
                <button onClick={()=> {
                  this.props.onRemove(this.props.currentUser.user.id, this.state.itemToErase);
                  this.setState(prevState => ({showDialog: false}))
                  this.handleOkayClick();
                }} className="dialog_yes dialog_button">네</button>
                <button onClick={()=> {
                  this.setState(prevState => ({showDialog: false, itemToErase: null}))
                }}
                ref={this.confirmButtonRef}
                className="dialog_no dialog_button"
                >아니요</button>
              </span>
            </DialogContent>
          </DialogOverlay>
      </Fragment>
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
    loadCart: (products) => dispatch(loadCart(products))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingButton);