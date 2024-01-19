import img from '../../../assets/download (3).jpeg'
import { useEffect, useState } from 'react'
import { get_chat } from '../../../api/seller'
import MssgPanel from './MssgPanel'
import ChatRoom from './ChatRoom'
import ChatHead from './ChatHead'

const Messages = () => {

    let [chatList, setChatList] = useState([])
    let [chatHead, setChatHead] = useState([])
    let [chat, set_chat] = useState([])
    let [selected_head, set_selected_head] = useState()

    useEffect(() => {
        get_chat(window.localStorage.getItem('CE_seller_id'))
        .then(({data}) => {
            let {chat_box} = data;
            let heads = []

            chat_box.map(item => heads.push({id: item.buyer_id, name: item.buyer_name}))
            setChatHead(heads)
            setChatList(chat_box)

        }) 
        .catch((err) => { 
             
        }) 
    }, [])

    useEffect(() => {
        let r = chatList.filter(item => item.buyer_id === selected_head)[0]
        console.log(r)
        if(r !== undefined) {
            set_chat(r?.mssg)
        }
        // 
    }, [selected_head])

    function SetHeadId(data) {set_selected_head(data)}
      
    return ( 
        <>
            <div className="seller-messages">
                <ChatHead chatHead={chatHead} SetHeadId={SetHeadId} />
                <div className="seller-chat-room" style={{position: 'relative'}}>
                    <div className="seller-chat-header" style={{height: '60px'}}>
                        
                    </div>
                    
                    <ChatRoom chat={chat} />

                    <MssgPanel />
                </div>
            </div>
        </>
     );
}
 
export default Messages;

// {
    // chatList.map((item, index) => 
    //     item.who ? 
    //     <div className="seller-chat-cnt" style={{float: 'left', textAlign: 'left'}}>
    //         <section id='sellerChatMate' style={{float: 'left', textAlign: 'left'}}>
    //             {item.mssg}
    //         </section>
    //     </div>
    //     :
    //     <div className="seller-chat-cnt" style={{float: 'right', textAlign: 'left'}}>
    //         <section id='sellerChat' style={{float: 'right', textAlign: 'left'}}>
    //             {item.mssg}
    //         </section>
    //     </div>
    // )
// }