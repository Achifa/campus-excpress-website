const ClothingCategory = ({edit,productClothingCategory}) => {
    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Clothing Category</label>
                <select onInput={e => productClothingCategory(e.target.value)} name="condition" id="">
                    <option value={''}>Select Clothing Category</option>
                    {
                        true
                        ?
                        ["Underwear","Tops","Trousees","Nicker/Shorts","Sports-wear","Swim-suit"].map ((item, index) => 
                            item === edit.condition
                            ?
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )
                        :
                        ["Underwear","Tops","Trousees","Nicker/Shorts","Sports-wear","Gown","Skirt","Swim-suit"].map ((item, index) => 
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
 
export default ClothingCategory;