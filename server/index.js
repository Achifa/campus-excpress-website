const { express,path,fs,parser,mocha,morgan,cors,shortId,jwt,io} = require('./modules');
const {NeonDB} = require('./db');
const {seller_route} = require('./route/seller')
const {admin_route} = require('./route/admin')
const cookieParser = require('cookie-parser');
const { buyer_route } = require('./route/buyer');
const greetingTime = require("greeting-time");
const { default: axios } = require('axios');
const { retrieve_room, retrieve_seller,     retrieve_products } = require('./utils');
const { 
    adsMail
} = require("./templates");
// const { v4 } = require('uuid');
   
greetingTime(new Date());
require('dotenv').config();    

const app = express();  
app.use(cookieParser());
// app.use(morgan('dev'));   

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
io(server, {cors: {origin: '*'}}).on('connection',(socket) => {
  
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


app.post("/bank-verification", parser, (req,res) => {
  let {acctNum,Bank} = req.body;

  console.log('dara:',req.body)

  const Flutterwave = require('flutterwave-node-v3');
    const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
    const details = {
      account_number: acctNum,
      account_bank: Bank
    };
    flw.Misc.verify_Account(details)
    .then(result => result.status === 'success' ? res.status(200).send({name:result.data.account_name}) : res.status(503).send('error'))
    .catch(err => console.log(err));

})

app.post("/transfer", parser, async(req,res) => { 
  let {withdrwawalAmount,acctNum,Bank,acctName} = req.body;
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

app.post('/share-image', parser, (req,res) => {

  let {user} = req.body;

  let user_id = JSON.parse(user.id)
  let dates = JSON.parse(user.date)
  let counts = JSON.parse(user.visits)
  NeonDB.then((pool) => 
    pool.query(`INSERT INTO visitors(id, user_id, dates, counts, isRegistered, buyer_id) values(DEFAULT, ${user_id}, ${JSON.stringify(dates)}, ${counts})`)
    .then(result => res.send(result.rows[0].file))
    .catch(err => {
      console.log(err)
    })
  )
  .catch(err => console.log(err))
 
  
})

app.get('/share-image', (req,res) => {
  // let {product_id} = req.query;
  // NeonDB.then((pool) => 
  //     pool.query(`SELECt * FROM product_photo WHERE product_id = '${product_id}'`)
  //     .then(result => res.send(result.rows[0].file))
  //     .catch(err => {
  //       console.log(err)
  //     })
  //   )
  //   .catch(err => console.log(err))

  
})


process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use  
});









// Copyright 2016 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * Usage: node upload.js PATH_TO_VIDEO_FILE
 */

const readline = require('readline'); 
const {google} = require('googleapis');

// initialize the Youtube API library
const youtube = google.youtube('v3');
// very basic example of uploading a video to youtube
async function runSample(fileName) {
    // Initialize Google APIs with a service account
  const { google } = require('googleapis');
  const keyFile = require('./campus-express-410317-b07ed9c87f70.json'); // Path to your service account key file
  let keyFileContent = keyFile;


  // Load credentials from the service account key object
  const auth = new google.auth.GoogleAuth({
    credentials: keyFileContent,
    scopes: [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube',
    ],
  });

  // Obtain the authenticated client
  const client = await auth.getClient();
  google.options({ auth: client });

  const fileSize = fs.statSync(fileName).size;
  const res = await youtube.videos.insert( 
    {
      part: 'id,snippet,status',
      notifySubscribers: false,
      requestBody: { 
        snippet: {
          title: 'Node.js YouTube Upload Test',
          description: 'Testing YouTube upload via Google APIs Node.js Client',
        },
        status: {
          privacyStatus: 'public',
        },
      },
      media: {
        body: fs.createReadStream(fileName),
      },
    },
    { 
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0, null);
        process.stdout.write(`${Math.round(progress)}% complete`);
      },
    }
  ); 
  console.log('\n\n');
  console.log('res data: ', res.data);
  return res.data;
}

// if (module === require.main) {
//   const fileName = process.argv[2]; 
//   runSample('./vids/VID_20240403_071234.mp4').catch(console.error);
// }

// runSample('./vids/VID_20240403_071234.mp4'); 