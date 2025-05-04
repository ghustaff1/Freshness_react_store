import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push({
        ...action.payload
      });
      const localStorageCartData = localStorage.getItem('cartData');
      if (localStorageCartData.length > 0) {
        const newData = JSON.parse(localStorage.getItem('cartData'));
        newData.push(action.payload);
        localStorage.setItem('cartData', JSON.stringify(newData));
      }
      else {
        const newData = [];
        newData.push(action.payload);
        localStorage.setItem('cartData', JSON.stringify(newData));
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(obj => obj.productId !== action.payload.productId);
      const localStorageCartData = JSON.parse(localStorage.getItem('cartData'));
      localStorage.setItem('cartData',
        JSON.stringify(localStorageCartData.filter(obj => obj.productId !== action.payload.productId)));

    },
    clearCart(state) {
      state.items = [];
      localStorage.setItem('cartData', []);
    },
    initializeCart(state) {
      if (localStorage.getItem('cartData').length > 0) {
        state.items = JSON.parse(localStorage.getItem('cartData'));
      }
    }
  }
});

export const { addToCart, removeFromCart, clearCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;

//addToCart
//action.payload={
      // productId:01, 
      // title_us, 
      // title_ua, 
      // imgUrl, 
      // amount:3, 
      // price:123,
      //datedPrice,
      //measure*****->доделать,
      //rating
      //}
      //console.log('cartStoreData', current(state));
      // console.log('localCartData', localStorage.getItem('cartData'))

      //remove fromCart
      // console.log('cartStoreData', current(state));
      // console.log('localCartData', localStorage.getItem('cartData'))