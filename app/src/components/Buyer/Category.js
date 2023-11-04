import { useEffect, useState } from "react";
import items from '../../items.json'

const Category = () => {
    let [categoriesList, setCategoriesList] = useState([])

    useEffect(() => {
        setCategoriesList(items.items.category)
    },[])
    return ( 
        <>
            <div className="buyer-category shadow-sm">
                <ul>

                    <li >
                        Trends
                    </li>

                    <li >
                        For You
                    </li>
                    {
                        categoriesList.map((item, index) => 
                            <li key={index}>
                                {Object.keys(item)[0]}
                            </li>
                        )
                    }
                    
                </ul>
            </div>
        </>
     );
}
 
export default Category;