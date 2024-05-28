const { NeonDB } = require("../../db");

function delete_product(req,res) {
    let {
        seller_id,
        product_id
    } = req.query;


    let book = []

    console.log(seller_id,product_id)

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM seller_shop WHERE product_id = '${product_id}' `)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log('mssg',err))
        )
        .catch(err => console.log('mssg 1',err))

    })
    .then((response) => 

        NeonDB.then((pool) => 
            pool.query(`DELETE FROM product_photo WHERE product_id = '${product_id}' `)
            .then(result => result.rowCount > 0 ? res.send(true) : res.send(false))
            .catch(err => console.log('mssg 2',err))
        )    

    )
    .catch(err => console.log('mssg',err))
}

module.exports={
    delete_product
}