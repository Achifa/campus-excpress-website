import { useState } from 'react';
import '../../../styles/floating.css'
import { useNavigate } from 'react-router-dom';

const FloatingMenu = ({list,right,top,visible,getSelectedOption}) => {
    let navigate = useNavigate()

    return ( 
        <>
            <div className="floating-cnt shadow-sm" style={{left: `${right - 140}px`, top: `${top + 50}px`, display: visible}}>
                <ul>
                    {
                        list.map((item) =>  
                        
                            <li onClick={e => navigate(`/${item}`)}>{item}</li>
                        )
                    }
                </ul>
            </div>
        </>
     );
}
 
export default FloatingMenu;