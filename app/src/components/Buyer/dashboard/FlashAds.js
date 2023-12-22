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

const FlashAds = () => {
    return ( 
        <>
            <div className="buyer-flash-ads">
                <div style={{height: '50px', padding: '10px'}}>
                    <div style={{float: 'left', color: 'orangered'}}><b>Flash Sales</b></div>

                    {/* <div style={{float: 'right', cursor: 'pointer'}}><i>SEE ALL</i></div> */}
                </div>
                <ul>
                    <li  style={{backgroundImage: `url(${phn})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>

                    <li  style={{backgroundImage: `url(${groce})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>

                    <li  style={{backgroundImage: `url(${shoe})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>

                    <li  style={{backgroundImage: `url(${clothes})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>

                    <li  style={{backgroundImage: `url(${gen})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>

                    <li  style={{backgroundImage: `url(${watch})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>

                    <li  style={{backgroundImage: `url(${laptop})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>

                    <li  style={{backgroundImage: `url(${tab})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>

                    <li  style={{backgroundImage: `url(${hb})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>

                    <li  style={{backgroundImage: `url(${pet})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>

                    <li  style={{backgroundImage: `url(${lodge})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>


                    </li>
                    {/* <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li> */}
                </ul>
            </div>
            <br />
        </>
     );
}
 
export default FlashAds;