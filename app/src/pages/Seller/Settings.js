import { useLocation } from "react-router-dom";
import Settings from "../../components/Seller/Settings";
import { useEffect, useState } from "react";
import PasswordReset from "../../components/Seller/PasswordReset";
import Verification from "../../components/Seller/Verification";
import NoticeSetup from "../../components/Seller/NoticeSetup";
import ProfileSetup from "../../components/Seller/ProfileSetup";

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
            {

                location.search === ''
                ? 
                <Settings />
                :
                Jsx
            }
        </>
     );
}
 
export default Setting;