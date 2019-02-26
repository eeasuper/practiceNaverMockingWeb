import React, { Component } from 'react';
import Header from '../Header/Header';
import RightColumn from '../RightColumn/RightColumn';
import Footer from '../Footer/Footer';
import LeftColumn from '../LeftColumn/LeftColumn'
import './Homepage.css';

class Homepage extends Component {
  render(){
    return(
      <div>
        <Header/>
        <div id="homepage_container">
          <LeftColumn />
          <RightColumn currentUser={this.props.currentUser}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Homepage;