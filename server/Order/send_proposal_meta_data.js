const { NeonDB } = require("../db")
const { shortId } = require("../modules")

async function send_proposal_meta_data(room_id,buyer_id,mssg_id) {
    // let room_id = v4()
    let date = new Date()
    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into message_meta_data(id,message_id,sender_id,room_id,message_type,date) values(DEFAULT,'${mssg_id}','${buyer_id}','${room_id}','file','${date}')`)
          .then(result => result.rowCount > 0 ? ({bool: true, data: mssg_id}) : ({bool: false}))
          .catch(err => console.log(err))
        )
      .catch(err => console.log(err))
    )
  }

  module.exports={
    send_proposal_meta_data
}