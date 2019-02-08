import React, { Component,Fragment } from 'react';
import Flipping from 'flipping'
import './ShoppingPageBanner.css'

class ShoppingPageBanner extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedBox: 0,
      hovering: false,
      windowSize:{
        x: window.innerWidth,
        y: window.innerHeight
      },
      timeoutID: 0
    }
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this)
    this.getTranslateDegrees = this.getTranslateDegrees.bind(this);
    this.getPadding = this.getPadding.bind(this);
    this.getMarginLeft = this.getMarginLeft.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handleBoxClick = this.handleBoxClick.bind(this);
  }
  // const [selectedBox, setSelectedBox] = useState(0);
  // const [hovering, setHovering] = useState(false);
  // const [windowSize, setWindowSize] = useState({x: window.innerWidth, y: window.innerHeight});
  // const [timeoutID, setTimeoutID] = useState(0);
  // useEffect(()=>{
  //   window.addEventListener("resize", updateDimensions);  
  // })

  componentDidMount(){
    window.addEventListener("resize", this.updateDimensions);
    this.flipping = new Flipping({
    })

    this.flipping.read();
  }

  componentWillUpdate(){
     this.flipping.read();
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.timeoutID === 0
  }
  componentDidUpdate(){
    this.flipping.flip();
  }

  updateDimensions(){
    if(this.state.timeoutID === 0){
      console.log("FF")
      let timeout = setTimeout(function(){
        // setWindowSize({
        //   x: window.innerWidth,
        //   y: window.innerHeight
        // })
      this.setState(prevState=>({
        ...prevState,
        windowSize:{
          x: window.innerWidth,
          y: window.innerHeight
        },
        timeoutID: 0
      }));  
        // setTimeoutID(0);
        console.log(this.state.windowSize);
      }.bind(this),300)
      // setTimeoutID(timeout);
      this.setState(prevState=>({
        ...prevState,
        timeoutID: timeout
      }));
      console.log(this.state.timeoutID);
    }else if(this.state.timeoutID){
      return null;
    }
  }

  mouseOverHandler(e){
    // setHovering(true);
    this.setState(prevState=>({
      ...prevState,
      hovering: true
    }))

  }

  mouseOutHandler(e){
    // setHovering(false);
    this.setState(prevState=>({
      ...prevState,
      hovering: false
    }))
  }
  getTranslateDegrees(ind){
    const order=[0,1,2,3,4,5,6,7,8,9];
    const produceArray = (x)=>{
      let b = order.slice(x-4);
      let c = order.slice(0,x-4);

      return b.concat(c)
    }
    const index = produceArray(this.state.selectedBox).indexOf(ind);
    return (index * 100).toString() + "%";
  }

  getPadding(){
    let size = this.state.windowSize;
    let padding = ((size.x - 320) / 2);

    if(size.x <990){
      return{
        padding: '0px 335px'
      }
    }
    if(size.x >1265){
      return{
        padding: '0px 472.5px'
      }
    }  
    return {
      padding: '0px '+ padding+'px'
    }
  }

  getMarginLeft(direction){
    let size = this.state.windowSize;
    if(direction ==="left"){
      let marginLeft = (size.x /3) * 0.9
      if(size.x < 990){
        return{
          marginLeft: '260px'
        }
      }
      if(size.x >1265){
        return {
          marginLeft: '420px'
        }
      }
      return{
        marginLeft: marginLeft+'px'
      }
    }
    else{
      let marginLeft = (size.x /1.56) * 1.05
      if(size.x<990){
        return{
          marginLeft: '690px'
        }
      }
      if(size.x>1265){
        return{
          marginLeft: '810px'
        }
      }
      return{
        marginLeft: marginLeft + 'px'
      }
    }
  }

  handleArrowClick(e){
    if(e.target.attributes.left){
      this.setState(prevState=>({
        ...prevState,
        selectedBox: prevState.selectedBox === 0 ? 9: prevState.selectedBox - 1
      }))

    }else{
      this.setState(prevState=>({
        ...prevState,
        selectedBox: prevState.selectedBox === 9 ? 0: prevState.selectedBox + 1
      }))
    }
  }

  handleBoxClick(e){
    console.log(e.target)
    const newSelectedBox = parseInt(e.target.attributes.index.value);
    this.setState(prevState=>({
      ...prevState,
      selectedBox: newSelectedBox
    }))
  }

  render(){
    const box = [{
      position: '-642px -346px',
      name: '명품',
      picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_luxury.cc7e1888.jpg'
    },{
      position: '-642px -279px',
      name: '여성의류',
      picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_women.0a4b469b.jpg'
    },{
      position: '-388px -206px',
      name: '남성의류',
      picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_men.114ed4fd.jpg'
    },{
      position: '-388px -206px',
      name: '신발',
      picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_shoes.6c724422.jpg'
    },{
      position: '-388px -206px',
      name: '패션잡화',
      picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_goods.0c44f0cd.jpg'
    },{
      position: '-388px -206px',
      name: '주얼리/시계',
      picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_accessories.6fb816ac.jpg'
    },{
      position: '-388px -206px',
      name: '레포츠',
      picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_leports.078683de.jpg'
    },{
      position: '-388px -206px',
      name: '언더웨어',
      picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_underwear.0e021663.jpg'
    },{
      position: '-388px -206px',
      name: '화장품',
      picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_cosmetics.a14ffec1.jpg'
    },{
      position: '-388px -206px',
      name: '유아동',
      picture: 'https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/media/bg_home_kids.0ba51219.jpg'
    }].map((val,ind)=>{

      let backgroundImage={
        backgroundImage: 'url('+val.picture+')',
      }
      let floor = {
        backgroundImage: "url(https://ssl.pstatic.net/imgshopping/display/p/static/20190131204615/img/sprite/svg/spSw_window_svg.svg)",
        backgroundPosition: val.position,
        backgroundSize: '672px 612px'
      }
      let currentDegree = this.getTranslateDegrees(ind);
      let transformForLastAndFirstEls = {
        transform: 'translateX('+currentDegree+')'
      }
      let transform = {
        transform: 'translateX('+currentDegree+')',
        transition: 'transform 200ms linear'
      }

      return(
          <Fragment key={ind}> 
            <div index={ind} className="flick_component" style={(currentDegree === "900%") || (currentDegree === "0%")? transformForLastAndFirstEls:transform} onClick={this.handleBoxClick}>
              <a index={ind} className="flick_anchor" style={backgroundImage} aria-selected={this.state.selectedBox === ind}>
                <div index={ind} className="flick_details">
                  <span index={ind} className="flick_floor">
                    <div index={ind} className="floor_before_pseudo_el" style={floor}></div>
                  </span>
                  <p index={ind} className="flick_name">{val.name}</p>
                </div>
              </a>
            </div>
          </Fragment>
      )
    });

    const banner_con_padding = this.getPadding();
    const button_left_margin = this.getMarginLeft("left");
    const button_right_margin = this.getMarginLeft("right");
    return(
      <div className="banner_con_outer">
        <div className="banner_con_inner" onMouseEnter={this.mouseOverHandler} onMouseLeave={this.mouseOutHandler}>
          <div className="banner_con" style={banner_con_padding} >
            <div className="flick_container">
              {box}
            </div>
          </div>
        </div>
        <Fragment>

          <button className="left_button" style={button_left_margin} onClick={this.handleArrowClick} left="true">
             <i className="left_arrow"></i>
          </button>
          <button className="right_button" style={button_right_margin} onClick={this.handleArrowClick} right="true">
            <div className="arrowCon">
             <i className="right_arrow"></i>
            </div>
          </button>
        </Fragment>
    
      </div>
    )  
  }
  
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

/*
-----NOTE: VERY hard problem:(passed through this through hard coding)
Try to make it so that the current state comes at the 4th index.
example: if state is 7, make it so that 7 comes at the 4th index.and the array would go like this:
when state is 7: [3,4,5,6,7,8,9,0,1,2];

when state is 9: [5,6,7,8,9,0,1,2,3,4];

    [0,1,2,3,4,5,6,7,8,9].reduce((acc,cur)=>{
      let  = state+a;
      let lastInd = state+5;
      let firstInd = state-4 <0 ? 10+(state-4): state-4;
      let x = Math.abs(cur-lastInd)
      return acc
    },[])

      */