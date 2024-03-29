
import AdminDashboard from '../../pages/Admin/Dashboard';
import AdminHeader from '../../components/Admin/Header/Header';
import AdminAside from '../../components/Admin/Aside/Aside';
import AdminUser from '../../pages/Admin/User';
import AdminOrder from '../../pages/Admin/Order';
import AdminInbox from '../../pages/Admin/Inbox';
import AdminAds from '../../pages/Admin/Ads';
 

export let admin_route = [
    { path: '/admin/', component: <AdminDashboard />},
    { path: '/admin/users', component: <AdminUser />},
    { path: '/admin/orders', component: <AdminOrder />},
    { path: '/admin/inbox', component: <AdminInbox />},
    { path: '/admin/ads', component: <AdminAds />}
]