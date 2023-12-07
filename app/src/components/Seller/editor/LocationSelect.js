const LocationSelect = ({edit,productLocale}) => {
    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Gender</label>

                <select onInput={e => productLocale(e.target.value)} name="condition" id="">
                    <option value={''}>Select Gender</option>
                    {
                        ["Male", "Female", "Unisex"].map ((item, index) => 
                            item === edit.condition
                            ?
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )
                    }

                </select>
            </div>
        </>
     );
}
 
export default LocationSelect;