import { configureStore } from '@reduxjs/toolkit';
import BuyerOverlayJsx from './buyer/BuyerOverlayJsx';



let store = configureStore({
  reducer: {
    buyerJsx: BuyerOverlayJsx
  }

})


export default store;