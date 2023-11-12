import { Link } from 'react-router-dom';
import img from '../../assets/download (3).jpeg'

const Wallets = () => {
    return ( 
        <>
            <div className="seller-wallet-cnt">
                <div className="seller-wallet-top shadow-sm">
                    <p><span style={{fontSize: 'medium', marginBottom: '20px'}}>Current Balance</span> <span><small>&#8358;</small> 0.00</span></p>
                    <Link>
                        <span style={{fontSize: 'medium', height: '50%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>Transacton History</span>
                        <span style={{fontSize: 'medium', height: '50%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>Payments</span>
                    </Link>
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