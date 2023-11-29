const { NeonDB } = require("../db");
const { shortId, bcrypt, jwt } = require("../modules");
const maxAge = 90 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
        expiresIn: maxAge
    });
};
require('dotenv').config();

// async function SendTokenViaEmail(req,res) {
//     let {email,fname,lname} = req.body;
//     const { MailtrapClient } = require("mailtrap");

//     const TOKEN = process.env.EMAIL_TOKEN;
//     let key = shortId.generate()
//     const ENDPOINT = "https://send.api.mailtrap.io/";

//     const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

//     const sender = {
//     email: "campusexpressnaija@gmail.com",
//     name: "Campus Express Nigeria",
//     };
//     const recipients = [
//         {
//             email: email,
//         }
//     ];

//     client
//     .send({
//         from: sender,
//         to: recipients,
//         subject: "Campus Express Email Verification",
//         text: `

//         Dear ${fname} ${lname},
        
//         Thank you for signing up with Campus Express Nigeria! We're thrilled to have you on board.
        
//         To ensure the security of your account and activate your subscription, we need to verify your email address. Please copy and paste the Token below in the field provided to complete the verification process:
        
//         ${key}
        
//         Once your email address is verified, you'll have full access to all the features and benefits of our platform.
        
//         If you did not sign up for Campus Express Nigeria, please ignore this email. Someone may have entered your email address by mistake.
        
//         If you have any questions or need assistance, feel free to reply to this email, and our support team will be happy to help.
        
//         Thank you for choosing Campus Express Nigeria.
        
//         Best regards,
//         Campus Express Nigeria
//         `,
//         category: "Email Verification",
//     })
//     .then(console.log, console.error);
// }

async function GetSeller(req,res) {
    let {seller_id} = req.body;
    NeonDB.then((pool) => 
        pool.query(`SELECt * FROM campus_sellers WHERE seller_id = '${seller_id}'`)
        .then(result => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

function updateSellerProfile(req,res) {
    let {
        fname,lname,state,campus,seller_id
    } = req.body;

    let date = new Date();

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`UPDATE campus_sellers set date='${date}', fname='${fname}', lname='${lname}', state='${state}', campus='${campus}' WHERE seller_id = '${seller_id}'`)
            .then(result => {
                result.rowCount > 0 ? resolve(true) : reject(false)
            })
            .catch(err => console.log(err))
        )
        .then((result) => res.send(result))
        .catch(err => console.log(err))

    })
   
    .catch(err => console.log(err))
}

function uploadProduct(req,res) {

    let {
        productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos,seller_id
    } = req.body;

    let date = new Date();
    let productId = shortId.generate()
    let description = productDescription.replace(/'/g, '"');;
    let title = productTitle.replace(/'/g, '"');;
    let imageId = shortId.generate();
    let book = []

    new Promise((resolve, reject) => {
        let uploadData = NeonDB.then((pool) => 
            pool.query(`insert into seller_shop (id,product_id,date,seller_id,title,category,type,condition,stock,locale,price,description,package) values(DEFAULT, '${productId}', '${date}', '${seller_id}', '${title}', '${productCategory}', '${productType}', '${productCondition}', '${productStock}', '${productLocale}', '${productPrice}', '${description}', '${productPackage}' )`)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    })
    .then((response) => 

        productPhotos.map(item => 
            NeonDB.then((pool) => 
                pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
                .then(result => result.rowCount > 0 ? book.push(true) : book.push(false))
                .catch(err => console.log(err))
            )    
        )

    )
    .then(async(response) => {
        let bool = book.filter(item => item !== true)


        if(bool.length < 1){
            console.log('overview number', response)
            NeonDB.then((pool) => 
                pool.query(`UPDATE seller_overview set total_sale = total_sale + 1 WHERE seller_id = '${seller_id}'`)
                .then(result => result.rowCount > 0 ? res.send(true) : res.send(false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        }else{
            res.send(false)
        }

    })
    .catch(err => console.log(err))


}

function updateProduct(req,res) {

    let {
        productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos,seller_id,product_id
    } = req.body;

    let date = new Date();
    let description = productDescription.replace(/'/g, '"');;
    let title = productTitle.replace(/'/g, '"');;
    let book = []
    let imageId = shortId.generate();

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`UPDATE seller_shop set date='${date}', title='${title}', category='${productCategory}', type='${productType}', condition='${productCondition}', stock='${productStock}', locale='${productLocale}', price='${productPrice}', description='${description}' WHERE product_id = '${product_id}'`)
            .then(result => {
                result.rowCount > 0 ? resolve(true) : reject(false)
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    })
    .then((response) => 

        response
        ?
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM product_photo WHERE product_id = '${product_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )  
        : 
        false
    )
    .then(async(response) => {
       
        productPhotos.map(item => 
            NeonDB.then((pool) => 
                pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${product_id}', '${seller_id}', '${item}', '${imageId}')`)
                .then(result => {
                    console.log(result)

                    result.rowCount > 0 ? book.push(true) : book.push(false)
                    if(book.length === productPhotos.length){
                        res.send(true)
                    }
                })
                .catch(err => console.log(err))
            )    
        )

    })
    
    .catch(err => console.log(err))


}

async function RegisterSeller(req,res) {

    let {fname,lname,email,phone,pwd,state,campus} = req.body;
    console.log(fname,lname,email,phone,pwd,state,campus)
    let date = new Date().toLocaleString();
    let isActive,isVerified,isEmailVerified,isPhoneVerified = false;
    let hPwd = await bcrypt.hash(pwd, 10)
    let seller_id = `CE-${shortId.generate()}`
    let wallet_id = `CEW-${seller_id}`

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`insert into campus_sellers(id,fname, lname,seller_id,email,phone,password,state,campus,isActive,isVerified,isEmailVerified,isPhoneVerified,date ) values(DEFAULT, '${fname}', '${lname}', '${seller_id}', '${email}', '${phone}', '${hPwd}', '${state}', '${campus}', '${false}','${false}','${false}','${false}', '${date}')`)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    })
    .then((response) => 
        response
        ?
            NeonDB.then((pool) => 
                pool.query(`insert into seller_overview(id,seller_id,total_reported,total_sale,total_sold,total_unsold) values(DEFAULT,'${seller_id}',${0},${0},${0},${0})`)
                .then(result => result.rowCount > 0 ? true : false)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        :
            res.send(false)
    )
    .then((response) => {
        if(response){
            NeonDB.then((pool) => 
                pool.query(`insert into campus_seller_wallets(id,wallet_id,seller_id,wallet_balance,wallet_pin,wallet_number,date) values(DEFAULT,'${wallet_id}','${seller_id}','${0.00}','${pwd}','${phone}','${date}'`)
                .then(result => result.rowCount > 0 ? res.send(true) : res.send(false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        }else{
            res.send(false)
        }
    })
    .catch(err =>  {console.log(err), res.send(false)})
    

}

async function LogSellerIn(req, res) {

    
    let {email,pwd} = req.body;
 
    new Promise((resolve, reject) => {
        NeonDB
        .then(async(pool) => {
                
            pool.query(`select "id" from "campus_sellers" where "email" = '${email}'`, (err, result) => {
                
                if(!err){
                    if(result.rows.length > 0){
                        const id = result.rows[0].id;
                        resolve(id)
                    }else{
                        
                        reject({Mssg: "Email is not registered..."});
                    }
                }else{
                    console.log(err)
                }
                
            })
            
        });
    })
    .then(async(id) => {
        return(
            NeonDB
            .then(async(pool) => {
                let database_return_value = await pool.query(
                    `select "seller_id","email","password","fname","lname" from  "campus_sellers" where "id" = '${id}'`
                )
                .then(result => result.rows[0])
                .catch(err => console.log(err))

                return database_return_value
            })
        )
        
    })
    .then(async(user) => {
        if(user){
            console.log(email,pwd)
            const auth = await bcrypt.compare(pwd, user.password);
            if (auth) {
                const token = createToken(user.seller_id);
                res.status(200).send({bool: true, id: user.seller_id, name: `${user.fname[0]}.${user.lname[0]}`});
    
            }else{
                res.status(400).send({
                    Mssg: "Invalid password"
                })
            }
        }else{
            res.status(400).send({
                Mssg: "Email is not registered"
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
    
}

async function Overview(req,res)  {
    let {id} = req.body;
    NeonDB.then((pool) => 
        pool.query(`select * from seller_overview where seller_id = '${id.trim()}'`)
        .then(result => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function Shop(req,res)  {
    let {id} = req.body;
    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop where seller_id = '${id}'`)
        .then(result => res.send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function WalletData(req,res)  {
    let {seller_id} = req.body;

    function walletBalance() {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from campus_express_seller_wallet where seller_id = '${seller_id}'`)
                .then(result => result.rows)
                .catch(err => console.log(err))
                )
            .catch(err => console.log(err))
        )
    }

    function Transactions() {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from campus_express_seller_transactions where seller_id = '${seller_id}'`)
                .then(result => result.rows)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let wallet = await walletBalance()
    let documents = await Transactions()


    res.send({walletBalance: wallet, TransactionHistory: documents})

}

async function GetEditedItem(req,res)  {
    let {product_id} = req.query;
    function getMetadata(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where product_id = '${product_id}'`)
                .then(result => (result.rows))
                .catch(err => {
                    console.log(err)
                })
            )
            .catch(err => {
                console.log(err)
            })
        )
    }

    function getThumnails(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`select file from product_photo where product_id = '${product_id}'`)
                .then(result => (result.rows))
                .catch(err => {
                    console.log(err)
                })
            )
            .catch(err => {
                console.log(err)
            })
        )
    }

    let meta_data = await getMetadata()
    let photos = await getThumnails()

    res.status(200).send({meta_data, photos})
}

module.exports = {uploadProduct,GetEditedItem,GetSeller,Shop,RegisterSeller,updateSellerProfile,WalletData,LogSellerIn,Overview,updateProduct}
