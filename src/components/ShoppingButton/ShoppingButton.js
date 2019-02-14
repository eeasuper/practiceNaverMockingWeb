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
    //if redux state's button click is true, add an attribute to button to make it animate...? Through refs?
    //Then use timeout to dispatch 
    if(this.props.buttonActi){
      this.buy_button.current.setAttribute("data-buttonActi",true)
    }else{
      this.buy_button.current.setAttribute("data-buttonActi", false);
    }
  }

  handleClick(e){
    // console.log(e.target);
    //hard-coded code below:
    // this.props.onFetch("TEST_ID");
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
    this.props.onRemove("TEST_ID", this.state.itemToErase);
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
          {products}
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
//https://stackoverflow.com/questions/13630229/can-i-have-an-onclick-effect-in-css
function mapStateToProps(state){
  return{
    buttonActi: state.animation.shopping_button_acti
  }
}

export default connect(mapStateToProps)(ShoppingButton);