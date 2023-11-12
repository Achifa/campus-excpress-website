import { Link } from 'react-router-dom';
import img from '../../assets/download (3).jpeg'
import { useNavigate } from 'react-router-dom';
const Wallets = () => {
    let navigate = useNavigate();
    return ( 
        <>
            <div className="seller-wallet-cnt">
                <div className="seller-wallet-top shadow-sm">
                    <p><span style={{fontSize: 'medium', marginBottom: '20px'}}>Current Balance</span> <span>&#8358;4500000</span></p>
                    <div>
                        <span style={{fontSize: 'medium', height: '50%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>Transacton History</span>
                        <span onClick={e => navigate('/https://flutterwave.com/pay/campus-express')} style={{fontSize: 'medium', height: '50%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>Deposit</span>
                    </div>
                </div>

                <div className="seller-wallet-middle shadow-sm">
                    <div>
                        <section>Withdraw</section>
                        <br />
                        <section><small>Withdraw funds from campus express every Tuesday.</small></section>
                    </div>
                    <div>
                        <section>Payments</section>
                        <br />

                        <section><small>View payments from clients.</small></section>
                    </div>
                    <div>
                        <section>Tranfer</section>
                        <br />

                        <section><small>Enjoy our banking services by transfering to any bank.</small></section>
                    </div>
                </div>

                <div className="seller-wallet-bottom shadow-sm">

                    <h4>Subscriptions</h4>
                    <br />
                    <div>
                        <section>Withdraw</section>
                        <br />
                        <section><small>Withdraw funds from campus express every Tuesday.</small></section>
                    </div>
                    <div>
                        <section>Payments</section>
                        <br />

                        <section><small>View payments from clients.</small></section>
                    </div>
                    <div>
                        <section>Tranfer</section>
                        <br />

                        <section><small>Enjoy our banking services by transfering to any bank.</small></section>
                    </div>
                </div>
                
                
            </div>
        </>
     );
}
 
export default Wallets;
