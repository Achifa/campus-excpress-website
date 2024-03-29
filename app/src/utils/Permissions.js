
import { buyer_route, route } from './routes/buyer_route';
import { admin_route } from './routes/admin_route';
import { seller_route } from './routes/seller_route';


const rolePermission = {
    seller: seller_route,

    buyer: buyer_route, 

    admin: admin_route
}


export default rolePermission;