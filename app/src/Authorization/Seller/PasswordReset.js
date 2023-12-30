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

    useEffect(() => {
        CheckPwdResetToken(userData.seller_id,location.pathname.split('/').splice(-1)[0])
        .then((result) => {
            if(result){
                setIsTokenVerified(true)
            }else{
                setIsTokenVerified(false)
            }
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
                    isTokenVerified

                    ?
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

                    :
                    <>
                        <div>
                            <h2>Bad Link</h2>
                            <h4>
                                The Link You Entered Is Not Valid
                            </h4>
                        </div>
                    </>

                }
                
            </div>
        </>
     );
}
 
export default PasswordReset;