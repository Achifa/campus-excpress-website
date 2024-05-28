import { useEffect, useState } from 'react';
import { GetSeller, ResetPwd } from '../../../api/seller';
import '../../../styles/settings.css';


const PasswordReset = () => {
    let [userData, setUserData] = useState('')

    useEffect(() => {
        GetSeller(window.localStorage.getItem('CE_seller_id'))
        .then((result) => {
            setUserData(result)
            console.log(result)
        })
        .catch((err) => console.log(err))
    }, [])
    return ( 
        <>

            <div className="password-reset" >
                <form action="" style={{height: 'fit-content', width: '400px'}}>
                {/* <br /> */}
                    {/* <h1 style={{color: 'orangered'}}>Password Reset</h1> */}

                    <br />
                    {/* <div className="input-cnt">
                        <label htmlFor="">Enter registered email</label>
                        <input type="text" placeholder="Enter Registered Email Here..."/>
                    </div> */}

                    <button style={{background: '#5b42f3'}} onClick={e =>{e.preventDefault(); ResetPwd(userData.email, userData.seller_id);}}>Send Recovery Email</button>
                    {/* <br /> */}
                    {/* <br /> */}
                    <small style={{fontWeight: '500'}}>A link will be sent to the email registered with this account.</small>

                    <br />

                </form>
                
            </div>
        </>
     );
}
 
export default PasswordReset;