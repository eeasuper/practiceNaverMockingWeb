import {ACTIVATE_SHOPPING_BUTTON, DEACTIVE_SHOPPING_BUTTON} from '../actionTypes';

export const actiShopBut = () => ({
  type: ACTIVATE_SHOPPING_BUTTON
});

export const deactiShopBut = () => ({
  type: DEACTIVE_SHOPPING_BUTTON
});

export const doShopButtonAni = () => {
  return dispatch => {
    dispatch(actiShopBut());
    // setTimeout(()=>{
    //   dispatch(deactiShopBut())
    // },2000);
  }
}