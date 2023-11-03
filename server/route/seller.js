const { uploadProduct } = require("../controller/seller");
const { express, parser } = require("../modules");

let seller_route = express.Router();  


seller_route.get('');
seller_route.post('');


seller_route.post('/seller/product-upload', parser, uploadProduct);

module.exports = {seller_route}