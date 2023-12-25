
const SearchResult = ({list,searchTop,searchLeft,searchDisplay,changeDisplay}) => {


    return ( 
        <>

            <div onClick={e => {
                document.querySelector('.buyer-search-overlay').removeAttribute('id')
            }} className="buyer-search-overlay" style={{ display: searchDisplay}}>
                <div className="buyer-search-result" style={{left: `${searchLeft}px`, top: `${searchTop + 60}px`}}>
                    <ul>
                        
                    {
                        list.map((item, index) => 
                        
                            <li key={index}>{item.title}</li>
                        )
                    }
                    </ul>
                </div>
            </div>
            
        </>
     );
}
 
export default SearchResult;