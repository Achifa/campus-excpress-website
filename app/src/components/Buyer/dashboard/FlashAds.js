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
            <div className="buyer-flash-ads" style={{
                height: '280px', width: '100%', 
            }}>
                <div style={{height: '50px', padding: '10px', borderBottom: '1px solid #efefef',}}>
                    <div style={{float: 'left', color: 'orangered'}}><b>Flash Sales</b></div>

                    <div style={{float: 'right', cursor: 'pointer'}}><i>SEE ALL</i></div>
                </div>
                <ul style={{
                    height: 'fit-content', width: '100%', padding: '0', margin: '0', overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'left', flexDirection: 'row'
                }}>
                   
                    <li  style={{
                        height: '200px', width: '200px', flexShrink: '0'
                    }}>


                    </li>
                  
                </ul>
            </div>
            {/* <br /> */}
        </>
     );
}
 
export default FlashAds;