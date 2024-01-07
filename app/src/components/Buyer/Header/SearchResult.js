import { useNavigate } from "react-router-dom";

const SearchResult = ({list,searchTop,searchLeft,searchDisplay}) => {
    let navigate = useNavigate()

    return ( 
        <>

            <div onClick={e => {
                document.querySelector('.buyer-search-overlay').removeAttribute('id')
            }} className="buyer-search-overlay" style={{ display: searchDisplay}}>
                <div className="buyer-search-result" style={{left: `${searchLeft}px`, top: `${searchTop + 60}px`, height: 'fit-content', padding: '5px'}}>
                    <ul style={{margin: '0', padding: '0', color: '#000'}}>
                        
                    {
                        list.map((item, index) => 
                            <li className="shadow-sm" onClick={e => navigate(`/product/${item[0]?.product_id}`)} key={index}>
                                <span style={{fontWeight: '500'}}></span>
                                &nbsp;
                                &nbsp;
                                <span >{item[0]?.title}</span>
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