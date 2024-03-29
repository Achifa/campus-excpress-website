// import { useEffect, useState } from "react";
// import { GetLodges } from "../../../api/buyer";
// import Thumbnail from "../Thumbnail";
// import LodgeThumbnail from "../LodgeThumbnail";
// import Video from "./Video";

// const Lodge = () => {
//     let [items, setItems] = useState([])

//     useEffect(() => {
//         let overlay = document.querySelector('.overlay');
//         //overlay.setAttribute('id', 'overlay');

//         GetLodges()
//         .then((result) => {
//             setItems(result)
//             overlay.removeAttribute('id');
//         })
//         .catch(err => console.log(err))

//     }, [])
//     return ( 
//         <>
//             <div className="buyer-flash-ads" style={{
//                     height: '350px', width: '100%'
//                 }}>
//                 <div style={{height: '50px', padding: '10px', borderBottom: '1px solid #efefef', marginBottom: '5px'}}>
//                     <div style={{float: 'left', color: 'orangered'}}><b>Lodges For Sale</b></div>

//                     <div style={{float: 'right', cursor: 'pointer'}}><i>SEE ALL</i></div>
//                 </div>
                
                    
//                 <ul style={{
//                     height: '270px', width: '100%', position: 'relative', padding: '0', listStyleType: 'none', margin: '0', overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'left', flexDirection: 'row'
//                 }}>
                
//                     <li  style={{ 
//                         height: '250px', width: '250px', flexShrink: '0'
//                     }}></li>

// <li  style={{
//                         height: '250px', width: '250px', flexShrink: '0'
//                     }}></li>

// <li  style={{
//                         height: '250px', width: '250px', flexShrink: '0'
//                     }}></li>
//                     <li  style={{
//                         height: '250px', width: '250px', flexShrink: '0'
//                     }}></li>

// <li  style={{
//                         height: '250px', width: '250px', flexShrink: '0'
//                     }}></li>

// <li  style={{
//                         height: '250px', width: '250px', flexShrink: '0'
//                     }}></li>

                    
                
//                 </ul>
//             </div> 
//             <br />
//         </>
//      );
// }
 
// export default Lodge;