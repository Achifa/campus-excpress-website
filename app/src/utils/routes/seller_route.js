import Editor from '../../pages/Seller/Editor';
import Shop from '../../pages/Seller/Shop';
import SellerOrder from '../../pages/Seller/Order';
import Setting from '../../pages/Seller/Settings';
import SellerWallet from '../../pages/Seller/Wallet';
import Me from '../../pages/Seller/Profile';
import Signup from '../../Authorization/Seller/Signup';
import Inbox from '../../pages/Seller/Inbox'; 
import SellerLogin from '../../Authorization/Seller/Login';
import SellerDashboard from '../../pages/Seller/Dashboard';
import ForgotPwd from '../../Authorization/Seller/ForgotPassword';
import PasswordReset from '../../Authorization/Seller/PasswordReset';
import Message from '../../pages/Seller/Messages';
import OrderPage from '../../pages/Seller/OrderPage';
import MessageRoom from '../../pages/Seller/MessageRoom';
import MessageLg from '../../pages/Seller/MessageLg';

export let seller_route = [
    {  path:"/seller", component: <SellerDashboard /> },

    {  path:'/seller.signup', component: <Signup /> },
    {  path:'/seller.login', component: <SellerLogin /> },
    {  path:'/seller.password-recovery', component: <ForgotPwd /> },
    {  path:'/seller.password-reset', component: <PasswordReset /> },

    {  path:'/seller.editor', component: <Editor /> },
    {  path:'/seller.editor/:id', component: <Editor /> },
    
    {  path:'/seller.shop', component: <Shop /> },
    {  path:'/seller.orders', component: <SellerOrder/> },
    {  path:'/seller.inbox', component: <Inbox /> },
    {  path:'/seller.settings', component: <Setting /> },
    {  path:'/seller.wallet', component: <SellerWallet /> },
    {  path:'/seller.profile', component: <Me /> },
    {  path:'/seller.messages', component: <Message /> },
    {  path:'/seller.message', component: <MessageLg /> },
    {  path:'/seller.messages.room', component: <MessageRoom /> },
    { path: '/seller.order-page/:id', component: <OrderPage /> },

    // { path: '/product/:id', component: <ProductPage />}, 

    // <Route path='/seller/password-reset/:id' element={<PasswordReset />}></Route>
    //         <Route path='/seller/email-verification/:id' element={<Verification />}></Route>

    // {  path:'/product/:id', component: <ProductPage /> },
    // {  path:'/seller/messages', component: <Message /> },

]