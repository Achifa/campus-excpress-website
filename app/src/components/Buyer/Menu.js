import orderSvg from '../../assets/order-svgrepo-com (1).svg'
import cartSvg from '../../assets/cart-shopping-fast-svgrepo-com (1).svg'
import settingsSvg from '../../assets/settings-svgrepo-com (3).svg'
import adsSvg from '../../assets/ad-svgrepo-com.svg'
import savedSvg from '../../assets/bookmark-outlined-saved-svgrepo-com.svg'
import subSvg from '../../assets/subscriptions-svgrepo-com.svg'
import walletSvg from '../../assets/wallet-2-svgrepo-com.svg'
import sellSvg from '../../assets/sell-svgrepo-com (1).svg'
import logoutSvg from '../../assets/logout-2-svgrepo-com.svg'

const BuyerMenu = () => {
    return ( 
        <>
            <div className="buyer-menu-cnt">
              <section>

                <div className="buyer-name">
                  Akpulu Fabian
                </div>

              </section>
              <hr />
              <ul>
                <li className="">
                  <span>
                    <img src={orderSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                  </span>
                  &nbsp;
                  <span>Your Orders</span>
                </li>
                <li className="">
                  <span>
                    <img src={subSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                  </span>
                  &nbsp;
                  <span>Subscriptions</span>
                </li>
                <li className="">
                  <span>
                    <img src={walletSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                  </span>
                  &nbsp;
                  <span>Wallet</span>
                </li>
                
                <li className="">
                  <span>
                    <img src={cartSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                  </span>
                  &nbsp;
                  <span>Cart</span>
                </li>
                <li className="">
                  <span>
                    <img src={savedSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                  </span>
                  &nbsp;
                  <span>Saved Items</span>
                </li>

                <hr />

                <li className="">
                  <span>
                    <img src={sellSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                  </span>
                  &nbsp;
                  <span>Sell on Campus Express</span>
                </li>
                <li className="">
                  <span>
                    <img src={adsSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                  </span>
                  &nbsp;
                  <span>Advertise with Campus Express</span>
                </li>

                <hr />
                <li className="">
                  <span>
                    <img src={settingsSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                  </span>
                  &nbsp;
                  <span>Settings</span>
                </li>

                <li className="">
                  <span>
                    <img src={logoutSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                  </span>
                  &nbsp;
                  <span>Logout</span>
                </li>
                
              </ul>
            </div>
        </>
     );
}
 
export default BuyerMenu;