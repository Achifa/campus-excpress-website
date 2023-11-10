const { NeonDB } = require("../db");
const { shortId } = require("../modules");


function uploadProduct(req,res) {

    let {
        productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos
    } = req.body;
    let date = new Date();
    let productId = shortId.generate()
    let seller_id = shortId.generate()
    let descripton = productDescription.replace(/"'"/g, '"');
    let title = productTitle.replace(/"'"/g, '"');
   

    new Promise((resolve, reject) => {
        let uploadData = NeonDB.then((pool) => 
            pool.query(`insert into seller_shop (id,product_id,date,seller_id,title,category,type,condition,stock,locale,price,description,package) values(DEFAULT, '${productId}', '${date}', '${seller_id}', '${title}', '${productCategory}', '${productType}', '${productCondition}', '${productStock}', '${productLocale}', '${productPrice}', '${description}', '${productPackage}' )`)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    })
    .then((response) => {
        let imageId = shortId.generate();

        if(response){
            productPhotos.map(item => 
                NeonDB.then((pool) => 
                    pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
                    .then(result => result.rowCount > 0 ? (true) :(false))
                    .catch(err => console.log(err))
                )    
            )
        }else{
            res.send(false)
        }

    })
    .then((response) => {
        if(response){
            NeonDB.then((pool) => 
                pool.query(`update seller_overview set total_sale = total_sale + 1`)
                .then(result => result.rowCount > 0 ? res.send(true) : res.send(false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        }else{
            res.send(false)
        }

    })
    .catch(err => console.log(err))
}

module.exports = {uploadProduct}
