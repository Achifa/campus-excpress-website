const { process_payment } = require("./controllers");

let payment_route = express.Router();  


payment_route.get('');
payment_route.post('');


payment_route.post('/flw-webhook', parser, process_payment);

module.exports = {payment_route} 