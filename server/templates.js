let verification_email = (token,email,name) => {
    return(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Email Template</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                color: #555555;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Campus Express Nigeria. </h1>
            <p>Hello ${name},</p>
            <p>Thank you for choosing Campus Express Nigeria! To complete your Email Verification, please click the link below:</p>
            <p>www.campusexpressng.com/email-verification/${token}?email=${email}</p>
            <p>This link is valid for 5 minutes. Please do not share this link with anyone, as it is used for identity verification purposes only.</p>
            <p>If you did not initiate this action, please contact our support team immediately.</p>
            <p>Thank you for using Campus Express Nigeria.</p>
            <p>Best regards,</p>
            <p>Akpulu Fabian<br>
            
            Campus Express Nigeria.</p>
            
        </div>
    </body>
    </html>
    `)

    

}

let pwd_reset = (token,seller_id,name) => {
    return(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Email Template</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                color: #555555;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            .button {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 20px;
                background-color: #FF4500;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Campus Express Nigeria. </h1>
            <p>Hello Dear,</p>
            <p>Thank you for choosing Campus Express Nigeria! To complete your password reset, please click the link below:</p>
            <button>
                <a href='www.campusexpressng.com/seller.password-reset?token=${token}&?seller_id=${seller_id}'>Reset Password</a>
            </button>
            <p>This link is valid for 5 minutes. Please do not share this link with anyone, as it is used for identity verification purposes only.</p>
            <p>If you did not initiate this action, please contact our support team immediately.</p>
            <p>Thank you for using Campus Express Nigeria.</p>
            <p>Best regards,</p>
            <p>CEO: Akpulu Fabian<br>
            
            Campus Express Nigeria.</p>
            
        </div>
    </body>
    </html>
    `)
}

module.exports={verification_email,pwd_reset}