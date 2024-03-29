const { 
    log_buyer_in,
    get_shop_items,

    get_item,
    get_item_thumbnail,

    get_thumbnail,

    add_item_to_cart,
    delete_item_from_cart,

    get_carts,

    get_orders,

    save_item,
    get_saved_item,
    unsave_item,
    get_saved_item_data,

    update_cart,
    get_buyer,

    get_lodges,
    reset_pwd,
    update_pwd,

    get_search_word,
    register_buyer, 
    get_chat_rooms,
    upload_chat,
    get_chat

} = require("../controller/buyer");

const { ValidateEmail, CheckPwdResetToken } = require("../middleware/buyer");
const { express, parser } = require("../modules");

let buyer_route = express.Router();  


buyer_route.get('');
buyer_route.post('');


buyer_route.post('/buyer.registration', parser, register_buyer);
buyer_route.post('/buyer.login', parser, log_buyer_in);

buyer_route.get('/buyer', get_buyer);

buyer_route.get('/', get_shop_items);
buyer_route.get('/lodges', get_lodges);

buyer_route.get('/product', get_item);
buyer_route.get('/product.images', get_item_thumbnail);
buyer_route.get('/thumbnail', get_thumbnail);

buyer_route.post('/add-cart', parser, add_item_to_cart);
buyer_route.get('/cart', get_carts);
buyer_route.get('/cart-items', get_carts);
buyer_route.delete('/delete-cart', delete_item_from_cart);
buyer_route.post('/update-cart-unit', parser, update_cart);

buyer_route.get('/saved-items-data', get_saved_item_data);
buyer_route.get('/saved-items', get_saved_item);
buyer_route.post('/save-item', parser, save_item);
buyer_route.delete('/unsave-item', unsave_item);

buyer_route.get('/orders', get_orders);

buyer_route.get('/get-chat-rooms', get_chat_rooms);
buyer_route.get('/get-chat', get_chat);


buyer_route.get('/search-word', get_search_word);


buyer_route.post('/buyer.password-update', parser, update_pwd);
buyer_route.post('/buyer.password-reset', parser, reset_pwd);


buyer_route.post('/buyer.password-token-check', parser, CheckPwdResetToken);
buyer_route.post('/buyer.email-validation', parser, ValidateEmail);

buyer_route.post('/new-chat', parser, upload_chat);

module.exports = {buyer_route} 