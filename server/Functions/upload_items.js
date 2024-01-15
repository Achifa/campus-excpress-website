const { authorize_seller } = require("../Authorization/seller");
const { NeonDB } = require("../db");
const { create_notice } = require("./send_mssgs");
let date = new Date();

function check_seller_actions(seller_id) {return(authorize_seller(seller_id))}
function upload_meta_data(replacedTitle,replacedDescription,category,price,seller_id,productId,others) {
    return(
        NeonDB.then((pool) => 
            pool.query(`insert into seller_shop (id,product_id,seller_id,status,title,description,price,package,category,others,date,state) values(DEFAULT, '${productId}','${seller_id}','unsold','${replacedTitle}','${replacedDescription}','${price}','${0}','${category}','${JSON.stringify(others)}','${date}','{"state": "pending", "reason": "new"}' )`)
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



module.exports ={check_seller_actions,upload_meta_data,upload_photos}
