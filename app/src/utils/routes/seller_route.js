import Editor from '../../pages/Seller/Editor';
import Shop from '../../pages/Seller/Shop';
import Setting from '../../pages/Seller/Settings';
import SellerWallet from '../../pages/Seller/Wallet';
import Me from '../../pages/Seller/Profile';
import Signup from '../../Authorization/Seller/Signup';
import Inbox from '../../pages/Seller/Inbox'; 
import SellerLogin from '../../Authorization/Seller/Login';
import SellerDashboard from '../../pages/Seller/Dashboard';
import Message from '../../pages/Seller/Messages';
import MessageRoom from '../../pages/Seller/MessageRoom';
import MessageLg from '../../pages/Seller/MessageLg';
import ForgotPwd from '../../Authorization/ForgotPassword';
// import SettingsLg from '../../pages/Seller/SettingsLg';

export let seller_route = [
    {  path:"/seller", component: <SellerDashboard /> },

    {  path:'/seller.signup', component: <Signup /> },
    {  path:'/seller.login', component: <SellerLogin /> },
    {  path:'/seller.password-recovery', component: <ForgotPwd /> },
    // {  path:'/seller.password-reset', component: <PasswordReset /> },

    {  path:'/seller.editor', component: <Editor /> },
    {  path:'/seller.editor/:id', component: <Editor /> },
    
    {  path:'/seller.shop', component: <Shop /> },
    {  path:'/seller.inbox', component: <Inbox /> },

    {  path:'/seller.settings.profile', component: <Setting /> },
    {  path:'/seller.settings.notice', component: <Setting /> },
    {  path:'/seller.settings.payments', component: <Setting /> },
    {  path:'/seller.settings.verification', component: <Setting /> },

    {  path:'/seller.wallet', component: <SellerWallet /> },
    {  path:'/seller.profile', component: <Me /> },

    {  path:'/seller.messages', component: <Message /> },
    {  path:'/seller.message', component: <MessageLg /> },
    {  path:'/seller.messages.room', component: <MessageRoom /> },

    // {  path:'/seller.settings', component: <SettingsLg /> },


    // { path: '/product/:id', component: <ProductPage />}, 

    // <Route path='/seller/password-reset/:id' element={<PasswordReset />}></Route>
    //         <Route path='/seller/email-verification/:id' element={<Verification />}></Route>

    // {  path:'/product/:id', component: <ProductPage /> },
    // {  path:'/seller/messages', component: <Message /> },

]