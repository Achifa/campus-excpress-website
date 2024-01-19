const { NeonDB } = require("../db")

async function update_buyer_wallet(file,buyer_id) {
    return(
      await NeonDB.then((pool) => 
        pool.query(`update campus_express_buyer_wallet set wallet_balance = wallet_balance - ${file.amount} where buyer_id = '${buyer_id}'`)
        .then(result => result.rowCount > 0 ? ({bool: true}) : ({bool: false}))
        .catch(err => console.log(err))
      )
      .catch(err => console.log(err))
    )
}

module.exports={
    update_buyer_wallet
}
