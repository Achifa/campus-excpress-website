const { express,path,fs,parser,mocha,morgan,cors,shortId,jwt,io} = require('./modules');
const {NeonDB} = require('./db');
const {seller_route} = require('./route/seller')
const {admin_route} = require('./route/admin')
const cookieParser = require('cookie-parser');
const { buyer_route } = require('./route/buyer');
const greetingTime = require("greeting-time");
const { default: axios } = require('axios');
const { uploadVideoToYouTube } = require('./youtube');
const { v4 } = require('uuid');
const { retrive_cart, retrieve_room, retrieve_mssg_meta_data, retrieve_buyer, retrieve_seller } = require('./Functions/cart');
const { record_transacction } = require('./product_payment/transaction');
const { update_buyer_wallet } = require('./product_payment/update_wallet');
const { create_order } = require('./product_payment/create_order');
const { update_product_status } = require('./product_payment/update_product_status');
const { create_room_id } = require('./product_payment/create_room');
const { send_proposal_meta_data } = require('./product_payment/send_proposal_meta_data');
const { send_proposal_message } = require('./product_payment/send_mssg');
const { delete_cart, delete_cart_with_id } = require('./product_payment/delete_cart');

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

  if(payload.data.metadata.type !== 'order'){

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
  }else{
    let wallet_update = NeonDB.then((pool) => 
    pool.query(`update campus_express_seller_wallet set wallet_balance = wallet_balance + ${payload.data.metadata.amount} where seller_id = '${payload.data.metadata.seller_id}'`)
      .then(result => result.rowCount > 0 ? (true) : (false))
      .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

    let transaction_update = NeonDB.then((pool) => 
    pool.query(`insert into campus_express_buyer_orders(id,order_id,product_id,status,date,stock,buyer_id) values(DEFAULT, '${v4()}', '${payload.data.metadata.product_id}', '', '${date}', '${stock}', '${buyer_id}')`)
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
  }

  

});


app.post("/flw-webhook", parser, async(req,res) => {
  let payload = req.body;

  console.log(payload)
  
  let data = payload.data.customer.phone_number.split('/');
  let cart = data[0];

  let buyer_id = data[1]
  let buyer_phn = data[2]

  let immmediate_purchase_data = cart.split('*');
  let immmediate_purchase = immmediate_purchase_data[0];

  let unit;
  let product_id;

  if(immmediate_purchase === 'true'){
    unit = immmediate_purchase_data[1] 
    product_id = immmediate_purchase_data[2]
  }

 

  try{
		// Check for the signature
    const secretHash = process.env.FLW_SECRET_KEY;
    const signature = req.headers["verif-hash"];
    if(!signature || signature !== secretHash){
      // This response is not from Flutterwave; discard
      return res.status(401).end();
    }else{
      const payload = req.body;
      console.log(payload);
      handle_order()
    }
    

  } catch (err) {
    console.log(err.code);
    console.log(err.response.body);
  }


  function generate_mssg(name) {return(`Hi I Am ${name} And I Just Paid For The Item You Sell On Campus Express, Please Chat Me Up When Availble. Thanks.`)}
  // // store transaction
  // // update buyer balance *** not for immediate purchase
  // // create order
  // // update product sataus (set status to ordered)
  // // create chat room
  
  function handle_order(params) {
    
    new Promise(async(resolve, reject) => { 
      let response = await record_transacction(payload,buyer_id, 'bank'); 
      response.bool ? resolve(response) : reject(response)
    })

    .then(async(result) => {
      result.bool 
      ? 
      console.log(result, 'saved transaction') 
      : 
      console.log(result,'error occcured while saving transaction')

      if(result.bool && immediate_purchase === 'true'){

        let response = await create_order(product_id, unit, buyer_id)
        return response ? ({bool: true}) : ({bool: false})

      }else if(result.bool && immediate_purchase !== 'true'){

        let carts = await retrive_cart(buyer_id)
        let response = await carts.map(item => create_order(item.product_id, item.unit, buyer_id))
        let data = await Promise.all(response).then(result => result)
        let bool_check = data.includes(false)
        return !bool_check ? ({bool: true}) : ({bool: false})

      }else{console.log(result,'error occcured creating order')}
    })

    .then(async(result) => {
      result.bool ? console.log(result, 'deleting order') : console.log(result,'error occcured before deleting order') 

      if(result.bool && immediate_purchase === 'true'){
        return ({bool: true})
      }else if(result.bool && immediate_purchase !== 'true'){

        let carts = await retrive_cart(buyer_id)
        let delete_process = carts.map(item => delete_cart_with_id(item.cart_id))
        let response = await Promise.all(delete_process).then(result => result)
        let bool_check = response.includes(false)
        return !bool_check ? ({bool: true}) : ({bool: false})

      }else{console.log(result,'error occcured creating order')}

    })

    .then(async(result) => {
      result.bool 
      ? 
      console.log(result, 'creating room') 
      : 
      console.log(result,'error occcured before creating room') 

      if(result.bool && immediate_purchase === 'true'){
        let seller_id = retrieve_seller(product_id)
        let room_response = create_room_id(seller_id,buyer_id)
        return room_response ? ({bool: true}) : ({bool: false})

      }else if(result.bool && immediate_purchase !== 'true'){
        let carts = await retrive_cart(buyer_id)
        let seller_ids = await carts.map((item) => retrieve_seller(item.product_id))
        let id_list = await Promise.all(seller_ids).then(result => result)
        let response = id_list.map(seller_id => create_room_id(seller_id,buyer_id))
        let data = await Promise.all(response).then(result => result)
        let bool_check = data.includes(false)
        return !bool_check ? ({bool: true}) : ({bool: false})
      }else{
        console.log(result,'error occcured creating order') 
      }

    })

    .then(async(result) => {
      result.bool 
      ? 
      console.log(result, 'sending proposal meta data') 
      : 
      console.log(result,'error occcured before sending proposal meta data') 

      if(result.bool && immediate_purchase === 'true'){
        let seller_id= await retrieve_seller(product_id)
        let room_id = retrieve_room(buyer_id,seller_id)
        let mssg = send_proposal_meta_data(room_id,buyer_id,product_id)

        
        return mssg ? ({bool: true, room_id}) : ({bool: false,room_id})
      }else if(result.bool && immediate_purchase !== 'true'){
        let carts = await retrive_cart(buyer_id)
        let seller_ids = await carts.map(async(item) => await retrieve_seller(item.product_id))
        let seller_id_res = await Promise.all(seller_ids).then(result => result)
        let room = seller_id_res.map((seller_id) => retrieve_room(buyer_id,seller_id))
        let response = await Promise.all(room).then(result => result)
        let mssg = response.map(room_id => send_proposal_meta_data(room_id,buyer_id,product_id))
        let mssg_res = await Promise.all(mssg).then(result => result)
        let bool_check = mssg_res.filter(item => item.bool === false)
        return bool_check>0 ? ({bool: false, room_id}) : ({bool: true, room_id})
      }else{
        console.log(result,'error occcured creating order') 
      }
    })

    .then(async(result) => {
      result.bool 
      ? 
      console.log(result, 'sending message') 
      : 
      console.log(result,'error occcured before sending message')
      let mssg = await generate_mssg(`${item.fname + item.lname}`)

      if(result.bool && immediate_purchase === 'true'){

        let meta_datas = await retrieve_mssg_meta_data(buyer_id,result.room_id)
        let response = await send_proposal_message(meta_datas.message_id, mssg)
        return response ? ({bool: true}) : ({bool: false})

      }else if(result.bool && immediate_purchase !== 'true'){

        let meta_datas = await retrieve_mssg_meta_data(buyer_id,result.room_id)
        let response = await meta_datas.map(item => send_proposal_message(item.message_id, mssg))
        let mssg_res = await Promise.all(response).then(result => result)
        let bool_check = mssg_res.includes(false)
        return !bool_check ? ({bool: true}) : ({bool: false})

      }else{console.log(result,'error occcured creating order')}

      
    })

    .then((result) => {
      if(result.bool ){
        res.send(true); console.log(result, 'sending message') 
      }else{
        res.send(false); console.log(result,'error occcured before sending message')
      }
    })

    .catch(err => console.log(err))
  }

})









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
  const { v4: uuidv4, v4 } = require('uuid');
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

app.post("/buyer/create-order", parser, async(req,res) => {
  let {file,buyer_id} = req.body;
  function generate_mssg(name) {return(`Hi I Am ${name} And I Just Paid For The Item You Sell On Campus Express, Please Chat Me Up When Availble.
      Thanks.`)}
  // store transaction
  // update buyer balance
  // create order
  // update product sataus (set status to ordered)
  // create chat room
  
  new Promise(async(resolve, reject) => { 
    let response = await record_transacction(file,buyer_id); 
    response.bool ? resolve(response) : reject(response)
  })

  .then(async(result) => {
    
    result.bool ? console.log(result, 'updating buyer wallet') : console.log(result,'error occcured before updating buyer wallet') 
    let response = await update_buyer_wallet(file,buyer_id)
    return response ? (response) : (response)

  })

  .then(async(result) => {
    result.bool ? console.log(result, 'creating order') : console.log(result,'error occcured before creating order') 
    let carts = await retrive_cart(buyer_id)
    let response = await carts.map(item => create_order(item.product_id, item.unit, buyer_id))
    let data = await Promise.all(response).then(result => result)
    let bool_check = data.includes(false)
    return !bool_check ? ({bool: true}) : ({bool: false})

  })

  .then(async(result) => {
    result.bool ? console.log(result, 'crearting room') : console.log(result,'error occcured before crearting room') 
    let carts = await retrive_cart(buyer_id)
    let seller_ids = await carts.map((item) => retrieve_seller(item.product_id))
    let id_doc = await Promise.all(seller_ids).then(result => result)
    let response = id_doc.map(seller_id => create_room_id(seller_id,buyer_id))
    let data = await Promise.all(response).then(result => result)
    let bool_check = data.includes(false)
    return !bool_check ? ({bool: true}) : ({bool: false})
  })

  .then(async(result) => {
    result.bool ? console.log(result, 'sending proposal meta data') : console.log(result,'error occcured before sending proposal meta data') 
    let carts = await retrive_cart(buyer_id)
    let seller_ids = await carts.map(async(item) => await retrieve_seller(item.product_id))
    let seller_id_res = await Promise.all(seller_ids).then(result => result)
    let room = seller_id_res.map((seller_id) => retrieve_room(buyer_id,seller_id))
    let response = await Promise.all(room).then(result => result)
    let mssg = response.map(room_id => send_proposal_meta_data(room_id,buyer_id))
    let mssg_res = await Promise.all(mssg).then(result => result)
    console.log(mssg_res)
    let bool_check = mssg_res.filter(item => item.bool === false)
    return bool_check>0 ? ({bool: false}) : ({bool: true})
  })

  .then(async(result) => {
    result.bool ? console.log(result, 'sending message') : console.log(result,'error occcured before sending message') 
    let buyers = await retrieve_buyer(buyer_id)
    let mssg = await buyers.map(item => generate_mssg(`${item.fname + item.lname}`))
    let meta_datas = await retrieve_mssg_meta_data(buyer_id)
    let response = await meta_datas.map(item => send_proposal_message(item.message_id, mssg))
    let mssg_res = await Promise.all(response).then(result => result)
    let bool_check = mssg_res.includes(false)
    return !bool_check ? ({bool: true}) : ({bool: false})
  })

  .then((result) => {

  })

  .catch(err => console.log(err))
})





process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});
// 
// const axios = require('axios');

const apiUrl = 'https://my.kudisms.net/api';

const requestData = {
  token: 'rXdAgTsFBOS8ECK7MZk1i6WojUmqy9unDv34cQablpz0JLHhIV5NfPG2teYwxR',
  senderID: 'CampusXpres',
  recipients: '2348032639894',
  message: 'Testing right from Node.js',
};

axios.post(apiUrl, requestData)
  .then(response => {   
    console.log('Response:', response.data);  
  })
  .catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });




  // {
  //   event: 'charge.completed',
  //   data: {
  //     id: 1225245473,
  //     tx_ref: '1705765425936',
  //     flw_ref: '000015240120164445622193005942',
  //     device_fingerprint: 'c8aa717b08b3886a793db19aa6566e3b',
  //     amount: 396,
  //     currency: 'NGN',
  //     charged_amount: 396,
  //     app_fee: 5.55,
  //     merchant_fee: 0,
  //     processor_response: 'success',
  //     auth_model: 'AUTH',
  //     ip: '102.89.22.19',
  //     narration: 'Campus Express',
  //     status: 'successful',
  //     payment_type: 'bank_transfer',
  //     created_at: '2024-01-20T15:44:52.000Z',
  //     account_id: 2852138,
  //     customer: {
  //       id: 770776339,
  //       name: 'Akpulu Chinedu',
  //       phone_number: '8032639894',
  //       email: 'akpulufabian@gmail.com',
  //       created_at: '2024-01-19T14:35:39.000Z'
  //     }
  //   },
  //   'event.type': 'BANK_TRANSFER_TRANSACTION'
  // }

  // let resource = payload.data;

  // let name = resource.customer.name
  // let phone = resource.customer.phone
  // let email = resource.customer.email
  // let created_at = resource.customer.created_at