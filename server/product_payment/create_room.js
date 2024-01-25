const { v4 } = require("uuid")
const { NeonDB } = require("../db")

async function create_room_id(seller_id,buyer_id) {
    let room_id = v4()
    let date = new Date()

    let check = check_if_room_exist(seller_id,buyer_id);

    check
    ?
    await NeonDB.then((pool) => 
      pool.query(`insert into room_id (id,room_id,members_id,date) values(DEFAULT,'${room_id}','${JSON.stringify({buyer_id: buyer_id, seller_id: seller_id})}','${date}')`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => console.log(err))
      )
    .catch(err => console.log(err))
    : 
    true
}

async function check_if_room_exist(seller_id,buyer_id) {
  return(
    await NeonDB.then((pool) => 
      pool.query(`SELECT * FROM room_id`)
        .then(result => {
          let l = result.rows.filter(item => JSON.parse(item.members).buyer_id === buyer_id && JSON.parse(item.members).seller_id === seller_id)
          if(l.length > 0){return false}else{return true}
        })
        .catch(err => console.log(err))
      )
    .catch(err => console.log(err))
  )
}

  module.exports={
    create_room_id
}