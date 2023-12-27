import { useState } from 'react';
import { ResetPwd } from '../../api/seller';
import '../../styles/settings.css';

const PasswordReset = () => {

    let [email, setemail] = useState('')

    return ( 
        <>

            <div className="password-reset">
                <form action="">
                    <h4 style={{color: 'orangered'}}>Password Reset</h4>

                    <br />
                    <div className="input-cnt">
                        <label htmlFor="">Enter registered email</label>
                        <input onInput={e => setemail(e.target.value)} type="text" placeholder="Enter Registered Email Here..."/>
                    </div>

                    <button onClick={e =>{e.preventDefault(); ResetPwd(email);}}>Send Password</button>
                    <br />
                    <br />
                    <small>A default password will be sent to your registered email.</small>

                </form>
                
            </div>
        </>
     );
}
 
export default PasswordReset;