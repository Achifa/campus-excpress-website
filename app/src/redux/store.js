import { configureStore } from '@reduxjs/toolkit';
import BuyerOverlayJsx from './buyer/BuyerOverlayJsx';
import ItemImages from './buyer/ItemImages';
import ActiveImg from './buyer/ActiveImg';



let store = configureStore({
  reducer: {
    buyerJsx: BuyerOverlayJsx,
    itemImages: ItemImages,
    ActiveImg: ActiveImg
  }

})


export default store;