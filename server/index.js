const { express,path,fs,parser,mocha,morgan,cors,shortId,jwt,io} = require('./modules');
const {NeonDB} = require('./db');
const {seller_route} = require('./route/seller')
const cookieParser = require('cookie-parser');
const { buyer_route } = require('./route/buyer');

require('dotenv').config();


const app = express();
app.use(cookieParser());
app.use(morgan('dev'));

 
let urls = ['http://localhost:3000', 'http://192.168.0.2:3000', 'https://campus-excpress-website-6fwkxq5ma-achifa.vercel.app'];

app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(seller_route)
app.use(buyer_route)




var server = app.listen(process.env.PORT,_ => console.log('app is live @',process.env.PORT));
io(server, {cors: {origin: '*'}}).on('connection', socket => {

    

});

app.post("/paystack-webhook", parser, async (req, res) => {
	const payload = req.body;

  let wallet_update = NeonDB.then((pool) => 
  pool.query(`update campus_express_seller_wallet set wallet_balance = ${payload.data.metadata.amount} where seller_id = '${payload.data.metadata.seller_id}')`)
    .then(result => result.rowCount > 0 ? (true) : (false))
    .catch(err => console.log(err))
  )
  .catch(err => console.log(err))

  let transaction_update = NeonDB.then((pool) => 
  pool.query(`insert into campus_express_seller_transactions (id,document) values(DEFAULT, '{"file": ${payload.data}}')`)
    .then(result => result.rowCount > 0 ? (true) : (false))
    .catch(err => console.log(err))
  )
  .catch(err => console.log(err))

  new Promise((resolve, reject) => {
    resolve(wallet_update)
  })
  .then(wallet_result => {
    let transaction_result = transaction_update
    return{wallet_result, transaction_result}
  })
  .then(({wallet_update, transaction_result}) => {
    res.status(200).end();
    socket.io.emit('transaction_verification', {amount: payload.data.metadata.amount, seller_id: payload.data.metadata.seller_id})
  })
  .catch(err => console.log(err))

});


process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});

