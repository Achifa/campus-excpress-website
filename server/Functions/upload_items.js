const { authorize_seller } = require("../Authorization/seller");

function check_seller_actions(seller_id) {return(authorize_seller(seller_id))}
 
function upload_meta_data(replacedTitle,replacedDescription,category,price,seller_id,others,productId) {
    return(
        NeonDB.then((pool) => 
            pool.query(`insert into seller_shop (id,product_id,seller_id,status,title,description,price,package,category,others,date) values(DEFAULT, '${productId}','${seller_id}','unsold','${replacedTitle}','${replacedDescription}','${price}','${0}','${category}','${JSON.stringify(others)}','${date}' )`)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

function upload_photos(productId, seller_id, photos, imageId) {
    let book = []
    photos.map(item => 
        NeonDB.then((pool) => 
            pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
            .then(result => {
                if(result.rowCount > 0){ 
                    book.push(true)
                    book.length === photos ? true : false
                }else{ 
                    book.push(false)
                    book.length === photos ? true : false
                }
            })
            .catch(err => console.log(err))
        )    
    )

    
}

function upload_videos(params) {
    
}


module.exports ={check_seller_actions,upload_meta_data,upload_photos}
