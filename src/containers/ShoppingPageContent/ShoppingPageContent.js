import React, {} from 'react';
import {Link} from "react-router-dom";

import './ShoppingPageContent.css'
import ShoppingPageBanner from '../../components/ShoppingPageBanner/ShoppingPageBanner'
import ShoppingPageMainContent from '../../components/ShoppingPageMainContent/ShoppingPageMainContent';

function ShoppingPageContent(props){

  return(
    <div className="content">
      <div className="content_header_tabs">
        <ul>
          <li className="presentation_tab">
            <Link className="presentation_tab_a" to="/shopping">
              <div id="presentation_tab_div1" className="presentation_tab_div"></div>
            </Link>
          </li>
          <li className="presentation_tab">
            <Link className="presentation_tab_a" to="/shopping">
              <div id="presentation_tab_div2" className="presentation_tab_div"></div>
            </Link>
          </li>
          <li className="presentation_tab">
            <Link className="presentation_tab_a" to="/shopping">
              <div id="presentation_tab_div3" className="presentation_tab_div"></div>
            </Link>
          </li>
          <li className="presentation_tab">
            <Link className="presentation_tab_a" to="/shopping">
              <div id="presentation_tab_div4" className="presentation_tab_div"></div>
            </Link>
          </li>
        </ul>
      </div>
      <ShoppingPageBanner />
      <ShoppingPageMainContent onAdd={props.onAdd} currentUser = {props.currentUser}/>
    </div>
  )

}

export default ShoppingPageContent;