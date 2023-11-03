const { RegisterBuyer, LogBuyerIn } = require("../controller/buyer");
const { express, parser } = require("../modules");

let buyer_route = express.Router();  


buyer_route.get('');
buyer_route.post('');


buyer_route.post('/buyer/registration', parser, RegisterBuyer);
buyer_route.post('/buyer/login', parser, LogBuyerIn);

module.exports = {buyer_route}