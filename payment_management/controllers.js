//19 request on buyer

const { NeonDB } = require("./db");
const { shortId, bcrypt, jwt } = require("./modules");
const { process_transaction, save_tansaction, create_order, create_room_id, retrieve_room, send_proposal_meta_data, retrieve_mssg_meta_data, send_proposal_message, retrieve_seller, retrive_cart, delete_cart_with_id, retrive_order, send_proposal_meta_data_from_cart, retrieve_room_with_room_id, update_buyer_wallet, refill_buyer_wallet } = require("./functions");
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
    let charged_amount = response.charged_amount

    let date = new Date()
     
    let payment_type = custom_data[0];

    let payment_src = response.payment_type

    let immediate_data = custom_data[1];
    let immediate_purchase = immediate_data.split('*')[0];
    let unit = immediate_data.split('*')[1];
    let product_id = immediate_data.split('*')[2];

    


    if(payment_type === 'buyer_wallet_refill'){
        refill_buyer_wallet(buyer_id,0,payment_src,4,charged_amount,date)

    }else if(payment_type === 'seller_wallet_refill'){

    }else if(payment_type === 'checkout'){
        if(amount === charged_amount){

            try{
                checkout_handler({immediate_purchase,unit,product_id}, buyer_id, charged_amount, payment_src, date)
            }catch(err){
                console.log(err)
            }
        }else{
            refill_buyer_wallet(buyer_id,0,payment_src,4,charged_amount,date)

        }


    }else{
        return {bool: false, reason: 'payment type is not valid'}
    }

    async function checkout_handler(immediate_data,buyer_id,charged_amount,payment_src,date) {

        if(immediate_data.immediate_purchase === 'true'){
            
            let seller_id = await retrieve_seller(immediate_data.product_id)
            console.log('response: ',seller_id)

            new Promise(async(resolve, reject) => { 
                let response = await save_tansaction(buyer_id,0,payment_src,4,charged_amount,date,'checkout'); 

                response.bool ? resolve(response) : reject(response)
            })
        
            .then(async(result) => {
                // CREATE ORDER
                if(result.bool){
                    console.log(result, 'transaction saved and order is been created...') 
                    let response = await create_order(immediate_data.product_id, parseInt(immediate_data.unit), buyer_id)

                    return response.bool ? response : ({bool: false})
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
                    return room_response ? ({bool: true, order_id: result.order_id}) : ({bool: false})
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
                    let mssg = await send_proposal_meta_data(room_id,buyer_id,result.order_id)
                    return mssg ? ({bool: true, room_id, order_id: result.order_id}) : ({bool: false,room_id})
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
                    console.log('room', result)
                    let meta_datas = await retrieve_mssg_meta_data(buyer_id,result.room_id[0],result.order_id)
                    // console.log(meta_datas)
                    let response = await send_proposal_message(meta_datas[0].message_id, immediate_data.product_id)
                    return response ? ({bool: true}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while sending proposal meta data and sending message faild...')
                    return ({bool: false}) 
            
                }
            
            })
        
            .then((result) => result.bool ? res.send(true) : res.send(false))
        
            .catch(err => console.log(err))

        }else{
    
            let book = [];

            let response = await save_tansaction(buyer_id,0,payment_src,4,charged_amount,date,'checkout');
            // response.bool ? resolve(response) : reject(response)

            let carts = await retrive_cart(buyer_id)

            let processes = async() => { 
                await carts.map(async(item, index) => {
                    // DATA FOR PROCESS
                    let seller_id = await retrieve_seller(item.product_id)
                    // DATA FOR PROCESS

                    // CREATE ORDER
                    let order = await create_order(item.product_id, item.unit, buyer_id)

                    // CREATE ROOM
                    new Promise(async(resolve, reject) => {
                        let room_creation = await create_room_id(seller_id,buyer_id)
                        if(room_creation){
                            console.log('created order successfully and now creating room @', index)
                            resolve(room_creation)
                        }else{
                            reject(false)
                        }
                    })

                    .then(async(result) => {
                        if(result){
                            console.log('created room successfully and now retrieving room data for sending messages @', index)
                            let room_id = await retrieve_room(buyer_id,seller_id)
                            return {room_id: room_id[0].room_id, bool: true}
                        }
                    }) 

                    // MESSAGE MANAGEMENT

                    .then(async(result) => {
                        if(result.bool){
                            console.log('retrieved room data successfully and now sending messages meta data @', index)
                            let response = await send_proposal_meta_data(result.room_id,buyer_id,order.order_id);
                            return response
                        }
                    })
                    .then(async(result) => {
                        if(result.bool){
                            console.log('sent messages meta data successfully and now sending messages @', index)
                            let mssg = await send_proposal_message(result.data, item.product_id)
                            return mssg
                        }
                    })

                    // DELETE CART

                    .then(async(result) => {
                        if(result.bool){
                            console.log('sent messages successfully and now deleting cart @', index)
                            let delete_cart = await delete_cart_with_id(item.cart_id)
                            return delete_cart
                        }
                    })

                    .then(result => {
                        book.push(index + 1)
                        if(book.length === carts.length){
                            res.send(true)
                        }
                    })
                    .catch(err => console.log(err))
                    
                })
            }


            if(response.bool){
                processes()
            }


        }
    }

}



module.exports = {
    process_payment
 
}



