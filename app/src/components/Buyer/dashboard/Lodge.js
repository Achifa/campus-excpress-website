import { useEffect, useState } from "react";
import { GetLodges } from "../../../api/buyer";
import Thumbnail from "../Thumbnail";
import LodgeThumbnail from "../LodgeThumbnail";
import Video from "./Video";

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
                <section style={{display: 'flex', height: 'fit-content', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 10px 0', width: '100%'}}>
                        {/* <Video />
                        <Video /> */}
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        {/* <Video />
                        <Video /> */}
                    </div>
                </section> 
            </div> 
            <br />
        </>
     );
}
 
export default Lodge;