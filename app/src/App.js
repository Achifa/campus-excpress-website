import logo from './logo.svg';
import './App.css';

import {Route, Routes, useLocation } from 'react-router-dom'
import SellerDashboard from './pages/Seller/Dashboard';
import Aside from './components/Seller/Aside';
import Header from './components/Seller/Header';
import Editor from './pages/Seller/Editor';
import Shop from './pages/Seller/Shop';
import SellerOrder from './pages/Seller/Order';
// import Message from './pages/Seller/Messages';
import Setting from './pages/Seller/Settings';
import SellerWallet from './pages/Seller/Wallet';
import Me from './pages/Seller/Profile';



import BuyerHeader from './components/Buyer/Header/Header';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Buyer/Dashboard';
import ProductPage from './pages/Buyer/Product';
import Signup from './Authorization/Seller/Signup';
import BuyerSignup from './Authorization/Buyer.js/Signup';
import BuyerLogin from './Authorization/Buyer.js/Login';
import SellerLogin from './Authorization/Seller/Login';
import Checkout from './pages/Buyer/Checkout';
import PasswordReset from './Authorization/Seller/ForgotPassword';
import ErrorPage from './components/ErrorPage';
import Verification from './Authorization/Seller/Verification';
import Inbox from './pages/Seller/Inbox';
import Order from './pages/Buyer/Order';
import Historhy from './pages/Buyer/History';
import Cart from './pages/Buyer/Cart';
import SavedItem from './pages/Buyer/SavedItem';
import Wallet from './pages/Buyer/Wallet';

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
          <Route path='/asdfghjkl' element={<Dashboard />}></Route>

            <Route path='/' element={<Dashboard />}></Route>

            <Route path='/orders' element={<Order />}></Route>
            <Route path='/history' element={<Historhy />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/wallet' element={<Wallet />}></Route>
            <Route path='/saved-item' element={<SavedItem />}></Route>
            <Route path='/checkout/:id' element={<Checkout />}></Route>
            <Route path='/checkout/:id/:id' element={<Checkout />}></Route>
            <Route path='/signup' element={<BuyerSignup />}></Route>
            <Route path='/login' element={<BuyerLogin />}></Route>
            <Route path='*' element={<ErrorPage/>} /> 



            <Route path='/seller/' element={<SellerDashboard />}></Route>
            <Route path='/seller/signup' element={<Signup />}></Route>
            <Route path='/seller/login' element={<SellerLogin />}></Route>
            <Route path='/seller/editor' element={<Editor />}></Route>
            <Route path='/seller/editor/:id' element={<Editor />}></Route>
            <Route path='/product/:id' element={<ProductPage />}></Route>
            <Route path='/seller/shop' element={<Shop />}></Route>
            <Route path='/seller/orders' element={<SellerOrder/>}></Route>
            <Route path='/seller/inbox' element={<Inbox />}></Route>
            <Route path='/seller/settings' element={<Setting />}></Route>
            <Route path='/seller/wallet' element={<SellerWallet />}></Route>
            <Route path='/seller/profile' element={<Me />}></Route>
            <Route path='/seller/reset-password' element={<PasswordReset />}></Route>

            <Route path='/privacy-policy' element={<Me />}></Route>
            <Route path='/public-terms-of-service
' element={<Me />}></Route>

            <Route path='/password-reset/:id' element={<Editor />}></Route>
            <Route path='/email-verification/:id' element={<Verification />}></Route>




        </Routes>
    </div>
  );
}

export default App;
