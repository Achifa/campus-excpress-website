const { RegisterBuyer, LogBuyerIn, GetItems, GetItem, GetItemImages } = require("../controller/buyer");
const { express, parser } = require("../modules");

let buyer_route = express.Router();  


buyer_route.get('');
buyer_route.post('');


buyer_route.post('/buyer/registration', parser, RegisterBuyer);
buyer_route.post('/buyer/login', parser, LogBuyerIn);

buyer_route.get('/', GetItems);
buyer_route.get('/product', GetItem);
buyer_route.get('/product/images', GetItemImages);

module.exports = {buyer_route}