

const { get_thumbnail } = require("../controller/buyer");
const { 
    DeleteItem 
} = require("../controller/seller/delete");
const { 
    GetSellerData,
    GetOverview,
    GetItems,
    GetEditedItem,
    GetChatRooms,
    GetChat,
    GetShop,
    GetItemsSold,
    GetReviews,
    GetSellerPhoto 
} = require("../controller/seller/get");
const { 
    UploadNewItem,
    ValidateBank,
    SendSMS,
    SendEmail 
} = require("../controller/seller/post");

const { 
    register_seller, 
    log_seller_in 
} = require("../controller/seller/registraton_login");

const { 
    UpdateSellerProfile,
    UpdateProduct,
    UpdateShopTitle,
    UpdateShopDesc,
    UpdateInventory
} = require("../controller/seller/update");

const { SellerAuth, CheckSeller } = require("../middleware/seller");

const { 
    express, 
    parser 
} = require("../modules");

let seller_route = express.Router();  

 
seller_route.get('');
seller_route.post(''); 

// @@ SELLER REGISTRATION AND LOGIN
seller_route.post('/seller.registration', parser, register_seller);
seller_route.post('/seller.login', parser, log_seller_in);
// @@ SELLER REGISTRATION AND LOGIN

// @@ UPDATES 
seller_route.post('/seller.profile-update', parser, UpdateSellerProfile);
seller_route.post('/seller.product-update', parser, UpdateProduct);
seller_route.post('/seller.shop-title-update', parser, UpdateShopTitle);
seller_route.post('/seller.shop-desc-update', parser, UpdateShopDesc);
seller_route.post('/seller.inventory-update', parser, UpdateInventory);
// @@ UPDATES 

// @@ UPLOADS
seller_route.post('/seller.product-upload', parser, UploadNewItem);

seller_route.post('/seller.send-email', parser, SendEmail);
seller_route.post('/seller.send-sms', parser, SendSMS);

// @@UPLOADS

// @@ DELETE 
seller_route.delete('/seller.product-delete', DeleteItem);  
// @@DELETE 

// @@ GET REQUEST
seller_route.get('/seller.overview', GetOverview);
seller_route.get('/seller.shop', GetShop);
seller_route.get('/seller.sold-items', GetItemsSold);
seller_route.get('/seller.reviews', GetReviews);
seller_route.get('/seller.listing', GetItems);
seller_route.get('/seller.edited-item', GetEditedItem);
seller_route.get('/seller.profile', GetSellerData); 
seller_route.get('/seller.profile-photo', GetSellerPhoto); 
seller_route.get('/seller.thumbnail', get_thumbnail);

// @@ GET REQUEST

// @@ CHATS
seller_route.get('/seller.chat-rooms', GetChatRooms);
seller_route.get('/seller.get-chat', GetChat);
// seller_route.post('/seller.send-mssg', parser, SendMssg);
// @@ CHATS


 

seller_route.post('/seller/authentication', parser, SellerAuth);
seller_route.post('/seller/check', parser, CheckSeller);





module.exports = {seller_route}
