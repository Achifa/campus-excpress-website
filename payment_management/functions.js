const { v4 } = require("uuid");
const { NeonDB } = require("./db");

async function save_tansaction(buyer_id,payment_src,payment_type,app_fee,amount,date,reason) {
    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into buyer_transactions(
          id,
          buyer_id,
          payment_src,
          payment_type,
          app_fee,
          amount,
          date,
          reason
        ) 
        values(
          DEFAULT, 
          '${buyer_id}',
          '${payment_src}',
          '${payment_type}',
          '${app_fee}',
          '${amount}',
          '${date}',
          '${reason}')
          `)

            .then(result => result.rowCount > 0 ? ({bool: true}) : ({bool: false}))
            .catch(err => console.log(err))
            // .finally(() => pool.end())
          
        )
      .catch(err => console.log(err))
    )
}

function retrieve_seller(product_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT seller_id FROM seller_shop WHERE product_id = '${product_id}'`)
            .then(result => (result.rows[0].seller_id))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
    // return book;
}

async function retrieve_room(buyer_id,seller_id) {
    return(
        await NeonDB.then((pool) => 
            pool.query(`SELECT * FROM room_id`)
            .then(result => {
                let m = result.rows;
                let room = m.filter(item => JSON.parse(item.members_id).buyer_id === buyer_id && JSON.parse(item.members_id).seller_id === seller_id);
                return room.map(item => ({room_id: item.room_id, seller_id}));
                // room.map(item => (item.room_id));
            })
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

async function retrieve_buyer(buyer_id,seller_id) {
    return(
        await NeonDB.then((pool) => 
            pool.query(`SELECT * FROM campus_buyers`)
            .then(result => result.rows)
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

function retrieve_room_with_room_id(id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT members_id FROM room_id WHERE room_id = '${id}'`)
            .then(result => result.rows[0])
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

function retrieve_mssg_meta_data(buyer_id,room_id,order_id) {
    // console.log('order_id: ', order_id)
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM message_meta_data WHERE sender_id = '${buyer_id}' AND room_id = '${room_id}' AND order_id = '${order_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

function retrieve_mssg_meta_data_via_room(room_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM message_meta_data WHERE room_id = '${room_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

function retrive_cart(buyer_id) { 
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


async function retrive_order(buyer_id,product_id) { 
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT order_id FROM campus_express_buyer_orders WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
            .then(result => (result.rows[0]))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

async function delete_cart(product_id,buyer_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

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
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

async function send_proposal_message(mssg_type,mssg,order_id,sender_id,room_id) {
    let mssg_id = v4()
    let date = new Date()
    return(
        await NeonDB.then((pool) => 
        pool.query(`insert into messages(id,mssg_id,mssg_type,mssg,order_id,sender_id,room_id,date) values(DEFAULT,'${mssg_id}','${mssg_type}','${mssg}','${order_id}','${sender_id}','${room_id}','${date}')`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
            // .finally(() => pool.end())
        )
        .catch(err => console.log(err))
    )
}

async function create_order(product_id,unit,buyer_id) {
    //stock
    let order_id = v4()
    let date = new Date()
    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into campus_express_buyer_orders (id,order_id,product_id,status,date,stock,buyer_id) values(DEFAULT, '${order_id}','${product_id}','pending','${date}','${unit}','${buyer_id}')`)
            .then(result => result.rowCount > 0 ? ({bool: true, order_id}) : ({bool: false}))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
      .catch(err => console.log(err))
    )
}

async function create_room_id(seller_id,buyer_id) {
    let room_id = v4()
    let date = new Date()

    let check = await check_if_room_exist(seller_id,buyer_id);
    console.log('check :', check)

  
    if(check){
        await NeonDB.then((pool) => 
        pool.query(`insert into room_id (id,room_id,members_id,date) values(DEFAULT,'${room_id}','${JSON.stringify({buyer_id: buyer_id, seller_id: seller_id})}','${date}')`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    }else{
        return true
    }
}

async function check_if_room_exist(seller_id,buyer_id) {
  return(
    await NeonDB.then((pool) => 
      pool.query(`SELECT * FROM room_id`)
        .then(result => {
            let l = result.rows.filter(item => JSON.parse(item.members_id).buyer_id === buyer_id && JSON.parse(item.members_id).seller_id === seller_id)
        //   if(l.length > 0){return false}else{return true}
            let response =l.length > 0 ? false : true
            return response;
        // console.log('room id: ',l)
        })
        .catch(err => console.log(err))
        // .finally(() => pool.end())

      )
    .catch(err => console.log(err))
  )
}

async function update_buyer_wallet(amount,buyer_id) {
    return(
        await NeonDB.then((pool) => 
        pool.query(`update campus_express_buyer_wallet set wallet_balance = wallet_balance + ${amount} where buyer_id = '${buyer_id}'`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => console.log(err))
        )
    )
}

function refill_buyer_wallet(buyer_id,payment_src,payment_type,app_fee,amount,date) {
    save_tansaction(buyer_id,payment_src,payment_type,app_fee,amount,date,'wallet_refill')
    update_buyer_wallet(amount,buyer_id)
}
module.exports = {
    retrive_cart,
    refill_buyer_wallet,
    create_room_id,
    create_order,
    send_proposal_message,
    delete_cart,
    update_buyer_wallet,
    retrieve_room_with_room_id,
    delete_cart_with_id,
    save_tansaction,
    retrieve_mssg_meta_data_via_room,
    retrieve_seller,
    retrieve_room,
    retrive_order,
    retrieve_mssg_meta_data,
    retrieve_buyer
}


// let wallet_update = NeonDB.then((pool) => 
//     pool.query(`update campus_express_seller_wallet set wallet_balance = wallet_balance + ${payload.data.metadata.amount} where seller_id = '${payload.data.metadata.seller_id}'`)
//       .then(result => result.rowCount > 0 ? (true) : (false))
//       .catch(err => console.log(err))
//     )
//     .catch(err => console.log(err))

//     let transaction_update = NeonDB.then((pool) => 
//     pool.query(`insert into campus_express_seller_transactions (id,document,seller_id) values(DEFAULT, '${JSON.stringify(payload.data)}', '${payload.data.metadata.seller_id}')`)
//       .then(result => result.rowCount > 0 ? (true) : (false))
//       .catch(err => console.log(err))
//     )