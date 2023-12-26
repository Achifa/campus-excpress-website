import { useEffect, useState } from "react";
import { GetLodges } from "../../../api/buyer";
import Thumbnail from "../Thumbnail";
import LodgeThumbnail from "../LodgeThumbnail";

const Lodge = () => {
    let [items, setItems] = useState([])

    useEffect(() => {
        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('id', 'overlay');

        GetLodges()
        .then((result) => {
            setItems(result)
            overlay.removeAttribute('id');
        })
        .catch(err => console.log(err))

    }, [])
    return ( 
        <>
            <div className="buyer-flash-ads">
                <div style={{height: '50px', padding: '10px', borderBottom: '1px solid #efefef', marginBottom: '10px'}}>
                    <div style={{float: 'left', color: 'orangered'}}><b>Lodges For Sale</b></div>

                    <div style={{float: 'right', cursor: 'pointer'}}><i>SEE ALL</i></div>
                </div>
                <ul>
                    {
                        items.map(file => 
                        
                            <li style={{position: 'relative'}}>
                                <LodgeThumbnail product_id={file.product_id} />

                                <div style={{position: 'absolute', bottom: '0', width: '100%', background: 'orangered', color: '#fff', left: '0', height: '35px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', padding: '0 8px 0 8px', borderRadius: '5px', fontWeight: '500', fontSize: 'x-small'}}>
                                
                                    <div>
                                        &#8358;{new Intl.NumberFormat('en-us').format(file.price)}
                                    </div>
                                    <div>
                                        Unizik, Awka
                                    </div>
                                </div>



                            </li>

                        )
                    }
                    
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
 
export default Lodge;