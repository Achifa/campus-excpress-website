import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchResult = ({searchTop,searchLeft,searchDisplay}) => {
    let navigate = useNavigate()
    let {
        SearchList
    } = useSelector(s => s.SearchList)

    let [searchRes, setSearchRes] = useState([])
    useEffect(() => {
        setSearchRes(SearchList)
    console.log(SearchList)

    }, [SearchList])

    
    return (  
        <>

            <div onClick={e => {
                document.querySelector('.buyer-overlay').removeAttribute('id')
            }} className="buyer-overlay" style={{ display: searchDisplay}}>
                <div className="buyer-result" style={{left: `${searchLeft}px`, top: `${searchTop + 60}px`, height: 'fit-content', padding: '5px'}}>
                    <ul style={{margin: '0', padding: '0', color: '#000'}}>
                        
                    {
                        searchRes?.map((item, index) => 
                            <li className="shadow-sm" onClick={e => navigate(`/product/${item[0]?.product_id}`)} key={index}>
                                <span style={{fontWeight: '500'}}></span>
                                &nbsp;
                                &nbsp;
                                <span >{item?.title}</span>
                            </li>
                        )
                    }
                    </ul>
                </div>
            </div>
            
        </>
     );
}
 
export default SearchResult;