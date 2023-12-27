import { useEffect, useState } from "react";
import { GetUsers } from "../../api/admin";
import js_ago from "js-ago";

const Users = () => {

    let [buyer, setbuyer] = useState([])
    let [seller, setseller] = useState([])

    let [option, setoption] = useState(1)


    useEffect(() => {
        GetUsers()
        .then(({buyers, sellers}) => {
            console.log(buyers, sellers)
            setseller(sellers)
            setbuyer(buyers)
        })
        .catch((err) => console.log(err))
    }, [])


    return ( 
        <>
            <div className="admin-user-cnt">
                <div className="admin-user-options" style={{display: 'flex', justifyContent: 'space-between', height: '60px', position: 'relative', width: '100%', padding: '10px', textAlign: 'center'}}>
                    <div onClick={e => setoption(0)} style={{textAlign: 'center', padding: '10px', alignItems: 'center', cursor: 'pointer', background: '#fff'}}>Sellers</div>
                    <div onClick={e => setoption(1)} style={{textAlign: 'center', padding: '10px', alignItems: 'center', cursor: 'pointer', background: '#fff'}}>Buyers</div>
                </div>

                <div className="admin-user-list">
                    <ul style={{listStyleType: 'none', padding:'10px', margin: '0'}}>
                        {
                            !option
                            ?
                            buyer.map(item => 
                                <li style={{height: '80px', width: '100%',display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center', borderRadius: '5px', background: '#fff', marginBottom: '10px'}}>
                                    <span>{item.fname} {item.lname}</span>
                                    <span>Registered {js_ago(new Date(item.date))}</span>
                                </li>
                            )
                            :''
                        }

                        {
                            option
                            ?
                            seller.map((item, index) => 
                                <li style={{height: '80px', width: '100%', display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center', borderRadius: '5px', background: '#fff', marginBottom: '10px'}}>
                                    <span>{index + 1.} &nbsp;{item.fname} {item.lname}</span>
                                    <span>Registered {((item.date))}</span>
                                </li> 
                            ) 
                            : ''
                        }
                    </ul>
                </div>
            </div>
        </>
     );
}
 
export default Users;