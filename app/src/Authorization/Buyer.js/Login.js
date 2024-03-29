import { 
    useState 
} from "react"
import { 
    useNavigate 
} from "react-router-dom";
import '../../styles/Buyer/login.css'
import { 
    LogBuyerIn 
} from "../../api/buyer/post";



const BuyerLogin = ({query}) => {
    let navigate = useNavigate();
    let [btn, setBtn] = useState("Login")


    let [email, setEmail] = useState('')
    let [pwd, setPwd] = useState('')
    let Login = async() => {
        let result = await LogBuyerIn(email,pwd)
        setBtn(
            <div className="Authloader" style={{background: '#fff'}}></div>
        )
       if(result){
            window.localStorage.setItem("CE_buyer_id", result.id)
            window.localStorage.setItem("CE_buyer_name_initial", result.name)
            navigate('/')
       }else{
        alert('error logging in from buyer  000')
        setBtn("Login")

       }
    }
    return ( 
        <>
            <div className="seller-login-cnt">
                <section className="shadow-sm" style={{background: '#fff', justifyContent: 'center'}}>
                    
                    <form action="">
                        <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="seller-input-cnt">
                            <label htmlFor="">Email</label>
                            <input onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
                            
                        </div>

                        <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="seller-input-cnt">
                            <label htmlFor="">Password</label>
                            <input onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="text" />
                            
                        </div>

                        <div className="seller-input-cnt">
                            
                           <button onClick={e => {e.preventDefault(); Login()}}>Login</button>
                            
                        </div>
                    </form>

                    <div onClick={e => navigate('/reset-password')} style={{cursor: 'pointer'}}>
                        <small>Forgot Password? Recover Password Here</small>
                    </div>
                    <div style={{cursor: 'pointer'}} onClick={e => query !== '' ? navigate(`/signup/?resource=${query}`) : navigate('/signup')}>
                        <small>Don't Have An Account, Signup Here</small>
                    </div>

                </section>
            </div>
        </>
     );
}
 
export default BuyerLogin;