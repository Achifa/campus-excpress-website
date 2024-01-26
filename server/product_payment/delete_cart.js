const { NeonDB } = require("../db")

async function delete_cart(product_id,buyer_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function delete_cart_with_id(id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM campus_express_buyer_cart WHERE cart_id = '${id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}


module.exports = {delete_cart,delete_cart_with_id}

