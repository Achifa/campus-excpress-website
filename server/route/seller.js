const { AuthorizeWalletAccess } = require("../Transactions/Sellers");
const { uploadProduct, RegisterSeller, LogSellerIn, Overview, Shop, WalletData } = require("../controller/seller");
const { express, parser } = require("../modules");

let seller_route = express.Router();  


seller_route.get('');
seller_route.post('');


seller_route.post('/seller/product-upload', parser, uploadProduct);
seller_route.post('/seller/registration', parser, RegisterSeller);
seller_route.post('/seller/login', parser, LogSellerIn);
seller_route.post('/seller/overview', parser, Overview);
seller_route.post('/seller/wallet-data', parser, WalletData);

seller_route.post('/seller/wallet-access', parser, AuthorizeWalletAccess);

seller_route.post('/seller/shop', parser, Shop);


module.exports = {seller_route}