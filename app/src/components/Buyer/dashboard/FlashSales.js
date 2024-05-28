import phn from '../../../images/images (2).jpeg'
import groce from '../../../images/download (4).jpeg'
import gen from '../../../images/download (6).jpeg'
import laptop from '../../../images/depositphotos_5317355-stock-photo-set-of-white-laptops.jpg'
import shoe from '../../../images/download (8).jpeg'
import clothes from '../../../images/download (9).jpeg'
import watch from '../../../images/download (10).jpeg'
import tab from '../../../images/download (13).jpeg'
import lodge from '../../../images/images (3).jpeg'
import hb from '../../../images/images (4).jpeg'
import pet from '../../../images/images (5).jpeg'

const FlashSales = () => {
    return ( 
        <>
            <div className="buyer-flash-sales" style={{padding: '0px'}}>
                <div style={{height: '50px', padding: '0px', width: 'calc(100% - 0px)', fontFamily: 'cursive'}}>
                    {/* <div style={{float: 'left', color: 'orangered', fontSize: '3vh'}}><b>Get The Best Deals Here</b></div> */}

                    {/* <div style={{float: 'right', cursor: 'pointer'}}><i>SEE ALL</i></div> */}
                </div>
                <ul>
                    <li>
                        <img src={phn}  style={{height: '100%', border: '2px solid #f9f9f9', width: '100%', borderRadius: '5px'}} alt="" />
                    </li>
                    <li>
                        <img src={laptop}  style={{height: '100%', border: '2px solid #f9f9f9', width: '100%', borderRadius: '5px'}} alt="" />
                    </li>
                    <li>
                        <img src={gen}  style={{height: '100%', border: '2px solid #f9f9f9', width: '100%', borderRadius: '5px'}} alt="" />
                    </li>
                    <li>
                        <img src={tab}  style={{height: '100%', border: '2px solid #f9f9f9', width: '100%', borderRadius: '5px'}} alt="" />
                    </li>
                    <li>
                        <img src={watch}  style={{height: '100%', border: '2px solid #f9f9f9', width: '100%', borderRadius: '5px'}} alt="" />
                    </li>

                    <li>
                        <img src={shoe}  style={{height: '100%', border: '2px solid #f9f9f9', width: '100%', borderRadius: '5px'}} alt="" />
                    </li>
                    <li>
                        <img src={clothes}  style={{height: '100%', border: '2px solid #f9f9f9', width: '100%', borderRadius: '5px'}} alt="" />
                    </li>
                    <li>
                        <img src={groce}  style={{height: '100%', border: '2px solid #f9f9f9', width: '100%', borderRadius: '5px'}} alt="" />
                    </li>
                    <li>
                        <img src={hb}  style={{height: '100%', border: '2px solid #f9f9f9', width: '100%', borderRadius: '5px'}} alt="" />
                    </li>
                    <li>
                        <img src={lodge}  style={{height: '100%', border: '2px solid #f9f9f9', width: '100%', borderRadius: '5px'}} alt="" />
                    </li>
                </ul>
            </div>
            <br />
        </>
     );
}
 
export default FlashSales;