import React, {Fragment,useState } from 'react';
import './ShoppingPageBanner.css'

function ShoppingPageBanner(props){
  const box = [{
    floor: 'url(https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/img/sprite/svg/spSw_window_svg.svg)',
    name: '명품',
    picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_luxury.cc7e1888.jpg'
  },{
    floor: '2F',
    name: '여성의류',
    picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_women.0a4b469b.jpg'
  },{
    floor: '3F',
    name: '남성의류',
    picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_men.114ed4fd.jpg'
  },{
    floor: '4F',
    name: '신발',
    picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_shoes.6c724422.jpg'
  },{
    floor: '5F',
    name: '패션잡화',
    picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_goods.0c44f0cd.jpg'
  },{
    floor: '6F',
    name: '주얼리/시계',
    picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_accessories.6fb816ac.jpg'
  },{
    floor: '7F',
    name: '레포츠',
    picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_leports.078683de.jpg'
  },{
    floor: '8F',
    name: '언더웨어',
    picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_underwear.0e021663.jpg'
  },{
    floor: '9F',
    name: '화장품',
    picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_cosmetics.a14ffec1.jpg'
  },{
    floor: '10F',
    name: '유아동',
    picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_kids.0ba51219.jpg'
  }].map((val,ind)=>{

    let backgroundStyle={
      backgroundImage: "url("+val.picture+")"
    }
    let anchor={
      backgroundImage: val.floor
    }
    console.log(backgroundStyle);
    return(
      <Fragment key={ind}> 
        <div className="flick_component">
          <a className="flick_anchor" style={backgroundStyle}>
            <div className="flick_details">
              
            </div>
          </a>
        </div>
      </Fragment>
    )
  });

  return(
    <div className="banner_con_outer">
      <div className="banner_con_inner">
        <div className="banner_con">
          <div className="flick_container">
            {box}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingPageBanner;

/*
  ====================
  //-----NOTE: the following code can be placed in {box}. It can implement display: grid.
  //However, the reason, this is commented out is because Naver's implementation is more adaptable to all browsers.
  //So, it's better to follow the code Naver wrote then use display: grid.

  <img src={val.picture} className="banner_box_pic"/>
  <div className="banner_details">
    <span className="banner_floor">{val.floor}</span>
    <span className="banner_name">{val.name}</span>
  </div>

  //-----CSS:
  .banner_box_pic{
    position: absolute;
  }
  .banner_details{
  position: relative;
  width: 320px;
  height: 152px;
  display: grid;
  justify-content: center;
  grid-template-areas: "a"
                       "b";
  }

  .banner_floor{
    position: absolute;
    grid-area: 1 / 1 /span 1 /span 1;
  }

  .banner_name{
    position: absolute;
    grid-area: 2 / 1 /span 1 /span 1;
  }

*/