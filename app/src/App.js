import logo from './logo.svg';
import './App.css';

import Dashboard from './pages/Buyer/Dashboard';
import ProductPage from './pages/Buyer/Product';
import BuyerSignup from './Authorization/Buyer.js/Signup';
import BuyerLogin from './Authorization/Buyer.js/Login';
import Checkout from './pages/Buyer/Checkout';
import ErrorPage from './components/ErrorPage';
import Order from './pages/Buyer/Order';
import Historhy from './pages/Buyer/History';
import Cart from './pages/Buyer/Cart'; 
import SavedItem from './pages/Buyer/SavedItem';
import Wallet from './pages/Buyer/Wallet';
// import BuyerPasswordReset from './Authorization/Buyer/PasswordReset';
// import BuyerVerification from './Authorization/Buyer/Verification';

import {Route, Routes, useLocation } from 'react-router-dom'
import SellerDashboard from './pages/Seller/Dashboard';
import Aside from './components/Seller/Aside/Aside';
import Header from './components/Seller/Header/Header';
import Editor from './pages/Seller/Editor';
import Shop from './pages/Seller/Shop';
import SellerOrder from './pages/Seller/Order';
// import Message from './pages/Seller/Messages';
import Setting from './pages/Seller/Settings';
import SellerWallet from './pages/Seller/Wallet';
import Me from './pages/Seller/Profile';
import Signup from './Authorization/Seller/Signup';
import Inbox from './pages/Seller/Inbox'; 
import SellerLogin from './Authorization/Seller/Login';
import PasswordReset from './Authorization/Seller/PasswordReset';
import Verification from './Authorization/Seller/Verification';


// import BuyerPasswordReset from './Authorization/Buyer/ForgotPassword';
// import BuyerVerification from './Authorization/Buyer/Verification';

import AdminDashboard from './pages/Admin/Dashboard';
import AdminAside from './components/Admin/Aside';
import AdminHeader from './components/Admin/Header';
import AdminEditor from './pages/Admin/Editor';
import AdminShop from './pages/Admin/Shop';
import AdminSellerOrder from './pages/Admin/Order';
// import AdminMessage from './pages/Admin/Messages';
import AdminSetting from './pages/Admin/Settings'; 
import AdminSellerWallet from './pages/Admin/Wallet';
import AdminMe from './pages/Admin/Profile';
import AdminSignup from './Authorization/Admin/Signup';
import AdminInbox from './pages/Admin/Inbox';
import AdminSellerLogin from './Authorization/Admin/Login';
import AdminPasswordReset from './Authorization/Admin/ForgotPassword';
import AdminVerification from './Authorization/Admin/Verification';


import BuyerHeader from './components/Buyer/Header/Header';
import { useEffect, useState } from 'react';


import Users from './pages/Admin/Users';
import ForgotPwd from './Authorization/Seller/ForgotPassword';
import Search from './components/Buyer/Header/Search';

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
      if(location.pathname.split('/').splice(-1)[0] === 'signup' || location.pathname.split('/').splice(-1)[0] === 'login' || location.pathname.split('/').splice(-1)[0] === 'reset-password' || location.pathname.split('/').splice(-1)[0] === 'password-reset'){
        setActiveDom(
          <>


            <Header />
          </>
        )
      }else if(location.pathname.split('/')[1] === 'seller'){
        if(location.pathname.split('/').splice(-1)[0] === 'signup' || location.pathname.split('/').splice(-1)[0] === 'login' || location.pathname.split('/').splice(-1)[0] === 'reset-password' || location.pathname.split('/').splice(-1)[0] === 'password-reset'){

          setActiveDom(
            <>
              <Header />
            </>
          )
          }else{
            setActiveDom(
            <>
              <Header />
              <Aside />
            </>
            )
          }
      }else if(location.pathname.split('/')[1] === 'admin'){
        setActiveDom(
          <>
            <AdminHeader />
            <AdminAside />
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
        

            



            <Route path='/seller/' element={<SellerDashboard />}></Route>

            <Route path='/seller/signup' element={<Signup />}></Route>
            <Route path='/seller/login' element={<SellerLogin />}></Route>
            <Route path='/seller/reset-password' element={<ForgotPwd />}></Route>

            <Route path='/seller/editor' element={<Editor />}></Route>
            <Route path='/seller/editor/:id' element={<Editor />}></Route>
            <Route path='/product/:id' element={<ProductPage />}></Route>
            <Route path='/seller/shop' element={<Shop />}></Route>
            <Route path='/seller/orders' element={<SellerOrder/>}></Route>
            <Route path='/seller/inbox' element={<Inbox />}></Route>
            <Route path='/seller/settings' element={<Setting />}></Route>
            <Route path='/seller/wallet' element={<SellerWallet />}></Route>
            <Route path='/seller/profile' element={<Me />}></Route>

            <Route path='/privacy-policy' element={<Me />}></Route>
            <Route path='/public-terms-of-service' element={<Me />}></Route>
            <Route path='/admin/reset-password' element={<AdminPasswordReset />}></Route>

            <Route path='/seller/password-reset/:id' element={<PasswordReset />}></Route>
            <Route path='/seller/email-verification/:id' element={<Verification />}></Route>




            <Route path='/admin/' element={<AdminDashboard />}></Route>  
            <Route path='/admin/users' element={<Users />}></Route>  
            <Route path='/admin/signup' element={<AdminSignup />}></Route>
            <Route path='/admin/login' element={<AdminSellerLogin />}></Route>
            <Route path='/admin/editor' element={<AdminEditor />}></Route>
            <Route path='/admin/editor/:id' element={<AdminEditor />}></Route>
            {/* <Route path='/product/:id' element={<AdminProductPage />}></Route> */}
            <Route path='/admin/shop' element={<AdminShop />}></Route>
            <Route path='/admin/orders' element={<AdminSellerOrder/>}></Route>
            <Route path='/admin/inbox' element={<AdminInbox />}></Route>
            <Route path='/admin/settings' element={<AdminSetting />}></Route>
            <Route path='/admin/wallet' element={<AdminSellerWallet />}></Route>
            <Route path='/admin/profile' element={<AdminMe />}></Route>
            <Route path='/admin/reset-password' element={<AdminPasswordReset />}></Route>

            <Route path='/password-reset/:id' element={<AdminEditor />}></Route>
            <Route path='/email-verification/:id' element={<AdminVerification />}></Route>









            

            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/:id' element={<Dashboard />}></Route>
            <Route path='/orders' element={<Order />}></Route>
            <Route path='/history' element={<Historhy />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/wallet' element={<Wallet />}></Route>
            <Route path='/saved-item' element={<SavedItem />}></Route>
            <Route path='/checkout/:id' element={<Checkout />}></Route>
            <Route path='/checkout/:id/:id' element={<Checkout />}></Route>
            <Route path='/signup' element={<BuyerSignup />}></Route>
            <Route path='/signup/:id' element={<BuyerSignup />}></Route>
            <Route path='/login' element={<BuyerLogin />}></Route>
            <Route path='/search' element={<Search />}></Route>
            {/* <Route path='/buyer/password-reset/:id' element={<BuyerPasswordReset />}></Route>
            <Route path='/buyer/email-verification/:id' element={<BuyerVerification />}></Route> */}
            <Route path='*' element={<ErrorPage/>} /> 

        </Routes>
    </div>
  );
}

export default App;
