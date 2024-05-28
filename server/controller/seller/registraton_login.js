const { NeonDB } = require("../../db");
const { express,path,fs,parser,mocha,morgan,cors,shortId,jwt,io,bcrypt} = require('../../modules');
const maxAge = 90 * 24 * 60 * 60; 

const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
       expiresIn: maxAge
    });
};
async function register_seller(req,res) {

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

    async function CreateNewShop(params) {
        let shop_id = shortId.generate()
        NeonDB.then((pool) => 
        pool.query(`insert into campus_shop (
            id,
            shop_id,
            shop_title,
            shop_description,
            seller_id,
            inventory,
            reviews,
            isActive,
            isEmpty,
            subscription,
            date,
            coin
            ) 
            values(
            DEFAULT,
            '${shop_id}',
            '',
            '',
            '${seller_id}',
            '',
            '',
            ${true},
            ${true},
            ${0},
            '${new Date()}',
            ${100}
            )` 
        )
        .then(result => result.rowCount > 0 ? true : false))
        .catch(err => {
            console.log(err)
        }).catch(err => console.log(err))
        
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
            let newSellerShop = result ? CreateNewShop() : false;
            return(newSellerShop ? (true) : (false))
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

async function log_seller_in(req, res) {

    
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
            console.log(auth)
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

module.exports ={
    register_seller,
    log_seller_in
}