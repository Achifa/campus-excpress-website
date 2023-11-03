import { useState } from "react"
import { LogBuyerIn } from "../../api/buyer"
import { useNavigate } from "react-router-dom";
import '../../styles/Buyer/login.css'
const BuyerLogin = () => {
    let navigate = useNavigate();

    let [email, setEmail] = useState('')
    let [pwd, setPwd] = useState('')
    let Login = () => {
        LogBuyerIn(email,pwd)
        .then((result) => {
            window.localStorage.setItem("CE_buyer_id", result.id)
            window.localStorage.setItem("CE_buyer_name_initial", result.name)
            navigate('/buyer')
        })
        .catch((err) => console.log(err))
    }
    return ( 
        <>
            <div className="buyer-login-cnt">
                <section className="shadow-sm">
                    <h3 style={{color: 'orangered'}}>Login Here</h3>
                    <form action="">
                    


                     

                        <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="buyer-input-cnt">
                            <label htmlFor="">Email</label>
                            <input onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
                            
                        </div>

                        <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="buyer-input-cnt">
                            <label htmlFor="">Password</label>
                            <input onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="text" />
                            
                        </div>

                        

                        
                      
                        <div className="buyer-input-cnt">
                            
                           <button onClick={e => {e.preventDefault(); Login()}}>Login</button>
                            
                        </div>
                    </form>

                    <div>
                        <small>Forgot Password? Recover Password Here</small>
                    </div>
                    <div>
                        <small>Don't Have An Account, Signup Here</small>
                    </div>
                </section>
            </div>
        </>
     );
}
 
export default BuyerLogin;