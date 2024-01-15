import img from '../../assets/download (3).jpeg'
import audioSvg from '../../assets/audio-input-microphone-svgrepo-com.svg'
import { useEffect, useState } from 'react'

const Messages = () => {

    let [chatList, setChatList] = useState([])

    
    let chats = {
            me: [
                {mssg: 'Hello', who: 0},
                {mssg: 'How is your day going', who: 0},
                {mssg: 'A place where items for sale are kept is commonly called a store or a shop. Other terms include boutique, marketplace, retail outlet, or storefront, depending on the specific type of establishment.', who: 0},
                {mssg: 'Ok', who: 0},
                {mssg: 'Ok thanks for patronizing me, delivery dates are always set to 2 days', who: 0},
                {mssg: 'Just be patient', who: 0},
               
            ],

            chatMate: [
                {mssg: 'Hi', who: 1},
                {mssg: 'A place where items for sale are kept is commonly called a store or a shop. Other terms include boutique, marketplace, retail outlet, or storefront, depending on the specific type of establishment.', who: 1},
                {mssg: 'What about you', who: 1},
                {mssg: 'So I like the jewelry, and i already paid for it, so when is the delivery date', who: 1},
                {mssg: 'OK', who: 1},
                
            ]
        }

        useEffect(() => {
            function shuffle(array) {
                let currentIndex = array.length,  randomIndex;
              
                // While there remain elements to shuffle.
                while (currentIndex > 0) {
              
                  // Pick a remaining element.
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
              
                  // And swap it with the current element.
                  [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
                }
              
                return array;
            }
            var arr = [...chats.me, ...chats.chatMate];
            shuffle(arr);
            setChatList(arr);
        }, [])
    
    return ( 
        <>
            <div className="seller-messages">
                <div className="seller-client-list shadow-sm">
                    {
                        ['Bella', 'Chiamaka', 'Chinedu', 'Jacob', 'Kelvin', 'Chidozie', 'Amaka', 'Arinze', 'Chidubem'].map(item =>  
                            <section className="shadow-sm">
                                <img src={img}  alt="" />
                                <div  className='seller-client-list-chat-log'>
                                    <div style={{height: '50%', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left'}}>
                                        <span style={{fontSize: 'medium', fontWeight: '500'}}>{item}</span>
                                        <span style={{fontSize: 'small', position: 'absolute', right: '4px'}}>2 mins ago</span>   
                                    </div>
                                    <div style={{height: '50%', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left'}}>
                                        <span>My name is Fabian...</span>
                                        <span style={{fontSize: 'small', height: '20px', width: '20px', position: 'absolute', right: '10px', fontWeight: '500', borderRadius: '50%', background: 'orangered', color: '#fff', textAlign: 'center'}}>2</span>  
                                    </div>
                                </div>
                                
                            </section>
                        )
                    }
                   

                </div>
                <div className="seller-chat-room">
                    <div className="seller-chat-header" style={{height: '60px'}}>
                        
                    </div>
                    
                    <div className="seller-chat-box">
                        {
                            chatList.map((item, index) => 
                            
                               
                                    
                                        item.who ? 
                                        <div className="seller-chat-cnt" style={{float: 'left', textAlign: 'left'}}>
                                            <section id='sellerChatMate' style={{float: 'left', textAlign: 'left'}}>
                                                {item.mssg}
                                            </section>
                                        </div>
                                        :
                                        <div className="seller-chat-cnt" style={{float: 'right', textAlign: 'left'}}>
                                            <section id='sellerChat' style={{float: 'right', textAlign: 'left'}}>
                                                {item.mssg}
                                            </section>
                                        </div>
                                    
                                
                                
                            )
                        }
                    </div>
                    <div className="seller-chat-tools shadow-sm" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <textarea name="" style={{width: '60%', height: '100%', resize: 'none', padding: '10px 20px 10px 20px', outline: 'none', fontSize: 'large', fontWeight: '400', background: '#f9f9f9', borderRadius: '30px'}} placeholder='Message...'></textarea>
                        <button style={{float: 'right', width: '60px', borderRadius: '20px', padding: '10px', outline: 'none', border: 'none'}}>  
                            <img src={audioSvg} style={{height: '25px', width: '25px', }} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Messages;