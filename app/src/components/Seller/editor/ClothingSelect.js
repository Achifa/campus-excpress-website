const SubCategory = ({edit,productSubCategory,cType,gender}) => {
    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Sub Category</label>
                <select onInput={e => productSubCategory(e.target.value)} name="sub-category" id="">
                    <option value={''}>Select Sub Category</option>
                    {
                        
                        cType === 'Foot Wear'
                        ?
                        
                            
                            ["Sandals","Shoes","Cotina","Palms","Boots","Slippers"].map ((item, index) => 
                                item === window.localStorage.getItem('draft_sub_category')
                                ?
                                <option selected key={index} value={item}>{item}</option>
                                :
                                <option key={index} value={item}>{item}</option>
                            )


                        :

                            gender === 'Male'

                            ?

                            ["Underwear","Tops","Trousees","Nicker/Shorts","Sports-wear","Swim-suit"].map ((item, index) => 
                                item === window.localStorage.getItem('draft_sub_category')
                                ?
                                <option selected key={index} value={item}>{item}</option>
                                :
                                <option key={index} value={item}>{item}</option>
                            )
                            :
                            ["Underwear","Tops","Trousees","Nicker/Shorts","Sports-wear","Gown","Skirt","Swim-suit"].map ((item, index) => 
                                item === window.localStorage.getItem('draft_sub_category')
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
 
export default SubCategory;