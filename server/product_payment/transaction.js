const { NeonDB } = require("../db")

async function record_transacction(buyer_id,payment_src,payment_type,app_fee,amount,date) {
    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into buyer_transactions
          (
            id,
            buyer_id,
            payment_src,
            payment_type,
            app_fee,
            amount,
            date
          ) 
          values(
            DEFAULT, 
            '${buyer_id}',
            '${payment_src}',
            '${payment_type}',
            '${app_fee}',
            '${amount}',
            '${date}'
          )
        `)

          .then(result => result.rowCount > 0 ? ({bool: true}) : ({bool: false}))
          .catch(err => console.log(err))
        )
      .catch(err => console.log(err))
    )
}



module.exports={
    record_transacction
}