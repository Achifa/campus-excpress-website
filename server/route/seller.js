const { uploadProduct, RegisterSeller, LogSellerIn } = require("../controller/seller");
const { express, parser } = require("../modules");

let seller_route = express.Router();  


seller_route.get('');
seller_route.post('');


seller_route.post('/seller/product-upload', parser, uploadProduct);

seller_route.post('/seller/registration', parser, RegisterSeller);
seller_route.post('/seller/login', parser, LogSellerIn);

module.exports = {seller_route}