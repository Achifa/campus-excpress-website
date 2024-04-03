import Dashboard from '../../pages/Buyer/Dashboard';
import ProductPage from '../../pages/Buyer/Product';
import BuyerSignup from '../../Authorization/Buyer.js/Signup';
import BuyerLogin from '../../Authorization/Buyer.js/Login';
import Checkout from '../../pages/Buyer/Checkout';
import Order from '../../pages/Buyer/Order';
import Historhy from '../../pages/Buyer/History';
import Cart from '../../pages/Buyer/Cart'; 
import Wallet from '../../pages/Buyer/Wallet';
import Search from '../../components/Buyer/Header/Search';
import BuyerForgotPwd from '../../Authorization/Buyer.js/ForgotPassword';
import { useEffect } from 'react';
import Messages from '../../pages/Buyer/Messages';
import MessageRoom from '../../pages/Buyer/MessageRoom';
import SavedItem from '../../components/Buyer/Saved/SavedItem';




export let buyer_route = [

    { path: '/', component: <Dashboard />},
    { path: '/:id', component: <Dashboard />}, 



    { path: '/buyer.room/:id', component: <MessageRoom />},

    {  path:'/buyer.message/:id', component: <Messages /> },
    {  path:'/buyer.message', component: <Messages /> },



    { path: '/orders', component: <Order />},
    { path: '/history', component: <Historhy />},
    { path: '/cart', component: <Cart />},
    { path: '/wallet', component: <Wallet />},

    { path: '/favourites', component: <SavedItem />},

    { path: '/product', component: <ProductPage />}, 

    { path: '/checkout/:id', component: <Checkout />},
    { path: '/checkout/:id/:id', component: <Checkout />},
    { path: '/checkout/:id/:id/:id', component: <Checkout />},

    { path: '/signup', component: <BuyerSignup />},
    { path: '/signup/:id', component: <BuyerSignup />},

    { path: '/login', component: <BuyerLogin />},

    { path: '/search', component: <Search />}, 
    { path: '/reset-password', component: <BuyerForgotPwd />}
]