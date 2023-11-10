import { configureStore } from '@reduxjs/toolkit';
import BuyerOverlayJsx from './buyer/BuyerOverlayJsx';
import ItemImages from './buyer/ItemImages';



let store = configureStore({
  reducer: {
    buyerJsx: BuyerOverlayJsx,
    itemImages: ItemImages
  }

})


export default store;