const { AuthorizeWalletAccess, create_bill } = require("../Transactions/Sellers");
const { uploadProduct, RegisterSeller, LogSellerIn, Overview, Shop, WalletData, GetSeller, GetEditedItem, updateProduct, updateSellerProfile, SendEmailToken, SendToken, ResetPwd, updatePwd, DeleteProduct } = require("../controller/seller");
const { seller_authentication, check_seller, CheckPwdResetToken } = require("../middleware/seller");
const { express, parser } = require("../modules");

let seller_route = express.Router();  


seller_route.get('');
seller_route.post(''); 

seller_route.post('/seller/authentication', parser, seller_authentication);
seller_route.post('/seller/check', parser, check_seller);

seller_route.post('/seller/password-reset', parser, ResetPwd);

seller_route.post('/seller/product-upload', parser, uploadProduct);
seller_route.post('/seller/product-update', parser, updateProduct);
seller_route.post('/seller/registration', parser, RegisterSeller);
seller_route.post('/seller/login', parser, LogSellerIn);
seller_route.post('/seller/overview', parser, Overview);
seller_route.post('/seller/profile-update', parser, updateSellerProfile);

seller_route.post('/seller', parser, GetSeller);

seller_route.post('/seller/wallet-data', parser, WalletData);

seller_route.get('/seller-edited-item', GetEditedItem);
seller_route.post('/seller/wallet-access', parser, AuthorizeWalletAccess);
seller_route.post('/seller/wallet-bill', parser, create_bill);

seller_route.post('/seller/shop', parser, Shop);

seller_route.post('/seller/password-update', parser, updatePwd);
seller_route.post('/seller/password-token-check', parser, CheckPwdResetToken);

seller_route.post('/seller/order', parser, CheckPwdResetToken);
seller_route.post('/seller/inbox', parser, CheckPwdResetToken);

seller_route.delete('/seller/product-delete', DeleteProduct);

module.exports = {seller_route}


/*




*/