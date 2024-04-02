import { useEffect, useState } from 'react';
import { CheckPwdResetToken, GetSeller, ResetPwd, updatePwd } from '../../api/seller';
import '../../styles/settings.css';
import { useLocation, useNavigate } from 'react-router-dom';

const PasswordReset = () => {
    let [userData, setUserData] = useState('')
    let [pwd, setPwd] = useState('')
    let [isTokenVerified, setIsTokenVerified] = useState(false)
    let navigate = useNavigate();
    let location = useLocation()

    useEffect(() => {
        GetSeller(window.localStorage.getItem('CE_seller_id'))
        .then((result) => {
            setUserData(result)
            console.log(result)
        })
        .catch((err) => console.log(err))
    }, [])

    
        
    function ResetPwd(params) {
        updatePwd(userData.seller_id,pwd)
        .then((result) => {
            navigate('/seller/login')
        })
        .catch((err) => console.log(err))
    }

    return ( 
        <>

            <div className="password-reset" style={{height: '100vh', margin: '0', padding: '0', width: '100%', background: '#fff'}}>
                {
                    
                    <>
                        <form action="" className='shadow-sm'style={{width: '350px'}}>
                            <br />
                            <h6 style={{color: 'orangered'}}>Password Reset</h6>

                            <br />
                            <div className="input-cnt">
                                <label htmlFor="">Enter New Password</label>
                                <input type="password" onInput={e => setPwd(e.target.value)} placeholder="Enter New Password Here..."/>
                            </div>

                            <button onClick={e =>{e.preventDefault(); ResetPwd();}}>Reset Password</button>
                            <br />

                            <br />

                        </form>
                    </>

                 
                
                     
                }
                
            </div>
        </>
     );
}
 
export default PasswordReset;