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

