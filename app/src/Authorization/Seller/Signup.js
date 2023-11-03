import { useEffect } from 'react';
import '../../styles/Seller/signup.css'

const Signup = () => {

    useEffect(() => {
        
    }, [])
    return ( 
        <>
            <div className="seller-signup">
 
                <div id="left">

                </div>
                <div id="right">
                    <form action="">
                        <div className="seller-input-cnt">
                            <section>
                                <label htmlFor="">FirstName</label>
                                <input placeholder='FirstName...' type="text" />
                            </section>
                            <section>
                                <label htmlFor="">LastName</label>
                                <input placeholder='LastName' type="text" />
                            </section>
                        </div>


                        <div className="seller-input-cnt">
                            <section style={{width: '70%'}}>
                                <label htmlFor="">Email</label>
                                <input placeholder='Email...' type="text" />
                            </section>
                            <section style={{width: '30%'}}>
                                <button>Verify</button>
                            </section>
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '70%', float: 'left'}}>
                                <label htmlFor="">Email</label>
                                <input placeholder='Email...' type="text" />
                            </section>
                            <section style={{width: '30%'}}>
                                <button>Verify</button>
                            </section>
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Password</label>
                                <input placeholder='Password...' type="text" />
                            </section>
                            
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">State</label>
                                <select name="" id="">
                                    <option value="">Select State</option>
                                </select>
                            </section>
                            
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Campus</label>
                                <select name="" id="">
                                    <option value="">Select Campus</option>
                                </select>
                            </section>
                            
                        </div>


                      
                        <div className="seller-input-cnt">
                            
                           <button>Register</button>
                            
                        </div>

                        
                       
                    </form>
                </div>

            </div>
        
        </>
     );
}
 
export default Signup;