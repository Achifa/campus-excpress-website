const { NeonDB } = require('../db');

async function send_email(email, mssg, subject) {
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
        subject: subject,
        html: mssg
    };

    // Send the email
    let sender = await transporter.sendMail(mailOptions)
    .then(info => true)
    .catch(err => err)

    return(sender)
}

function send_sms(params) {
    
}

function create_inbox(params) {
    return(
        NeonDB.then((pool) => 
            pool.query(``)
            .then(result => result.rowCount > 0 ? true : false)
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

function create_notice(user_id, mssg, date) {
    return(
        NeonDB.then((pool) => 
            pool.query(`insert into campus_notice(id, user_id, mssg, date) values(DEFAULT, '${user_id}', '${mssg}', '${date}')`)
            .then(result => result.rowCount > 0 ? true : false)
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

function create_inbox(subject, user_id, role, content) {
    return(
        NeonDB.then((pool) => 
            pool.query(``)
            .then(result => result.rowCount > 0 ? true : false)
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}


module.exports ={
    send_email,
    create_notice
}