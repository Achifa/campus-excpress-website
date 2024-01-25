const { NeonDB } = require("../db")

async function update_product_status(product_id) {
    return(
      await NeonDB.then((pool) => 
        pool.query(`update seller_shop set status = 'ordered' where product_id = '${product_id}'`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => console.log(err))
      )
      .catch(err => console.log(err))
    )
}

module.exports={
    update_product_status
}