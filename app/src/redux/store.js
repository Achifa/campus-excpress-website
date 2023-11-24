import { configureStore } from '@reduxjs/toolkit';
import BuyerOverlayJsx from './buyer/BuyerOverlayJsx';
import ItemImages from './buyer/ItemImages';
import ActiveImg from './buyer/ActiveImg';
import Cart from './buyer/Cart';
import Save, { SaveSlice } from './buyer/Save';
import Category from './buyer/Category';
import Type from './buyer/Type';



let store = configureStore({
  reducer: {
    buyerJsx: BuyerOverlayJsx,
    itemImages: ItemImages,
    ActiveImg: ActiveImg,
    Cart: Cart,
    Save: Save,
    Category: Category,
    Type: Type
  }

})


export default store;