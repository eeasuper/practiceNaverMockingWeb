import React, { Component } from 'react';

import ShoppingHeader from '../../components/ShoppingHeader/ShoppingHeader'
import './ShoppingPage.css'
import ShoppingPageContent from '../ShoppingPageContent/ShoppingPageContent'

class ShoppingPage extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <ShoppingHeader currentUser = {this.props.currentUser}/>
        <ShoppingPageContent/>
      </div>
    )
  }
}

export default ShoppingPage;