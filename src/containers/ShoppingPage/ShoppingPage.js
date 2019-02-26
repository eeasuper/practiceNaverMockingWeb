import React, { Component } from 'react';
import {connect} from "react-redux";

import ShoppingHeader from '../../components/ShoppingHeader/ShoppingHeader'
import './ShoppingPage.css'
import ShoppingPageContent from '../ShoppingPageContent/ShoppingPageContent'
import ShoppingButton from '../../components/ShoppingButton/ShoppingButton'
import {removeFromCart,fetchCart, addToCart} from '../../store/actions/cart';

class ShoppingPage extends Component{


  render(){
    return(
      <div>
        <ShoppingHeader currentUser = {this.props.currentUser}/>
        <ShoppingPageContent onAdd={this.props.doAdd} currentUser = {this.props.currentUser} />
        <ShoppingButton onRemove={this.props.doRemove} onFetch={this.props.doFetch} onAdd={this.props.doAdd} cart={this.props.cart} currentUser = {this.props.currentUser}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    cart: state.cart
  }
}

function mapDispatchToProps(dispatch){
  return{
    doRemove: (user_id,product_id)=> dispatch(removeFromCart(user_id,product_id)),
    doFetch: (user_id)=> dispatch(fetchCart(user_id)),
    doAdd: (order,getState)=> dispatch(addToCart(order,getState))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingPage);