import React, { useState } from 'react';
import './ShoppingPageContent.css'
import ShoppingPageBanner from '../../components/ShoppingPageBanner/ShoppingPageBanner'
import ShoppingPageMainContent from '../../components/ShoppingPageMainContent/ShoppingPageMainContent';

function ShoppingPageContent(props){

  return(
    <div className="content">
      <div className="content_header_tabs">
        <ul>
          <li className="presentation_tab">
            <a className="presentation_tab_a">
              <div id="presentation_tab_div1" className="presentation_tab_div"></div>
            </a>
          </li>
          <li className="presentation_tab">
            <a className="presentation_tab_a">
              <div id="presentation_tab_div2" className="presentation_tab_div"></div>
            </a>
          </li>
          <li className="presentation_tab">
            <a className="presentation_tab_a">
              <div id="presentation_tab_div3" className="presentation_tab_div"></div>
            </a>
          </li>
          <li className="presentation_tab">
            <a className="presentation_tab_a">
              <div id="presentation_tab_div4" className="presentation_tab_div"></div>
            </a>
          </li>
        </ul>
      </div>
      <ShoppingPageBanner/>
      <ShoppingPageMainContent/>
    </div>
  )

}

export default ShoppingPageContent;