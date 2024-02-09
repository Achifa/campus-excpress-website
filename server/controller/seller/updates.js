const { NeonDB } = require("../../db");
const { bcrypt, shortId } = require("../../modules");

function update_seller_profile(req,res) {
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

function update_product(req,res) {

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
    
    .catch(err => console.log('error messafe from updating product: ',err))


}


async function update_pwd(req,res) {
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


async function reset_pwd(req,res){

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
            secure: false, // Set to true if using SSL/TLS
                auth: { 
                    user: 'campus-express@campusexpressng.com', // Replace with your email address
                    pass: 'A!nianuli82003', // Replace with your email password or app-specific password
                },
            }); 
    
            // Email content 
            const mailOptions = {
                from: 'campus-express@campusexpressng.com', // Replace with your email address
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

module.exports={
    update_seller_profile,
    update_product,
    update_pwd,
    reset_pwd
}