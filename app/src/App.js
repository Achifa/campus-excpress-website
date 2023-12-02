import logo from './logo.svg';
import './App.css';

import {Route, Routes, useLocation } from 'react-router-dom'
import SellerDashboard from './pages/Seller/Dashboard';
import Aside from './components/Seller/Aside';
import Header from './components/Seller/Header';
import Editor from './pages/Seller/Editor';
import Shop from './pages/Seller/Shop';
import Order from './pages/Seller/Order';
import Message from './pages/Seller/Messages';
import Setting from './pages/Seller/Settings';
import Wallet from './pages/Seller/Wallet';
import Me from './pages/Seller/Profile';



import BuyerAside from './components/Buyer/Aside';
import BuyerHeader from './components/Buyer/Header';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Buyer/Dashboard';
import ProductPage from './pages/Buyer/Product';
import Signup from './Authorization/Seller/Signup';
import BuyerSignup from './Authorization/Buyer.js/Signup';
import BuyerLogin from './Authorization/Buyer.js/Login';
import Inbox from './components/Seller/Inbox';
import SellerLogin from './Authorization/Seller/Login';
import Orders from './components/Buyer/Orders';
import History from './components/Buyer/History';
import SavedItem from './components/Buyer/SavedItem';
import Cart from './components/Buyer/Cart';
import Wallets from './components/Buyer/Wallet';
import Checkout from './pages/Buyer/Checkout';
import PasswordReset from './Authorization/Seller/ForgotPassword';
function App() {
  let location = useLocation()
  let [activeDom, setActiveDom] = useState()

  useEffect(() => {
    if(location.pathname.split('/')[1] === ''){
      setActiveDom(
        (
          <>
            <BuyerHeader />
          </>
        )
      )
    }else{
      if(location.pathname.split('/').splice(-1)[0] === 'signup' || location.pathname.split('/').splice(-1)[0] === 'login'){
        setActiveDom(
          <>


            <Header />
          </>
        )
      }else if(location.pathname.split('/')[1] === 'seller'){
        setActiveDom(
          <>
            <Header />
            <Aside />
          </>
        )
      }
      
    }
  }, [location])

  return (
    <div className="App">
        {
          activeDom
        }
        <Routes key={location.key}>

            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/history' element={<History />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/wallet' element={<Wallets />}></Route>
            <Route path='/saved-item' element={<SavedItem />}></Route>
            <Route path='/product/:id' element={<ProductPage />}></Route>
            <Route path='/checkout/:id' element={<Checkout />}></Route>
            <Route path='/checkout/:id/:id' element={<Checkout />}></Route>
            <Route path='/signup' element={<BuyerSignup />}></Route>
            <Route path='/login' element={<BuyerLogin />}></Route>



            <Route path='/seller/' element={<SellerDashboard />}></Route>
            <Route path='/seller/signup' element={<Signup />}></Route>
            <Route path='/seller/login' element={<SellerLogin />}></Route>
            <Route path='/seller/editor' element={<Editor />}></Route>
            <Route path='/seller/editor/:id' element={<Editor />}></Route>
            <Route path='/product/:id' element={<ProductPage />}></Route>
            <Route path='/seller/shop' element={<Shop />}></Route>
            <Route path='/seller/orders' element={<Order/>}></Route>
            <Route path='/seller/inbox' element={<Inbox/>}></Route>
            <Route path='/seller/settings' element={<Setting />}></Route>
            <Route path='/seller/wallet' element={<Wallet />}></Route>
            <Route path='/seller/profile' element={<Me />}></Route>
            <Route path='/seller/reset-password' element={<PasswordReset />}></Route>

            <Route path='/privacy-policy' element={<Me />}></Route>
            <Route path='/public-terms-of-service
' element={<Me />}></Route>

            <Route path='/password-reset/:id' element={<Editor />}></Route>
            <Route path='/email-verification/:id' element={<Editor />}></Route>




        </Routes>
    </div>
  );
}

export default App;
