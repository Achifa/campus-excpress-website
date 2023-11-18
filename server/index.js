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


app.post("/flw-webhook", async (req, res) => {
  
	const payload = req.body;
	console.log(payload);

  NeonDB.then((pool) => 
  pool.query(`update campus_express_seller_wallet set wallet_balance = ${payload.data.amount} where seller_id = '${payload.data.id}')`)
    .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
    .catch(err => console.log(err))
  )
  .catch(err => console.log(err))

  NeonDB.then((pool) => 
  pool.query(`insert into campus_express_seller_transactions (id,wallet_id,seller_id,amount,currency,app_fee,merchant_fee,narration,charged_amount,processor_response,ip,status,payment_type,created_at,transaction_id,tx_ref,flw_ref,device_fingerprint,date) values(DEFAULT,'${wallet_id}','${seller_id}','${payload.data.amount}','${payload.data.currency}','${payload.data.app_fee}','${payload.data.merchant_fee}','${payload.data.narration}','${payload.data.charged_amount}','${payload.data.processor_response}','${payload.data.ip}','${payload.data.status}','${payload.data.payment_type}','${payload.data.created_at}','${payload.data.transaction_id}','${payload.data.tx_ref}','${payload.data.flw_ref}','${payload.data.device_fingerprint}','${date}')`)
    .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
    .catch(err => console.log(err))
  )
  .catch(err => console.log(err))


  res.status(200).end();
});

var server = app.listen(process.env.PORT,_ => console.log('app is live @',process.env.PORT));
io(server, {cors: {origin: '*'}}).on('connection', socket => {

    

});


process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});

