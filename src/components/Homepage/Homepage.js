import React, { Component } from 'react';
import Header from '../Header/Header';
import RightColumn from '../RightColumn/RightColumn';
import Footer from '../Footer/Footer';

class Homepage extends Component {
  render(){
    return(
      <div>
        <Header/>
        <RightColumn currentUser={this.props.currentUser}/>
        <Footer/>
      </div>
    );
  }
}

export default Homepage;