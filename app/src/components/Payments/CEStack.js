import { useEffect, useState } from "react"
import { GetBuyer } from "../../api/buyer"

const CEStack = ({amt}) => {
    
    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')

    useEffect(() => {
        GetBuyer(window.localStorage.getItem('CE_buyer_id'))
        .then((result) => {
            setFname(result.fname)
            setLname(result.lname)
            setEmail(result.email)
            setPhone(result.phone)
        })   
        .catch(err => console.log(err))
    },[])

    return ( 
        <>
 
            <form id="paymentForm">

                <h5 style={{color: 'orangered'}}>Deposit Form</h5>


                <div className="seller-input-cnt">
                    <section>
                        <label htmlFor="">FirstName</label>
                        <input value={fname} placeholder='FirstName...' type="text" />
                    </section>
                    <section>
                        <label htmlFor="">LastName</label>
                        <input value={lname}  placeholder='LastName' type="text" />
                    </section>
                </div>

                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Amount</label>
                        <input value={new Intl.NumberFormat('en-us').format(amt)} placeholder='Amount...' type="text" />
                    </section>
                     
                </div>
                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Email</label>
                        <input value={email} placeholder='Email...' type="text" />
                    </section>
                    
                </div>
                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Phone</label>
                        <input value={phone}  placeholder='Phone...' type="text" />
                    </section>
                     
                </div>

                <div className="seller-input-cnt">
                            
                    <button onClick={e => {e.preventDefault();}}>Pay</button>
                    
                </div>
            </form>
        </>
     );
}
 
export default CEStack;