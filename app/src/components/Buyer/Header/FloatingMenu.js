import { useState } from 'react';
import '../../../styles/floating.css'

const FloatingMenu = ({list,right,top,visible,getSelectedOption}) => {

    return ( 
        <>
            <div className="floating-cnt shadow-sm" style={{left: `${right - 140}px`, top: `${top + 50}px`, display: visible}}>
                <ul>
                    {
                        list.map((item) =>  
                        
                            <li onClick={e => getSelectedOption(item)}>{item}</li>
                        )
                    }
                </ul>
            </div>
        </>
     );
}
 
export default FloatingMenu;