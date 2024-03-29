// import { useEffect, useState } from "react";
// import { GetOrders } from "../../../api/buyer";
// import Card from "./Card";


// const Orders = () => {
    
//     let [order_list, set_order_list] = useState([])

//     useEffect(() => {
//         GetOrders(window.localStorage.getItem('CE_buyer_id'))
//         .then((result) => {
//             set_order_list(result)
//         })
//         .catch((err) => console.log(err))
//     }, [])
   
//     return ( 
//         <>
//             <div className="seller-order-cnt">
//                 {
//                     order_list.map((item, index) => 
                    
//                         <Card index={index} item={item}  />
//                     )
//                 }
//             </div>
//         </>
//      );
// }
 
// export default Orders;