import { useEffect, useState } from "react"
import { GetSeller } from "../../../api/seller"


const LocationSelect = ({edit,productLocale}) => {
    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');
        GetSeller(window.localStorage.getItem('CE_seller_id'))
        .then((result) => {
            setCampus(result.campus)
            setState(result.state)
            productLocale(result.state + ',' + ' ' + result.campus)
            overlay.removeAttribute('id')
        }) 
        .catch((err) => console.log(err))
    }, [])


    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Location</label>

                {/* <select onInput={e => productLocale(e.target.value)} name="condition" id="">
                    <option value={''}>Select Location</option>
                    {
                        ["Male", "Female", "Unisex"].map ((item, index) => 
                            item === edit.condition
                            ?
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )
                    }
                </select> */}

                <input type="text" value={state + ',' + ' ' + campus} />
            </div>
        </>
     );
}
 
export default LocationSelect;