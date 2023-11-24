import '../../styles/settings.css';

const NoticeSetup = () => {
    return ( 
        <>

            <div className="password-reset">
                <form action="">
                    <h4 style={{color: 'orangered'}}>Setup Notification</h4>
                    <br />

                    <div className="input-cnt" style={{height: '20px', width: '100%', display: 'flex', flexDirection: 'row'}}>
                        <input style={{height: '20px', width: '20px', marginRight: '10px'}} type="checkbox" onInput={e => ''} name="paymentMethod" id="ceWallet" />
                        <label style={{fontSize: 'medium', marginBottom: '15px'}} htmlFor="ceWallet">Receive Notification Via Email</label>

                    </div>

                    <br />


                    <div className="input-cnt" style={{height: '20px', width: '100%', display: 'flex', flexDirection: 'row'}}>
                        <input style={{height: '20px', width: '20px', marginRight: '10px'}} type="checkbox" onInput={e => ''} name="paymentMethod" id="Card" />
                        <label style={{fontSize: 'medium', marginBottom: '15px'}} htmlFor="Card">Receive Notification Via SMS</label>

                    </div>

                    <br />
                    <br />


                    <button>Apply</button>
                    <br />
                    <br />
                </form>
                
            </div>
        </>
     );
}
 
export default NoticeSetup;