const { express,path,fs,parser,mocha,morgan,cors,shortId,jwt,io} = require('./modules');
const {NeonDB} = require('./db');
const {seller_route} = require('./route/seller')
const {admin_route} = require('./route/admin')
const cookieParser = require('cookie-parser');
const { buyer_route } = require('./route/buyer');
const greetingTime = require("greeting-time");
const { default: axios } = require('axios');
const { uploadVideoToYouTube } = require('./youtube');
 
greetingTime(new Date());
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
app.use(admin_route)



var server = app.listen(process.env.PORT,_ => console.log('app is live @',process.env.PORT));
io(server, {cors: {origin: '*'}}).on('connection', socket => {
  socket.on('getTime', () => {
    socket.emit('greetings', greetingTime(new Date()))
  })



  socket.on('emailCheck', (email) => {
    NeonDB.then((pool) => 
      pool.query(`SELECt * FROM campus_sellers WHERE email = '${email}'`)
      .then(result => socket.emit('emailCheck', result.rows.length > 0 ? false : true))
      .catch(err => {
        socket.emit('emailCheck', false)
        console.log(err)
      })
    )
    .catch(err => console.log(err))
  })
  

});

app.post("/paystack-webhook", parser, async (req, res) => {
	const payload = req.body;

  let wallet_update = NeonDB.then((pool) => 
  pool.query(`update campus_express_seller_wallet set wallet_balance = wallet_balance + ${payload.data.metadata.amount} where seller_id = '${payload.data.metadata.seller_id}'`)
    .then(result => result.rowCount > 0 ? (true) : (false))
    .catch(err => console.log(err))
  )
  .catch(err => console.log(err))

  let transaction_update = NeonDB.then((pool) => 
  pool.query(`insert into campus_express_seller_transactions (id,document,seller_id) values(DEFAULT, '${JSON.stringify(payload.data)}', '${payload.data.metadata.seller_id}')`)
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
    // io(server, {cors: {origin: '*'}}).on('connection', socket => {
    //   socket.io.emit('transaction_verification', {amount: payload.data.metadata.amount, seller_id: payload.data.metadata.seller_id})
    // });
  })
  .catch(err => console.log(err))

});

app.post("/bank-verification", parser, (req,res) => {
  let {acctNum,bank} = req.body

  const Flutterwave = require('flutterwave-node-v3');
    const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
    const details = {
      account_number: acctNum,
      account_bank: bank
    };
    flw.Misc.verify_Account(details)
    .then(result => res.send(result))
    .catch(err => console.log(err));

})

app.post("/transfer", parser, async(req,res) => {
  let {withdrwawalAmount,acctNum,bank,acctName} = req.body;
  const https = require('https')
  const { v4: uuidv4 } = require('uuid');
  console.log(withdrwawalAmount)


  function initiateTransfer(recipient) {
    const params = JSON.stringify({
      "source": "balance",
      "amount": withdrwawalAmount,
      "reference": uuidv4(),
      "recipient": recipient,
      "reason": "Withdrawal"
    })
  
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transfer',
      method: 'POST',
      headers: {
        Authorization: process.env.PAYSTACK_SECRET_KEY,
        'Content-Type': 'application/json'
      }
    }
  
    const request = https.request(options, res => {
      let data = ''
  
      res.on('data', (chunk) => {
        data += chunk
      });
  
      res.on('end', () => {
        console.log(JSON.parse(data))
      })
    }).on('error', error => {
      console.error(error)
    })
  
    request.write(params)
    request.end()
  
  }
  
  async function createRecipient() {
    try {
      const params = {
        type: 'nuban',
        name: acctName,
        account_number: acctNum,
        bank_code: bank,
        currency: 'NGN',
      };

      const response = await axios.post('https://api.paystack.co/transferrecipient', params, {
        headers: {
          Authorization: process.env.PAYSTACK_SECRET_KEY,
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;
      let code = result.data.recipient_code;
      return(code)

      // Handle the result or return the code as needed

    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  }
  
  try {
    let code = await createRecipient();
    initiateTransfer(code)
  } catch (error) {
    console.log(error)
  }
})

    

    


process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});

