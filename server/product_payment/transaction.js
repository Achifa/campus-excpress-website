const { NeonDB } = require("../db")

async function record_transacction(file,buyer_id,src) {
    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into campus_express_buyer_transactions (id,document,buyer_id,source) values(DEFAULT, '${JSON.stringify(file)}', '${buyer_id}','${src}')`)
          .then(result => result.rowCount > 0 ? ({bool: true}) : ({bool: false}))
          .catch(err => console.log(err))
        )
      .catch(err => console.log(err))
    )
}



module.exports={
    record_transacction
}