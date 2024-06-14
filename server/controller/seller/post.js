const { NeonDB } = require("../../db");
const { shortId, bcrypt, jwt } = require("../../modules");
const { verification_email, newItem } = require("../../templates");
const { upload_meta_data, upload_photos, send_email } = require("../../utils");



async function UploadNewItem(req,res) {

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
    // console.log('meta_data_respons: ', meta_data_respons)
    if(meta_data_respons){
        let photoresponse = upload_photos(productId, constantData.seller_id, constantData.photos, imageId)
        
        if(photoresponse){
            // res.send(true)

            let mail = newItem(constantData.category,constantData.price,constantData.category,constantData.title)
            send_email('New Item Published', mail);
            res.send(true)
        }else{
            res.send(false)
        } 
    }else{ 
        res.send(false)

    }

    
    // console.log(data)
    
}

async function SendEmail(req,res) {
    let {email, name, seller_id} = req.body;
    let token = shortId.generate()

    
    let emailMssg = await verification_email(token,email,name)

    function sendEmailToken() {
        const nodemailer = require('nodemailer');

        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
        host: 'mail.privateemail.com',  // Replace with your SMTP server hostname
        port: 465, // Replace with your SMTP server port
        secure: true, // Set to true if using SSL/TLS
        auth: { 
            user: 'campus-express@campusexpressng.com', // Replace with your email address
            pass: 'A!nianuli82003', // Replace with your email password or app-specific password
        },
        }); 

        // Email content 
        const mailOptions = {
            from: 'campus-express@campusexpressng.com', // Replace with your email address
            to: `${email}`, // Replace with the recipient's email address
            subject: 'Email Verification',
            html: emailMssg
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

    sendEmailToken()
}


async function SendSMS(req,res) {
    // Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
// const accountSid = "AC4b4493d78417349ac3732a5ff0a1cfb0";
// const authToken = "18d93ff8525d0909cdd5fa3c3a4d1bc7";
// const verifySid = "VAa50690af141238da3768aa80f203cf98";
// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: phone, channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: phone, code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
}

module.exports={
    UploadNewItem,
    SendEmail,
    SendSMS
} 