const { NeonDB } = require("../../db");

function delete_product(req,res) {
    let {
        seller_id,product_id
    } = req.query;
    let book = []

    console.log( seller_id,product_id)

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM seller_shop WHERE product_id = '${product_id}'  `)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log('mssg',err))
        )
        .catch(err => console.log('mssg',err))

    })
    .then((response) => 

        NeonDB.then((pool) => 
            pool.query(`DELETE FROM  product_photo WHERE product_id = '${product_id}' `)
            .then(result => result.rowCount > 0 ? book.push(true) : book.push(false))
            .catch(err => console.log('mssg',err))
        )    

    )
    .then(async(response) => {
        let bool = book.filter(item => item !== true)


        if(bool.length < 1){
            console.log('overview number', response)
            NeonDB.then((pool) => 
                pool.query(`UPDATE seller_overview set total_sale = total_sale - 1 WHERE seller_id = '${seller_id}'`)
                .then(result => result.rowCount > 0 ? res.send(true) : res.send(false))
                .catch(err => console.log('mssg',err))
            )
            .catch(err => console.log(err))
        }else{
            res.send(false)
        }

    })
    .catch(err => console.log('mssg',err))
}

module.exports={
    delete_product
}