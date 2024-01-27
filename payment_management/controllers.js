//19 request on buyer

const { NeonDB } = require("./db");
const { shortId, bcrypt, jwt } = require("./modules");
const { process_transaction, save_tansaction, create_order, create_room_id, retrieve_room, send_proposal_meta_data, retrieve_mssg_meta_data, send_proposal_message, retrieve_seller, retrive_cart, delete_cart_with_id } = require("./functions");
const maxAge = 90 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
       expiresIn: maxAge
    });
};

async function process_payment(req,res) {
    let payload = req.body;

    // CHECK PAYMENT SRC (BUYER, SELLER)
    // CHECK PAYMENT TYPE (CHECKOUT, SELLER WALLET REFILL, BUYER WALLET REFILL)
    // FLW VERIFICATION
    // STORE TRANSACTION

    // UPDATE BALANCE IF PAYMENT TYPE IS WALLET

    //* @CHECKOUT
    // CREATE ORDER
    // CREATE CHAT ROOM
    // SEND MESSAGE META DATA
    // SEND MESSAGE 
    //*

    //* @WALLET REFILL
    // STORE TRANSACTION
    // UPDATE WALLET
    //*

    let response = payload.data;
    let customer = response.customer;

    let custom_data = customer.phone_number.split('/');

    let buyer_id = custom_data[2];
    let amount = response.amount;

    let date = new Date()
     
    let payment_type = custom_data[0];

    let payment_src = response.payment_type

    let immediate_data = custom_data[1];
    let immediate_purchase = immediate_data.split('*')[0];
    let unit = immediate_data.split('*')[1];
    let product_id = immediate_data.split('*')[2];

    if(payment_type === 'buyer_wallet_refill'){

    }else if(payment_type === 'seller_wallet_refill'){

    }else if(payment_type === 'checkout'){
        
        try{
            checkout_handler({immediate_purchase,unit,product_id}, buyer_id, amount, payment_src, date)
        }catch(err){
            console.log(err)
        }

    }else{
        return {bool: false, reason: 'payment type is not valid'}
    }

    async function checkout_handler(immediate_data,buyer_id,amount,payment_src,date) {

        if(immediate_data.immediate_purchase === 'true'){

            let seller_id = await retrieve_seller(immediate_data.product_id)

            new Promise(async(resolve, reject) => { 
                let response = await save_tansaction(buyer_id,'bank',payment_src,4,amount,date); 
                response.bool ? resolve(response) : reject(response)
            })
        
            .then(async(result) => {
                // CREATE ORDER
                if(result.bool){
                    console.log(result, 'transaction saved and order is been created...') 
                    let response = await create_order(immediate_data.product_id, parseInt(immediate_data.unit), buyer_id)
                    return response ? ({bool: true}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while saving transaction and order is cancelled...')
                    return ({bool: false})
                }
            })
        
            .then(async(result) => {
                // CREATE CHAT ROOM
                if(result.bool ){
                    console.log(result, 'order created and chat room is been created...') 
                    let room_response = create_room_id(seller_id,buyer_id)
                    return room_response ? ({bool: true}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while creating order and room is cancelled... ') 
                    return response ({bool: false})
            
                }
        
            })
        
            .then(async(result) => {
                // SEND MSSG META DATA
                if(result.bool ){
                    console.log(result, 'room created and sending proposal meta data now...') 
                    let room_id = await retrieve_room(buyer_id,seller_id)
                    let mssg = await send_proposal_meta_data(room_id,buyer_id,immediate_data.product_id)
                    return mssg ? ({bool: true, room_id}) : ({bool: false,room_id})
                }else{
                    console.log(result,'error occcured while creating room and sending proposal meta data failed...') 
                    return response ({bool: false})
                }
        
            })
        
            .then(async(result) => {
                // SEND MSSG
                if(result.bool ){
                    console.log(result, 'sending proposal meta data was a success now sending message...') 
                    // let mssg = generate_mssg(`${payload.data.customer.name}`)
                    let meta_datas = await retrieve_mssg_meta_data(buyer_id,result.room_id)
                    let response = await send_proposal_message(meta_datas.message_id, immediate_data.product_id)
                    return response ? ({bool: true}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while sending proposal meta data and sending message faild...')
                    return response ({bool: false})
            
                }
            
            })
        
            .then((result) => result.bool ? res.send(true) : res.send(false))
        
            .catch(err => console.log(err))

        }else{
    
            new Promise(async(resolve, reject) => { 
                let response = await save_tansaction(buyer_id,'bank',payment_src,4,amount,date); 
                response.bool ? resolve(response) : reject(response)
            })
        
            .then(async(result) => {
                if(result.bool){
                    console.log(result, 'transaction saved and order is been created...') 
                    let carts = await retrive_cart(buyer_id)
                    let create_orders_via_cart_data = await carts.map(item => create_order(item.product_id, item.unit, buyer_id))
                    let order_result = await Promise.all(create_orders_via_cart_data).then(result => result)
                    let bool_check = order_result.includes(false)
                    return !bool_check ? ({bool: true}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while saving transaction and order is cancelled...')
                    return ({bool: false})
                }
            })
        
            .then(async(result) => {
               
                if(result.bool){
                    console.log(result,'order created and room is been created...')
                    let carts = await retrive_cart(buyer_id)
                    let seller_ids = await carts.map((item) => retrieve_seller(item.product_id))
                    let id_list = await Promise.all(seller_ids).then(result => result)
                    let response = id_list.map(seller_id => create_room_id(seller_id,buyer_id))
                    let data = await Promise.all(response).then(result => result)
                    let bool_check = data.includes(false)
                    return !bool_check ? ({bool: true}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while creating order and room creation  is  cancelled...')
                    return ({bool: false})
                }
        
            })
        
            .then(async(result) => {
               
                if(result.bool){
                    console.log(result,'room created and sending message meta data now...')

                    let carts = await retrive_cart(buyer_id)
                    let seller_ids = await carts.map(async(item) => await retrieve_seller(item.product_id))
                    let seller_id_res = await Promise.all(seller_ids).then(result => result)
                    let room = seller_id_res.map((seller_id) => retrieve_room(buyer_id,seller_id))
                    let response = await Promise.all(room).then(result => result)
                    let mssg = response.map(room_id => send_proposal_meta_data(room_id,buyer_id,product_id))
                    let mssg_res = await Promise.all(mssg).then(result => result)
                    let bool_check = mssg_res.filter(item => item.bool === false)
                    return bool_check>0 ? ({bool: false, room_id}) : ({bool: true, room_id})
                }else{
                    console.log(result,'error occcured while creating room and sending message meta data is  cancelled...')
                    return ({bool: false})
                }
        
                
            })
        
            .then(async(result) => {
               
                if(result.bool){
                    console.log(result,'sending message meta data was a sucess and sending message now...')

                    let mssg = generate_mssg(`${item.fname + item.lname}`)
        
                    let meta_datas = await retrieve_mssg_meta_data(buyer_id,result.room_id)
                    let response = await meta_datas.map(item => send_proposal_message(item.message_id, item.product_id))
                    let mssg_res = await Promise.all(response).then(result => result)
                    let bool_check = mssg_res.includes(false)
                    return !bool_check ? ({bool: true}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while sending message meta data and sending message is cancelled...')
                    return ({bool: false})
                }
        
                
            })

            .then(async(result) => {
               
                if(result.bool){
                    console.log(result, 'sending message was a success and cart is been deleted...') 
                    let carts = await retrive_cart(buyer_id)
                    let delete_process = carts.map(item => delete_cart_with_id(item.cart_id))
                    let response = await Promise.all(delete_process).then(result => result)
                    let bool_check = response.includes(false)
                    return !bool_check ? ({bool: true}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while sending message and cart deletion is  cancelled...')
                    return ({bool: false})
                }
        
            })
        
            .then(async(result) => {
                if(result.bool ){
                    console.log(result,' cart deletion was successful ending process and sendind feedback...')
                    res.send(true);
                }else{
                    console.log(result,'cart deletion was successful not a success ending process and sendind feedback...')
                    res.send(false); 
                }
            })
        
            .catch(err => console.log(err))
        }
    }

}



module.exports = {
    process_payment
 
}



