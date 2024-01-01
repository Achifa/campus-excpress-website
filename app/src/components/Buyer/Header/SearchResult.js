import { useNavigate } from "react-router-dom";

const SearchResult = ({list,searchTop,searchLeft,searchDisplay}) => {
    let navigate = useNavigate()

    return ( 
        <>

            <div onClick={e => {
                document.querySelector('.buyer-search-overlay').removeAttribute('id')
            }} className="buyer-search-overlay" style={{ display: searchDisplay}}>
                <div className="buyer-search-result" style={{left: `${searchLeft}px`, top: `${searchTop + 60}px`, height: 'fit-content', padding: '15px'}}>
                    <ul style={{margin: '0', padding: '0', color: 'orangered'}}>
                        
                    {
                        list.map((item, index) => 
                            <li onClick={e => navigate(`/product/${item[0]?.product_id}`)} style={{margin: '0', padding: '10px', color: 'orangered', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'left', cursor: 'pointer', fontSize: 'small', width: '100%'}} key={index}>
                                <span style={{fontWeight: '500'}}>--</span>
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