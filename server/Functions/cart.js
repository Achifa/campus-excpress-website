const { NeonDB } = require("../db")

async function create_cart(cart_id, product_id, date, buyer_id) {
    // console.log(cart_id, product_id, date, buyer_id)-
    function insert_new_cart() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_express_buyer_cart(id,cart_id,product_id,date,buyer_id,unit) values(DEFAULT, '${cart_id}', '${product_id}', '${date}', '${buyer_id}', ${1})`)
                .then(result => result.rowCount > 0 ? (true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let insert_data = await insert_new_cart()
    if(insert_data){
        let response = await retrive_cart(buyer_id)
        return {bool: true, doc: response}
    }else{
        return {bool: false, doc: null}
    }
}

async function delete_cart(product_id,buyer_id) {
    function delete_selected_cart() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`DELETE FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
                .then(result => result.rowCount > 0 ? (true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let delete_data = await delete_selected_cart()
    if(delete_data){
        let response = await retrive_cart(buyer_id)
        return {bool: true, doc: response}
    }else{
        return {bool: false, doc: null}
    }
}


async function retrive_cart(buyer_id) { 
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}


module.exports = {
    create_cart,
    delete_cart,
    retrive_cart
}
