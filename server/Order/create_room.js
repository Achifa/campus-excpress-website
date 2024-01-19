const { v4 } = require("uuid")
const { NeonDB } = require("../db")

async function create_room_id(seller_id,buyer_id) {
    let room_id = v4()
    let date = new Date()
    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into room_id (id,room_id,members_id,date) values(DEFAULT,'${room_id}','${JSON.stringify({buyer_id: buyer_id, seller_id: seller_id})}','${date}')`)
          .then(result => result.rowCount > 0 ? (true) : (false))
          .catch(err => console.log(err))
        )
      .catch(err => console.log(err))
    )
  }

  module.exports={
    create_room_id
}