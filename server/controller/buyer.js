const { NeonDB } = require("../db");
const { shortId, bcrypt, jwt } = require("../modules");
const maxAge = 90 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
        expiresIn: maxAge
    });
};

async function RegisterBuyer(req,res) {

    let {fname,lname,email,phone,pwd,state,campus} = req.body;
    console.log(fname,lname,email,phone,pwd,state,campus)
    let date = new Date().toLocaleString();
    let isActive,isVerified,isEmailVerified,isPhoneVerified = false;
    let hPwd = await bcrypt.hash(pwd, 10)
    let buyer_id = `CE-${shortId.generate()}`
    let wallet_id = `CEW-${buyer_id}`

    async function CreateNewBuyer(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_buyers(id,fname, lname,buyer_id,email,phone,password,state,campus,isActive,isVerified,isEmailVerified,isPhoneVerified,date ) values(DEFAULT, '${fname}', '${lname}', '${buyer_id}', '${email}', '${phone}', '${hPwd}', '${state}', '${campus}', '${false}','${false}','${false}','${false}', '${date}')`)
                .then(result => result.rowCount > 0 ?(true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }
    
    async function CreateNewBuyerWallet(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_express_buyer_wallet(id,wallet_id,buyer_id,wallet_balance,wallet_pin,wallet_number,date) values(DEFAULT,'${wallet_id}','${buyer_id}','${0.00}','${pwd}','${phone}','${date}')`)
                .then(result => result.rowCount > 0 ? true : false)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }
    
    async function SendEmail(params) {
        let token = shortId.generate()
    
        function createEmailToken(params) {
            return(
                NeonDB.then((pool) => 
                    pool.query(`insert into email_token(id,email,user_id,token,date) values(DEFAULT, '${email}', '${seller_id}', '${token}', '${date}')`)
                    .then(result => (result.rowCount))
                    .catch(err => {
                        console.log(err)
                    })
                )
                .catch(err => {
                    console.log(err)
                })
            )
        }
    
        function sendEmailToken(params) {
            const nodemailer = require('nodemailer');
    
            // Create a transporter using SMTP
            const transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',  // Replace with your SMTP server hostname
            port: 465, // Replace with your SMTP server port
            secure: true, // Set to true if using SSL/TLS
            auth: { 
                user: 'security-team@campusexpressng.com', // Replace with your email address
                pass: 'A!nianuli82003', // Replace with your email password or app-specific password
            },
            }); 
    
            // Email content 
            const mailOptions = {
                from: 'security-team@campusexpressng.com', // Replace with your email address
                to: `${email}`, // Replace with the recipient's email address
                subject: 'Verify Your Email Address',
                text: ` 
    
                    Hello Dear,
                    
                    Thank you for choosing Campus Express Nigeria! To complete your Email Verification, please click the link below:
                    
                    www.campusexpressng.com/email-verification/${token}?email=${email}
                    
                    This link is valid for 5 minutes. Please do not share this link with anyone, as it is used for identity verification purposes only.
                    
                    If you did not initiate this action, please contact our support team immediately.
                    
                    Thank you for using Campus Express Nigeria.
                    
                    Best regards,
                    Campus Express Nigeria. 
                `
            };
    
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
    
    
        }
    
        let response1 = await createEmailToken();

        if(response1 > 0){
            console.log(response1)
            let response2 = sendEmailToken();
            res.send(true)
        }

        function deleteToken(params) {
            NeonDB.then((pool) => 
                pool.query(`DELETE from email_token WHERE token = '${token}'`)
                .then(result => {
                    if(result.rowCount > 0){
                        res.send(true)
                    }else{
                        res.send(false)
                    }
                })
                .catch(err => {
                    console.log(err)
    
                })
            )
            .catch(err => {
                console.log(err)
            })
        }

        setTimeout(deleteToken, 300000)
      
    }

    async function checkEmail(params) {
        return(
            await NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_buyers WHERE email = '${email}'`)
                .then(result => result.rows.length > 0 ? {err: 'duplicate email', bool: false} : {bool: true})
                .catch(err => (err))
            )
        )
    }

    async function checkPhone(params) {
        return(
            await NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_buyers WHERE phone = '${phone}'`)
                .then(result => result.rows.length > 0 ? {err: 'duplicate phone', bool: false} : {bool: true})
                .catch(err => (err))
            )
        )
    }


 
    try{
        let email = await checkEmail(data => data)
        let phone = await checkPhone(data => data)
        new Promise((resolve, reject) => {
            

            
            console.log(email,phone)

            if(!email.bool){
                reject(email.err)
            }else if(!phone.bool){
                reject(phone.err)
            }else{
                resolve(true)
            }



        })
        .then((result) => {
            // console.log('overview',result)
            let newBuyer = CreateNewBuyer()
            return(newBuyer ? (true) : (false))
        })
        .then((result) => {
            // console.log('wallet',result)
            let newBuyerWallet = result ? CreateNewBuyerWallet() : false;
            return(newBuyerWallet ? (true) : (false))
        })
        .then((result) => {
            // console.log('email',result)
            let newBuyerEmailToken = result ? SendEmail() : false;
            return(newBuyerEmailToken ? (true) : (false))
        })
        
        .catch((err) => {
            // console.log(err)
            res.status(500).send(err)
        })
    }catch(err){
        // console.log(err)
        res.status(500).send(err)

    }
}

async function LogBuyerIn(req, res) {

    
    let {email,pwd} = req.body;
 
    new Promise((resolve, reject) => {
        NeonDB
        .then(async(pool) => {
                
            pool.query(`select "id" from "campus_buyers" where "email" = '${email}'`, (err, result) => {
                
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
                    `select "buyer_id","email","password","fname","lname" from  "campus_buyers" where "id" = '${id}'`
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
                res.status(200).send({bool: true, id: user.buyer_id, name: `${user.fname[0]}.${user.lname[0]}`});
    
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

async function GetBuyer(req,res) {
    let {buyer_id} = req.body;
    console.log(buyer_id)
    NeonDB.then((pool) => 
        pool.query(`SELECt * FROM campus_buyers WHERE buyer_id = '${buyer_id}'`)
        .then(result => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function GetItems(req,res) {

    let {category} = req.query;

    if(category === 'trends'){
        NeonDB.then((pool) => 
            pool.query(`select * from seller_shop`)
            .then(result =>  res.send(result.rows))
            .catch(err => console.log(err))
        )
    }else{
        NeonDB.then((pool) => 
            pool.query(`select * from seller_shop`)
            .then(result =>  res.send(result.rows.filter(item => item.category.toLowerCase() === category)))
            .catch(err => console.log(err))
        )
    }

    
    

}

async function GetLodges(req,res) {

    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop WHERE category = 'Lodge/Apartments'`)
        .then(result =>  res.send(result.rows))
        .catch(err => console.log(err))
    )

    
    

}

async function GetItem(req,res) {

    let {id} = req.query;

    let book = []

    function getItems(items) {
        items.map(data => {
            NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where product_id = '${data}'`)
                .then(result =>  {
                    book.push(result.rows[0])
                    if(book.length === id.length){
                        res.send(book)
                    }                    
                })
                .catch(err => console.log(err))
            )
        })
    }

    getItems(id)
    

}

async function GetItemImages(req,res) {

    let {id} = req.query;

    NeonDB.then((pool) => 
        pool.query(`select file from product_photo where product_id = '${id}'`)
        .then(result =>  res.send(result.rows))
        .catch(err => console.log(err))
    )
    

}

async function GetThumbnail(req,res) {

    let {product_id} = req.query;

    NeonDB.then((pool) => 
        pool.query(`select file from product_photo where product_id = '${product_id}'`)
        .then(result =>  res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    

}

async function AddToCart(req,res) {

    let {product_id,buyer_id} = req.body;

    console.log(product_id,buyer_id);
    
    let cart_id = shortId.generate();
    let date = new Date();

    function insert_() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_express_buyer_cart(id,cart_id,product_id,date,buyer_id,unit) values(DEFAULT, '${cart_id}', '${product_id}', '${date}', '${buyer_id}', ${1})`)
                .then(result => result.rowCount > 0 ? (true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function get_carts() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}'`)
                .then(result => res.send(result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let insertData = await insert_()
    if(insertData){
        let getData = await get_carts()
        res.send(getData)
    }

}

async function RemoveFromCart(req,res) {
    let {product_id,buyer_id} = req.query;
    console.log(buyer_id)
    let delete_ = () => 
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    let get_carts = () => 
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}'`)
            .then(result => result.rows)
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    let deleteData = await delete_()
    if(deleteData){
        let getData = await get_carts()
        res.send(getData)
    }
}

async function GetCart(req,res) {
    let {buyer_id} = req.query;
    console.log(buyer_id)
    function get_carts() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}'`)
                .then(result => res.send(result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let getData = await get_carts()
    res.send(getData)

}

async function GetCartItems(req,res) {

    let book = [];
    let {buyer_id} = req.query;

    console.log(buyer_id)
    function get_carts() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}'`)
                .then(result => result.rows)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function get_items(item) { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM seller_shop WHERE product_id = '${item.product_id}'`)
                .then(result => book.push({item: result.rows[0], cart:item}))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }


    async function getCartedItems(cb) {
        let carts = await get_carts()
        console.log(carts)

        cb(carts)
    }

    getCartedItems((carts) => {
        carts.map(async(item ) => {
            await get_items(item)
            console.log(book)
            if(book.length === carts.length){
                res.send(book)
            }
        })
    })

}

async function SaveItem(req,res) {

    let {product_id,buyer_id} = req.body;

    console.log(product_id,buyer_id);
    
    let savedItems_id = shortId.generate();
    let date = new Date();


    function insert_() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_express_buyer_saveditems(id,savedItems_id ,product_id ,date ,buyer_id) values(DEFAULT, '${savedItems_id}', '${product_id}', '${date}', '${buyer_id}')`)
                .then(result => result.rowCount > 0 ? (true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function get_carts() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}'`)
                .then(result => res.send(result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let insertData = await insert_()

    if(insertData){
        let getData = await get_carts()
        res.send(getData)
    }

}

async function UnSaveItem(req,res) {
    let {product_id,buyer_id} = req.query;
    console.log(buyer_id)
    let delete_ = () => 
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    let get_items = () => 
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}'`)
            .then(result => result.rows)
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    let deleteData = await delete_()

    if(deleteData){
        let getData = await get_items()
        res.send(getData)
    }
}

async function GetSavedItem(req,res) {
    let {buyer_id} = req.query;
    console.log(buyer_id)
    function get_carts() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}'`)
                .then(result => res.send(result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let getData = await get_carts()
    res.send(getData)

}

async function GetSavedItemsData(req,res) {

    let book = [];
    let {buyer_id} = req.query;

    console.log(buyer_id)
    function get_savedItems() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}'`)
                .then(result => result.rows)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function get_items(product_id) { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM seller_shop WHERE product_id = '${product_id}'`)
                .then(result => book.push(result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }


    async function getSavedItems(cb) {
        let savedData = await get_savedItems()
        console.log(savedData)

        cb(savedData)
    }

    getSavedItems((savedData) => {
        savedData.length > 0 
        ?
        savedData.map(async(item ) => {
            await get_items(item.product_id)
            if(book.length === savedData.length){
                res.send(book)
                console.log(book)
            }
        })
        :
        res.send([])
    })

}

function UpdateCart(req,res) {
    let {type,buyer_id,product_id} = req.body;
    function Add(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`UPDATE campus_express_buyer_cart set unit = unit + 1 WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
                .then(result => console.log(type,buyer_id,product_id))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function Minus(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`UPDATE campus_express_buyer_cart set unit = unit - 1 WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
                .then(result => result)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    if(type === 'add'){
        let result =  Add()
        res.send(result)
    }else{
        let result = Minus()
        res.send(result)
    }
}

function GetSearchWord(req,res) {
    let {word} = req.query;
    NeonDB.then((pool) => 
        pool.query(`select * from "seller_shop"`)
        .then((result) => {
            let list = result.rows;
            console.log(word)
            res.json(list.filter(item => item.title.toLowerCase().indexOf(word.toLowerCase()) > -1))
        })
        .catch((err) => {
            console.log(err)
        })
    )
    .catch(err => console.log(err))
}


async function ResetPwd(req,res){

    let {email,seller_id} = req.body;

    let date = new Date()
    async function SendEmail(params) {
        let token = shortId.generate()

        function createEmailToken(params) {
            return(
                NeonDB.then((pool) => 
                    pool.query(`insert into password_token(id,email,token,date) values(DEFAULT, '${email}', '${token}', '${date}')`)
                    .then(result => (result.rowCount))
                    .catch(err => {
                        console.log(err)
                    })
                )
                .catch(err => {
                    console.log(err)
                })
            )
        }

        function sendEmailToken(params) {
            const nodemailer = require('nodemailer');
    
            // Create a transporter using SMTP
            const transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',  // Replace with your SMTP server hostname
            port: 465, // Replace with your SMTP server port
            secure: true, // Set to true if using SSL/TLS
            auth: { 
                user: 'security-team@campusexpressng.com', // Replace with your email address
                pass: 'A!nianuli82003', // Replace with your email password or app-specific password
            },
            }); 
    
            // Email content 
            const mailOptions = {
                from: 'security-team@campusexpressng.com', // Replace with your email address
                to: `${email}`, // Replace with the recipient's email address
                subject: 'Password Reset',
                html: ` 
    
                    Hello Dear,
                    
                    Thank you for choosing Campus Express Nigeria! 
                    To complete your password reset, please click the link below:
                    
                    www.campusexpressng.com/buyer/password-reset/${token}?buyer_id=${buyer_id}
                    
                    This link is valid for 5 minutes. Please do not share this link with anyone, as it is used for identity verification purposes only.
                    
                    If you did not initiate this action, please contact our support team immediately.
                    
                    Thank you for using Campus Express Nigeria.
                    
                    Best regards,
                    Campus Express Nigeria. 
                `
            };
    
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
    
    
        }
    
        let response1 = await createEmailToken();

        if(response1 > 0){
            console.log(response1)
            let response2 = sendEmailToken();
            res.send(true)
        }
      
    }

    SendEmail()

    
}

async function SendEmail(params) {
    let token = shortId.generate()

    function createEmailToken(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into email_token(id,email,user_id,token,date) values(DEFAULT, '${email}', '${seller_id}', '${token}', '${date}')`)
                .then(result => (result.rowCount))
                .catch(err => {
                    console.log(err)
                })
            )
            .catch(err => {
                console.log(err)
            })
        )
    }

    function sendEmailToken(params) {
        const nodemailer = require('nodemailer');

        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
        host: 'mail.privateemail.com',  // Replace with your SMTP server hostname
        port: 465, // Replace with your SMTP server port
        secure: true, // Set to true if using SSL/TLS
        auth: { 
            user: 'security-team@campusexpressng.com', // Replace with your email address
            pass: 'A!nianuli82003', // Replace with your email password or app-specific password
        },
        }); 

        // Email content 
        const mailOptions = {
            from: 'security-team@campusexpressng.com', // Replace with your email address
            to: `${email}`, // Replace with the recipient's email address
            subject: 'Verify Your Email Address',
            text: ` 

                Hello Dear,
                
                Thank you for choosing Campus Express Nigeria! To complete your Email Verification, please click the link below:
                
                www.campusexpressng.com/email-verification/${token}?email=${email}
                
                This link is valid for 5 minutes. Please do not share this link with anyone, as it is used for identity verification purposes only.
                
                If you did not initiate this action, please contact our support team immediately.
                
                Thank you for using Campus Express Nigeria.
                
                Best regards,
                Campus Express Nigeria. 
            `
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });


    }

    let response1 = await createEmailToken();

    if(response1 > 0){
        console.log(response1)
        let response2 = sendEmailToken();
        res.send(true)
    }

    function deleteToken(params) {
        NeonDB.then((pool) => 
            pool.query(`DELETE from email_token WHERE token = '${token}'`)
            .then(result => {
                if(result.rowCount > 0){
                    res.send(true)
                }else{
                    res.send(false)
                }
            })
            .catch(err => {
                console.log(err)

            })
        )
        .catch(err => {
            console.log(err)
        })
    }

    setTimeout(deleteToken, 300000)
  
}

async function updatePwd(req,res) {
    
    let {seller_id, pwd} = req.body;
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_buyers set password='${hPwd}' WHERE buyer_id = '${buyer_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}


module.exports = {RegisterBuyer,GetLodges,LogBuyerIn,GetItems, GetItem, GetItemImages, GetThumbnail, AddToCart, RemoveFromCart, GetCart, GetCartItems, SaveItem, ResetPwd, UnSaveItem, GetSavedItem, GetSavedItemsData, GetBuyer, UpdateCart, GetSearchWord,SendEmail,updatePwd}



