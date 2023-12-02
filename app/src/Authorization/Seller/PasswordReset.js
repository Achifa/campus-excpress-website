import { useEffect, useState } from 'react';
import { GetSeller, ResetPwd } from '../../api/seller';
import '../../styles/settings.css';

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

            <div className="password-reset">
                <form action="">
                <br />
                    <h4 style={{color: 'orangered'}}>Password Reset</h4>

                    <br />
                    <div className="input-cnt">
                        <label htmlFor="">Enter New Password</label>
                        <input type="password" placeholder="Enter New Password Here..."/>
                    </div>

                    <button onClick={e =>{e.preventDefault(); ResetPwd();}}>Reset Password</button>
                    <br />

                    <br />

                </form>
                
            </div>
        </>
     );
}
 
export default PasswordReset;