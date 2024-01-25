const { file } = require("googleapis/build/src/apis/file");
const { NeonDB } = require("../db");

const { shortId, bcrypt, jwt } = require("../modules");
const uploadMedia = require("../youtube");
const { check_seller_actions, upload_meta_data, upload_photos } = require("../Functions/upload_items");
const { retrieve_buyer, retrieve_mssg_meta_data, retrieve_mssg_meta_data_via_room } = require("../Functions/cart");
const { send_proposal_message } = require("../product_payment/send_mssg");
const maxAge = 90 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
        expiresIn: maxAge
    });
};
require('dotenv').config();

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

    console.log(fname,lname,state,campus,seller_id)

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

async function uploadProduct(req,res) {

    let {constantData, dynamicData}= req.body;

    Object.keys(dynamicData).forEach(key => {
        if (dynamicData[key] === '') {
          delete dynamicData[key];
        }
    });

    let date = new Date();
    let productId = shortId.generate()
    let imageId = shortId.generate();
    let book = []

    let replacedDescription = constantData.description.replace(/'/g, '"');
    let replacedTitle = constantData.title.replace(/'/g, '"');

    let meta_data_respons = await upload_meta_data(replacedTitle,replacedDescription,constantData.category,constantData.price,constantData.seller_id,productId,dynamicData)
    
    if(meta_data_respons){
        let photoresponse = upload_photos(productId, constantData.seller_id, constantData.photos, imageId)
        
        if(photoresponse){
            res.send(true)
        }
    }

    
    // console.log(data)
    
}

function DeleteProduct(req,res) {
    let {
        seller_id,product_id
    } = req.query;
    let book = []

    console.log( seller_id,product_id)

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM seller_shop WHERE product_id = '${product_id}'  `)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log('mssg',err))
        )
        .catch(err => console.log('mssg',err))

    })
    .then((response) => 

        NeonDB.then((pool) => 
            pool.query(`DELETE FROM  product_photo WHERE product_id = '${product_id}' `)
            .then(result => result.rowCount > 0 ? book.push(true) : book.push(false))
            .catch(err => console.log('mssg',err))
        )    

    )
    .then(async(response) => {
        let bool = book.filter(item => item !== true)


        if(bool.length < 1){
            console.log('overview number', response)
            NeonDB.then((pool) => 
                pool.query(`UPDATE seller_overview set total_sale = total_sale - 1 WHERE seller_id = '${seller_id}'`)
                .then(result => result.rowCount > 0 ? res.send(true) : res.send(false))
                .catch(err => console.log('mssg',err))
            )
            .catch(err => console.log(err))
        }else{
            res.send(false)
        }

    })
    .catch(err => console.log('mssg',err))
}

function updateProduct(req,res) {

    let {
        title,description,category,price,photos,seller_id,product_id,others
    } = req.body;

    console.log(product_id)

    let date = new Date();
    let replacedDescription = description.replace(/'/g, '"');;
    let replacedTitle = title.replace(/'/g, '"');
    let book = []
    let imageId = shortId.generate();

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`UPDATE seller_shop set date='${date}', title='${replacedTitle}', category='${category}', others='${others}', price='${price}', description='${replacedDescription}' WHERE product_id = '${product_id}'`)
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
       
        photos.map(item => 
            NeonDB.then((pool) => 
                pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${product_id}', '${seller_id}', '${item}', '${imageId}')`)
                .then(result => {
                    console.log('jbkjbk',result)

                    result.rowCount > 0 ? book.push(true) : book.push(false)
                    if(book.length === photos.length){
                        res.send(true)
                    }
                })
                .catch(err => console.log(err))
            )    
        )

    })
    
    .catch(err => console.log('hbkhk',err))


}

async function RegisterSeller(req,res) {

    let {fname,lname,email,phone,pwd,state,campus} = req.body;
    // console.log(fname,lname,email,phone,pwd,state,campus)
    let date = new Date().toLocaleString();
    let isActive,isVerified,isEmailVerified,isPhoneVerified = false;
    let hPwd = await bcrypt.hash(pwd, 10)
    let seller_id = `CE-${shortId.generate()}`
    let wallet_id = `CEW-${seller_id}`

    async function CreateNewSeller(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_sellers(id,fname, lname,seller_id,email,phone,password,state,campus,isActive,isVerified,isEmailVerified,isPhoneVerified,date ) values(DEFAULT, '${fname}', '${lname}', '${seller_id}', '${email}', '${phone}', '${hPwd}', '${state}', '${campus}', '${false}','${false}','${false}','${false}', '${date}')`)
                .then(result => result.rowCount > 0 ?(true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }
    
    async function CreateNewSellerWallet(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_express_seller_wallet(id,wallet_id,seller_id,wallet_balance,wallet_pin,wallet_number,date) values(DEFAULT,'${wallet_id}','${seller_id}','${0.00}','${pwd}','${phone}','${date}')`)
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
                pool.query(`SELECt * FROM campus_sellers WHERE email = '${email}'`)
                .then(result => result.rows.length > 0 ? {err: 'duplicate email', bool: false} : {bool: true})
                .catch(err => (err))
            )
        )
    }

    async function checkPhone(params) {
        return(
            await NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_sellers WHERE phone = '${phone}'`)
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
            let newSeller = CreateNewSeller()
            return(newSeller ? (true) : (false))
        })
        .then((result) => {
            // console.log('wallet',result)
            let newSellerWallet = result ? CreateNewSellerWallet() : false;
            return(newSellerWallet ? (true) : (false))
        })
        .then((result) => {
            // console.log('email',result)
            let newSellerEmailToken = result ? SendEmail() : false;
            return(newSellerEmailToken ? (true) : (false))
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
        res.status(400).send({
            Mssg: "Email is not registered"
        })

    })
    
}

async function Overview(req,res)  {
    let {id} = req.body;
    

    async function getTotalSale(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where seller_id = '${id.trim()}'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function getSold(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where seller_id = '${id.trim()}' AND status = 'sold'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function getUnsold(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where seller_id = '${id.trim()}' AND status = 'unsold'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function getReport(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from product_report where seller_id = '${id.trim()}'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    res.send({total_sale: await getTotalSale(), total_sold: await getSold(),total_unsold: await getUnsold(), total_reported: await getReport()})
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
                    
                    www.campusexpressng.com/seller/password-reset/${token}?seller_id=${seller_id}
                    
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

async function updatePwd(req,res) {
    let {seller_id, pwd} = req.body;
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_sellers set password='${hPwd}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function GetSellerInbox(req,res) {
    let {seller_id} = req.body;
    
    
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM seller_inbox  WHERE seller_id = '${seller_id}'`)
        .then(result => {
            res.send(result.rows)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function GetSellerOrder(req,res) {
    let {seller_id} = req.body;
    
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM seller_orders  WHERE seller_id = '${seller_id}'`)
        .then(result => {
            res.send(result.rows)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function SendEmail(req,res) {

    let {email} = req.body;
    console.log(email)
    let date = new Date()
    async function SendEmail(params) {
        let token = shortId.generate()

        function createEmailToken(params) {
            return(
                NeonDB.then((pool) => 
                    pool.query(`insert into email_token(id,email,user_id,token,date) values(DEFAULT,'${email}','','${token}','${date}')`)
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
                subject: 'Email Verification',
                html: ` 
    
                    Hello Dear,
                    
                    Thank you for choosing Campus Express Nigeria! 
                    To complete your Email Verification, please click the link below:
                    
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

    SendEmail()
}

async function get_chats(req,res) {
    let {seller_id} = req.body;
    console.log(seller_id)
    
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM room_id `)
        .then(async(result) => {
            let chat_box = [];

            let seller = result.rows.filter(item => JSON.parse((item).members_id).seller_id === seller_id);


            let extracted_buyers_id = [...new Set(seller.map(item => JSON.parse((item).members_id).buyer_id))];
            let get_buyers_data_via_id = extracted_buyers_id.map( id => retrieve_buyer(id))
            let response = await  Promise.all(get_buyers_data_via_id).then(result => result)

            response.map(item => chat_box.push({buyer_id: item[0].buyer_id, buyer_name: item[0].fname + " " + item[0].lname, mssg: []}))
            let buyer_s_inital = response.map(item => item[0].fname + " " + item[0].lname)



            let room_id = [...new Set(seller.map(item => item.room_id))];
            let mssgs_meta_data = chat_box.map(item => retrieve_mssg_meta_data(item.buyer_id))
            let mssg_res = await  Promise.all(mssgs_meta_data).then(result => result)

            let chat_ids = chat_box.map(item => item.buyer_id)

            

            chat_ids.map((item) => {
                let results = mssg_res[0].map(mssg => {
                    if(mssg.sender_id === item){
                        let i = chat_box.map(data => data.buyer_id).indexOf(item)
                        chat_box[i].mssg.push(mssg)
                    }
                })
            })

            
            res.send({chat_box})


        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function get_mssgs(req,res) {
    let {mssg_id} = req.body;
    console.log(mssg_id)
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM messages WHERE message_id = '${mssg_id}' `)
        .then((result) => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function send_mssgs(req,res) {
    let {mssg_id} = req.body;
    console.log(mssg_id)
    send_proposal_meta_data(room_id,seller_id)
    send_proposal_message(mssg_id, mssg)
    
}


module.exports = {send_mssgs,get_chats,get_mssgs,uploadProduct,SendEmail,updatePwd,GetEditedItem,GetSeller,Shop,RegisterSeller,updateSellerProfile,WalletData,LogSellerIn,Overview,updateProduct,ResetPwd,DeleteProduct,GetSellerInbox,GetSellerOrder}