async function save_tansaction(buyer_id,payment_src,payment_type,app_fee,amount,date) {
    const { NeonDB } = require("../db")

    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into buyer_transactions(
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
          `)

          .then(result => result.rowCount > 0 ? ({bool: true}) : ({bool: false}))
          .catch(err => console.log(err))
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
        )
        .catch(err => console.log(err))
    )
    // return book;
}

function retrieve_room(buyer_id,seller_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM room_id`)
            .then(result => {
                let m = result.rows;
                let room = m.filter(item => JSON.parse(item.members_id).buyer_id === buyer_id && JSON.parse(item.members_id).seller_id === seller_id);
                return room.map(item => item.room_id);
                // room.map(item => (item.room_id));
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

function retrieve_mssg_meta_data(buyer_id,room_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM message_meta_data WHERE sender_id = '${buyer_id}' AND room_id = '${room_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
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
        )
        .catch(err => console.log(err))
    )
}

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
          let l = result.rows.filter(item => JSON.parse(item.members_id).buyer_id === buyer_id && JSON.parse(item.members_id).seller_id === seller_id)
          if(l.length > 0){return false}else{return true}
        })
        .catch(err => console.log(err))
      )
    .catch(err => console.log(err))
  )
}
module.exports = {retrive_cart,create_room_id,create_order,send_proposal_meta_data,send_proposal_message,delete_cart,delete_cart_with_id,save_tansaction,retrieve_mssg_meta_data_via_room,retrieve_seller,retrieve_room,retrieve_mssg_meta_data}
