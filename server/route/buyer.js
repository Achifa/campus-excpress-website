const { RegisterBuyer, LogBuyerIn, GetItems, GetItem, GetItemImages, GetThumbnail, AddToCart, RemoveFromCart, GetCart, GetCartItems, SaveItem, UnSaveItem, GetSavedItem, GetSavedItemsData, UpdateCart, GetBuyer, GetSearchWord, GetLodges } = require("../controller/buyer");
const { express, parser } = require("../modules");

let buyer_route = express.Router();  


buyer_route.get('');
buyer_route.post('');


buyer_route.post('/buyer/registration', parser, RegisterBuyer);
buyer_route.post('/buyer/login', parser, LogBuyerIn);
buyer_route.post('/buyer', parser, GetBuyer);

buyer_route.get('/', GetItems);
buyer_route.get('/lodges', GetLodges);
buyer_route.get('/product', GetItem);
buyer_route.get('/product/images', GetItemImages);
buyer_route.get('/thumbnail', GetThumbnail);

buyer_route.post('/add-cart', parser, AddToCart);
buyer_route.get('/cart', GetCart);
buyer_route.get('/cart-items', GetCartItems);
buyer_route.delete('/delete-cart', RemoveFromCart);

buyer_route.get('/saved-items-data', GetSavedItemsData);
buyer_route.get('/saved-items', GetSavedItem);
buyer_route.post('/save-item', parser, SaveItem);
buyer_route.delete('/unsave-item', UnSaveItem);

buyer_route.post('/update-cart-unit', parser, UpdateCart);

buyer_route.get('/search-word', GetSearchWord);

module.exports = {buyer_route}