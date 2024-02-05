// const { AuthorizeWalletAccess, create_bill } = require("../../transactions/roles/Sellers");
const { 
    delete_cart 
} = require("../Functions/cart");

const { 
    send_email 
} = require("../Functions/send_mssgs");
const { get_chats, get_mssgs, send_mssgs } = require("../controller/seller/chats");

const { 
    overview, 
    shop,
    get_edited_item,
    wallet_data,
    get_seller_order,
    get_seller_inbox
} = require("../controller/seller/get");

const { 
    register_seller, 
    log_seller_in 
} = require("../controller/seller/registraton_login");


const { 
    get_seller_data 
} = require("../controller/seller/seller_data");
const { 
    update_seller_profile, 
    update_product, 
    update_pwd, 
    reset_pwd
} = require("../controller/seller/updates");

const { 
    upload_product 
} = require("../controller/seller/uploads");

const { seller_authentication, check_seller, CheckPwdResetToken, ValidateEmail } = require("../middleware/seller");

const { 
    express, 
    parser 
} = require("../modules");

let seller_route = express.Router();  


seller_route.get('');
seller_route.post(''); 

// @@ SELLER REGISTRATION AND LOGIN
seller_route.post('/seller/registration', parser, register_seller);
seller_route.post('/seller/login', parser, log_seller_in);
// @@ SELLER REGISTRATION AND LOGIN

// @@ UPDATES 
seller_route.post('/seller/profile-update', parser, update_seller_profile);
seller_route.post('/seller/product-update', parser, update_product);

seller_route.post('/seller/password-update', parser, update_pwd);
seller_route.post('/seller/password-reset', parser, reset_pwd);
// @@ UPDATES 

// @@ UPLOADS
seller_route.post('/seller/product-upload', parser, upload_product);
// @@UPLOADS

// @@ DELETE 
seller_route.delete('/seller/product-delete', delete_cart);
// @@DELETE 

// @@ GET REQUEST
seller_route.post('/seller/orders', parser, get_seller_order);
seller_route.post('/seller/inbox', parser, get_seller_inbox);
seller_route.post('/seller/overview', parser, overview);
// @@ GET REQUEST

// @@ CHATS
seller_route.post('/seller/chats', parser, get_chats);
seller_route.post('/seller/mssg', parser, get_mssgs);
seller_route.get('/seller/shop', shop);
seller_route.post('/seller/send-mssg', parser, send_mssgs);
// @@ CHATS




seller_route.post('/seller/authentication', parser, seller_authentication);
seller_route.post('/seller/check', parser, check_seller);






seller_route.post('/seller', parser, get_seller_data);
seller_route.post('/seller/wallet-data', parser, wallet_data);
seller_route.get('/seller-edited-item', get_edited_item);

 
seller_route.post('/seller/password-token-check', parser, CheckPwdResetToken);
seller_route.post('/seller/email-validation', parser, ValidateEmail);


module.exports = {seller_route}
