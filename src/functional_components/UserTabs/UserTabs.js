// import React,{ useState,useEffect } from 'react';
// import {Link} from "react-router-dom";
// import { CSSTransition,transit } from "react-css-transition";
// import './UserTabs.css'

// CSSTransition.childContextTypes = {
// }

// function UserTabs(props){
//   //props.direction.
//   //props.change
//   //direction: 1 is right, direction: 0 is left.
//   const [currentTab, setTab] = useState(0);

//   const page_right_lis = ["알림", "MY구독", "메일","카페","블로그", "페이"].map((val,ind)=>{
//     return(
//       <li key={ind} className="service_lis">
//         <Link className="tab_noti" to="/">
//           <i>{val}</i>
//         </Link>
//       </li>
//     )
//   })

//   const page_middle_lis = ["포스트", "클라우드","오피스","캘린더", "해피빈"].map((val,ind)=>{
//     return(
//       <li key={ind} className="service_lis">
//         <Link className="tab_noti" to="/">
//           <i>{val}</i>
//         </Link>
//       </li>
//     )
//   })

//   const page_left_lis = ["지식iN","메모"].map((val,ind)=>{
//     return(
//       <li key={ind} className="service_lis">
//         <Link className="tab_noti" to="/">
//           <i>{val}</i>
//         </Link>
//       </li>
//     )
//   })

//   var direction;
//   var perc = {
//     default: -100,
//     active: 0,
//     leave: -100
//   };
//   var def = perc.default;
//   var active = perc.active;
//   var leave = perc.leave;

//   useEffect(()=>{
//     direction = props.direction;
//     perc = getTab(props.changedTab, props.direction);
//   },[props.changedTab])

//   function getTab(tab=0,dir){
//     console.log("gettab")
//     console.log(currentTab);
//     console.log(props.changedTab)
//     switch(tab){
//       case(0):
//         return {
//             default: -100,
//             active: 0,
//             leave: -100
//           }
//         break;
//       case(1):
//         setTab(1)
//         return{

//         }
//     }
//   }

//   return(
//     <CSSTransition active={props.changedTab === 1}
//       defaultStyle={{transform: "translateX("+{def}+"%)"}}
//       enterStyle={{transform: transit("translateX("+{active}+"%)",300,"ease-in-out")}}
//       activeStyle={{transform: "translateX("+{active}+"%)"}}
//       leaveStyle={{transform: transit("translateX("+{leave}+"%)",300,"ease-in-out")}}
//       className="ulCon"
//     >
//       <ul id="page_right" className="service_uls">
//         {page_right_lis}
//       </ul>
//     </CSSTransition>
//   )
// }

// export default UserTabs;

/*
1,2,3.
1 => 2
2 => 1
2 => 3
3 => 2

if(right){
  previous li goes left.
  next li comes from right.
}
if(left){
  previous li goes right.
  next li comes from left.
}
if(right x2){
    
}

what will the state be?
numbers. 0,1, and 2.
- put conditional as to which direction element moves.
leaveToRight = -100


*/