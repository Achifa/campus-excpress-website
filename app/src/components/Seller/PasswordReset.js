import '../../styles/settings.css';

const PasswordReset = () => {
    return ( 
        <>

            <div className="password-reset">
                <form action="">
                    <h4 style={{color: 'orangered'}}>Password Reset</h4>

                    <br />
                    <div className="input-cnt">
                        <label htmlFor="">Enter registered email</label>
                        <input type="text" placeholder="Enter Registered Email Here..."/>
                    </div>

                    <button>Send Password</button>
                    <br />
                    <br />
                    <small>A default password will be sent to your registered email.</small>

                </form>
                
            </div>
        </>
     );
}
 
export default PasswordReset;