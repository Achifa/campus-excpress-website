import { useLocation } from "react-router-dom";
import Settings from "../../components/Seller/settings/Settings";
import { useEffect, useState } from "react";
import PasswordReset from "../../components/Seller/settings/PasswordReset";
import Verification from "../../components/Seller/settings/Verification";
import NoticeSetup from "../../components/Seller/settings/NoticeSetup";
import ProfileSetup from "../../components/Seller/settings/ProfileSetup";

const Setting = () => {

    let location = useLocation();

    let [Jsx, SetJsx] = useState(<PasswordReset />)

    useEffect(() => {
        if(location.search.split('=')[1] === 'password-reset'){
            SetJsx(<PasswordReset />)
        }else if(location.search.split('=')[1] === 'verification'){
            SetJsx(<Verification />)
        }else if(location.search.split('=')[1] === 'notification-setup'){
            SetJsx(<NoticeSetup />) 
        }else if(location.search.split('=')[1] === 'profile-setup'){
            SetJsx(<ProfileSetup />)
        }
    }, [location])
    return ( 
        <>

            <div className="seller-main">
                {

                    location.search === ''
                    ? 
                    <Settings />
                    :
                    Jsx
                }
            </div>
        </>
     );
}
 
export default Setting;