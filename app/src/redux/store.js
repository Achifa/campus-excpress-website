import { configureStore } from '@reduxjs/toolkit';
import BuyerOverlayJsx from './buyer/BuyerOverlayJsx';
import ItemImages from './buyer/ItemImages';
import ActiveImg from './buyer/ActiveImg';
import Cart from './buyer/Cart';
import { SaveSlice } from './buyer/Save';



let store = configureStore({
  reducer: {
    buyerJsx: BuyerOverlayJsx,
    itemImages: ItemImages,
    ActiveImg: ActiveImg,
    Cart: Cart,
    Save: SaveSlice
  }

})


export default store;