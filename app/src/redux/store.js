import { configureStore } from '@reduxjs/toolkit';
import BuyerOverlayJsx from './buyer_store/BuyerOverlayJsx';
import ItemImages from './buyer_store/ItemImages';
import ActiveImg from './buyer_store/ActiveImg';
import Cart from './buyer_store/Cart';
import storedCategory from './buyer_store/Category';
import Type from './buyer_store/Type';

import userReducer from './auth_state/auth';
import menuSlice from './seller_store/settings_option';
import Save from './buyer_store/Save';
import SearchList from './buyer_store/SearchList';


let store = configureStore({
  reducer: {
    buyerJsx: BuyerOverlayJsx,
    itemImages: ItemImages,
    ActiveImg: ActiveImg,
    Cart: Cart, 
    searchList: SearchList,
    Save: Save,
    storedCategory: storedCategory,
    Type: Type,
    Save: Save,

    user: userReducer,

    menu: menuSlice

  }

})


export default store;