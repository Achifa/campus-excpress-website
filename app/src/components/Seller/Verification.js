import '../../styles/settings.css';

const Verification = () => {
    return ( 
        <>

            <div className="password-reset">
                <form action="">
                    <h4 style={{color: 'orangered'}}>Verification</h4>

                    <br />
                    <div className="input-cnt">
                        <label htmlFor="">Enter Your NIN Number</label>
                        <input type="text" placeholder="Enter NIN Here..."/>
                    </div>

                    <button>Verify NIN</button>
                    <br />
                    <br />
                    <small>Your account will be verified if valid.</small>

                </form>
                
            </div>
        </>
     );
}
 
export default Verification;