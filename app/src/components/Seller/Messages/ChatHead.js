import React from 'react'

export default function ChatHead({chatHead,SetHeadId}) {
  return (
    <div>
      <div className="seller-client-list shadow-sm">
            {
                chatHead.map((item, index) =>  
                    <section key={index} className="shadow-sm" onClick={e=> SetHeadId(item.id)}>
                        <div style={{
                            height: '50px',
                            width: '50px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'orangered',
                            float: 'left',
                            position: 'absolute',
                            left: '10px',
                            fontWeight: '500',
                            background: '#fff4e0'
                        }}>
                            {item?.name.split(' ')[0].split('')[0]}
                            {item?.name.split(' ')[1].split('')[0]} 
                        </div>
                        <div  className='seller-client-list-chat-log'>
                            <div style={{height: '50%', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left'}}>
                                <span style={{fontSize: 'medium', fontWeight: '500'}}>{item.name}</span>
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
    </div>
  )
}
