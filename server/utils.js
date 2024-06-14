const { NeonDB } = require("./db");
const { shortId } = require("./modules");

async function retrieve_room(seller_id,buyer_id) {

    return(
 
        await NeonDB
        .then(pool => {
            return pool.query(`SELECT * FROM room_id`)
            .then(result => {
                let m = result?.rows; 
                let room = m.filter(item => JSON.parse(JSON.parse(item.members_id).seller_id === seller_id) && JSON.parse(JSON.parse(item.members_id).buyer_id === buyer_id));
                return room.map(item => ({room_id: item.room_id, buyer_id: JSON.parse(item.members_id).buyer_id }));
                // room.map(item => (item.room_id));
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    )
}

async function retrieve_room_with_buyer(buyer_id) {

    return(
 
        await NeonDB
        .then(pool => {
            return pool.query(`SELECT * FROM room_id`)
            .then(result => {
                let m = result?.rows; 
                let room = m.filter(item => JSON.parse(JSON.parse(item.members_id).buyer_id === buyer_id));
                return room.map(item => ({room_id: item.room_id, seller_id: JSON.parse(item.members_id).seller_id }));
                // room.map(item => (item.room_id));
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    )
}

async function retrieve_room_with_seller(seller_id) {

    return(
 
        await NeonDB
        .then(pool => {
            return pool.query(`SELECT * FROM room_id`)
            .then(result => {
                // console.log('seller room : ', result)

                let m = result?.rows; 
                let room = m.filter(item => JSON.parse(JSON.parse(item.members_id).seller_id === seller_id));
                // console.log('seller room : ', room)
                
                return room.map(item => ({room_id: item.room_id, buyer_id: JSON.parse(item.members_id).buyer_id }));
                // room.map(item => (item.room_id));
                
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    )
}


async function retrieve_buyer(buyer_id) {
    return(
        
        await NeonDB
        .then(pool => {
            // let conn = pool.connect();

            // if(conn){
                return pool.query(`SELECT * FROM campus_buyers WHERE buyer_id = '${buyer_id}'`)
                .then(result => result.rows[0])
                .catch(err => console.log(err))
            // }
        })
        .catch(err => console.log(err))
    )
}


async function retrieve_seller(seller_id) {
    return(
        
        await NeonDB
        .then(pool => {
            // let conn = pool.connect();

            // if(conn){
                return pool.query(`SELECT * FROM campus_sellers WHERE seller_id = '${seller_id}'`)
                .then(result => result.rows[0])
                .catch(err => console.log(err))
            // }
        })
        .catch(err => console.log(err))
    )
}


async function retrieve_message_meta_data(room_id) {
    return( 
        
        await NeonDB
        .then(pool => {
            // let conn = pool.connect();

            // if(conn){
                return pool.query(`SELECT * FROM messages_meta WHERE room_id = '${room_id}'`)
                .then(result => result?.rows) 
                .catch(err => console.log(err))
            // } 
        })
        .catch(err => console.log(err)) 
    )
}


async function retrieve_message_meta_data_with_type(room_id) {
    return( 
        
        await NeonDB
        .then(pool => {
            // let conn = pool.connect();

            // if(conn){
                return pool.query(`SELECT * FROM messages_meta WHERE room_id = '${room_id}' AND mssg_type = 'text'`)
                .then(result => result?.rows) 
                .catch(err => console.log(err))
            // } 
        })
        .catch(err => console.log(err)) 
    )
}

async function retrieve_message(mssg_id) {

    return(
        await NeonDB
        .then(pool => 
            pool.query(`SELECT * FROM messages WHERE mssg_id = '${mssg_id}'`)
            .then(result => (result?.rows[0]))
            .catch(err => console.log(err))
            
        )
        .catch(err => console.log(err))
    )
        // return data

    // }


}


async function retrieve_product_with_id(product_id) {
    return(
        await NeonDB
        .then(pool => 
            pool.query(`SELECT * FROM seller_shop WHERE product_id = '${product_id}'`)
            .then(result => (result?.rows))
            .catch(err => console.log(err))
            
        )
        .catch(err => console.log(err))
    )
}

async function retrieve_products() {
    
    return(
        await NeonDB
        .then(pool => 
            pool.query(`SELECT * FROM seller_shop`)
            .then(result => (result?.rows))
            .catch(err => console.log(err))
            
        )
        .catch(err => console.log(err))
    )
}

async function retrieve_thumbnails(product_id) {
    return(
        await NeonDB
        .then(pool => 
            pool.query(`select file from product_photo where product_id = '${product_id}'`)
            .then(result =>  (result.rows[0]))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}
















async function upload_chat_meta_data(mssg_id,mssg_type,sender_id,room_id,date) {
    let meta_upload = await NeonDB.then(pool => 
        pool.query(`insert into messages_meta(id,mssg_id,mssg_type,sender_id,room_id,date)values(DEFAULT,'${mssg_id}','${mssg_type}','${sender_id}','${room_id}','${date}')`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => {console.log('error from upload_chat_meta_data', err); return false})    
    )
    .catch(err => console.log(err)) 

    return meta_upload  
}

async function upload_chat(mssg,mssg_id,date) {

    let mssg_upload = await NeonDB.then(pool => 
        pool.query(`insert into messages(id,mssg_id,mssg,date)values(DEFAULT,'${mssg_id}','${mssg}','${date}')`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => {console.log('error from upload_chat', err); return false})    
    )
    .catch(err => console.log(err)) 
    
    return mssg_upload;
}


async function upload_meta_data(replacedTitle,replacedDescription,category,price,seller_id,productId,others) {        
    let date = new Date();

 
    return(
        NeonDB.then((pool) => 
            pool.query(`insert into seller_shop (id,product_id,seller_id,status,title,description,price,package,category,others,date,state,views) values(DEFAULT, '${productId}','${seller_id}','unsold','${replacedTitle}','${replacedDescription}','${price}','${0}','${category}','${JSON.stringify(others)}','${date}','{"state": "pending", "reason": "new"}',${0} )`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function upload_photos(productId, seller_id, photos, imageId) {
    let mssg = 'Your ads is under review.'

    let book = []
    return(
        new Promise((resolve, reject) => {
            photos.map((item) => {
                NeonDB.then((pool) => 
                    pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
                    .then(result => {
                        if(result.rowCount > 0){
                            book.push(true)
                            console.log(result.rowCount)
                            if(book.length === photos.length){
                                resolve(true)
                            }
                        }
                    })
                    .catch(err => console.log(err), book.push(false), reject(false))
                ) 
            })
        })
        .then((result) => {
            let response = create_notice(seller_id, mssg, date)
            return response
        })
        .catch(err => err)
        
    )
}





async function delete_meta_data(productId) {        

    return(
        NeonDB.then((pool) => 
            pool.query(`delete from seller_shop where product_id = '${productId}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function delete_photos(productId) {
    
    return(
        NeonDB.then((pool) => 
            pool.query(`delete from product_photo where product_id = '${productId}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}



async function delete_chat_meta_data(mssg_id) {        

    return(
        NeonDB.then((pool) => 
            pool.query(`delete from messages_meta where mssg_id = '${mssg_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function delete_chat(mssg_id) {
    
    return(
        NeonDB.then((pool) => 
            pool.query(`delete from messages where mssg_id = '${mssg_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}





async function update_chat_meta_data(mssg_id,date) {
    let meta_upload = await NeonDB.then(pool => 
        pool.query(`update messages_meta set date = '${date}' where mssg_id = '${mssg_id}'`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => {console.log('error from upload_chat_meta_data', err); return false})    
    )
    .catch(err => console.log(err)) 

    return meta_upload  
}

async function update_chat(mssg,mssg_id,date) {

    let mssg_upload = await NeonDB.then(pool => 
        pool.query(`update messages set date = '${date}', mssg = '${mssg}' where mssg_id = '${mssg_id}'`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => {console.log('error from upload_chat', err); return false})    
    )
    .catch(err => console.log(err)) 
    
    return mssg_upload;
}


async function update_meta_data(replacedTitle,replacedDescription,category,price,seller_id,productId,others) {        
    let date = new Date();


    return(
        NeonDB.then((pool) => 

            pool.query(`update seller_shop set status='${unsold}',title='${replacedTitle}',description='${replacedDescription}',price='${price}',package='${0}',category='${category}',others='${JSON.stringify(others)}',date='${date}',state='{"state": "pending", "reason": "new"}' where product_id = '${productId}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function update_photos(productId, seller_id, photos, imageId) {
    let mssg = 'Your ads is under review.'

    let book = []

    let result2 = await delete_photos(productId)

    if(result2){
        return(
            new Promise((resolve, reject) => {
                photos.map((item) => {
                    NeonDB.then((pool) => 
                        pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
                        .then(result => {
                            if(result.rowCount > 0){
                                book.push(true)
                                console.log(result.rowCount)
                                if(book.length === photos.length){
                                    resolve(true)
                                }
                            }
                        })
                        .catch(err => console.log(err), book.push(false), reject(false))
                    ) 
                })
            })
            .then((result) => {
                let response = create_notice(seller_id, mssg, date)
                return response
            })
            .catch(err => err)
            
        )
    }
}

async function create_room_id(seller_id,buyer_id) {
    let room_id = shortId.generate()
    let date = new Date()

    let check = await check_if_room_exist(seller_id,buyer_id);
    console.log('check :', check)

  
    if(check){
        await NeonDB.then((pool) => 
        pool.query(`insert into room_id (id,room_id,members_id,date) values(DEFAULT,'${room_id}','${JSON.stringify({buyer_id: buyer_id, seller_id: seller_id})}','${date}')`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    }else{
        return true
    }
}

async function check_if_room_exist(seller_id,buyer_id) {
    return(
      await NeonDB.then((pool) => 
        pool.query(`SELECT * FROM room_id`)
          .then(result => {
              let l = result.rows.filter(item => JSON.parse(item.members_id).buyer_id === buyer_id && JSON.parse(item.members_id).seller_id === seller_id)
          //   if(l.length > 0){return false}else{return true}
              let response =l.length > 0 ? false : true
              return response;
          // console.log('room id: ',l)
          })
          .catch(err => console.log(err))
          // .finally(() => pool.end())
  
        )
      .catch(err => console.log(err))
    )
  }

  async function upload_new_view(buyer_id,product_id,view_id,) {
    let date = new Date();
    let duplicateViews = await NeonDB.then((pool) => 
        pool.query(`SELECT * FROM views WHERE buyer_id = ${buyer_id} AND product_id = ${product_id}`)
          .then(result => result.rows.length > 0 ? false : true)
          .catch(err => console.log(err))
        )
    .catch(err => console.log(err))

    if(duplicateViews){
        await NeonDB.then((pool) => 
            pool.query(`insert into views(id,buyer_id,product_id,view_id,date) values(DEFAULT, '${buyer_id}','${product_id}','${view_id}','${date}')` )
            .then(result => result.rowCount > 0 ? result.send(true) : result.send(false))
            .catch(err => console.log(err))
            )
        .catch(err => console.log(err))
    }
  }

//   const { authorize_seller } = require("../Authorization/seller");
    // const { create_notice } = require("./send_mssgs");
    let date = new Date();


function upload_meta_data(replacedTitle,replacedDescription,category,price,seller_id,productId,others) {
    return(
        NeonDB.then((pool) => 
            pool.query(`insert into seller_shop (id,product_id,seller_id,status,title,description,price,package,category,others,date,state) values(DEFAULT, '${productId}','${seller_id}','availble','${replacedTitle}','${replacedDescription}','${price}','${0}','${category}','${JSON.stringify(others)}','${date}','{"state": "published", "reason": "new"}' )`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function upload_photos(productId, seller_id, photos, imageId) {
    let mssg = 'Your ads is under review.'

    let book = []
    return(
        new Promise((resolve, reject) => {
            photos.map((item) => {
                NeonDB.then((pool) => 
                    pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
                    .then(result => {
                        if(result.rowCount > 0){
                            book.push(true)
                            console.log(result.rowCount)
                            if(book.length === photos.length){
                                resolve(true)
                            }
                        }
                    })
                    .catch(err => console.log(err), book.push(false), reject(false))
                ) 
            })
        })
        .then((result) => {
            // let response = create_notice(seller_id, mssg, date)
            return response
        })
        .catch(err => err)
        
    )
}

function send_email(subject,template,email) {
    const nodemailer = require('nodemailer');

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        // host: 'smtp.privateemail.com',  // Replace with your SMTP server hostname
        // port: 465, // Replace with your SMTP server port
        // secure: true, // Set to true if using SSL/TLS
        // auth: { 
        //     user: 'campus-express@campusexpressng.com', // Replace with your email address
        //     pass: 'A!nianuli82003', // Replace with your email password or app-specific password
        // },
        service: 'gmail',
            auth: {
            user: 'akpulufabian@gmail.com', // Replace with your email address
            pass: 'A!nianuli82003', // Replace with your email password or app-specific password
        },
    }); 
 
    // Email content 
    const mailOptions = {
        from: 'campusexpressnaija@gmail.com', // Replace with your email address
        to: `${email}`, // Replace with the recipient's email address
        subject: subject,
        html: template 
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
module.exports ={
    retrieve_room,
    retrieve_buyer,
    retrieve_seller,
    retrieve_message_meta_data,
    retrieve_message,
    retrieve_thumbnails,
    retrieve_product_with_id,
    retrieve_products,
    retrieve_room_with_buyer,
    retrieve_room_with_seller,
    retrieve_message_meta_data_with_type,
    
    upload_chat_meta_data,
    upload_chat,

    delete_meta_data,
    delete_photos,
    delete_chat_meta_data,
    delete_chat,

    update_chat,
    update_chat_meta_data,
    update_meta_data,
    update_photos,

    create_room_id,
    upload_new_view,

    upload_meta_data,
    upload_photos,
    send_email
}