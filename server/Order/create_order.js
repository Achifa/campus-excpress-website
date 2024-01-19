const { v4 } = require("uuid")
const { NeonDB } = require("../db")

async function create_order(product_id, unit,buyer_id) {
    //stock
    let order_id = v4()
    let date = new Date()
    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into campus_express_buyer_orders (id,order_id,product_id,status,date,stock,buyer_id) values(DEFAULT, '${order_id}','${product_id}','pending','${date}','${unit}','${buyer_id}')`)
          .then(result => result.rowCount > 0 ? (true) : (false))
          .catch(err => console.log(err))
        )
      .catch(err => console.log(err))
    )
}

module.exports={
    create_order
}