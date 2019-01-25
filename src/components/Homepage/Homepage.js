import React, { Component } from 'react';
import Header from '../Header/Header';
import RightColumn from '../RightColumn/RightColumn';

class Homepage extends Component {
  render(){
    return(
      <div>
        <Header/>
        <RightColumn/>
      </div>
    );
  }
}

export default Homepage;