const { NeonDB } = require("../db")

async function send_proposal_message(mssg_id,mssg) {
    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into messages(id,message_id,message) values(DEFAULT,'${mssg_id}','${mssg}')`)
          .then(result => result.rowCount > 0 ? (true) : (false))
          .catch(err => console.log(err))
        )
      .catch(err => console.log(err))
    )
}


  module.exports={
    send_proposal_message
    }