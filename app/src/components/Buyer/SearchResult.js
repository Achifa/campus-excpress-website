
const SearchResult = ({list}) => {


    return ( 
        <>

            <div className="buyer-search-result">
                <ul>
                    
                   {
                    list.map((item, index) => 
                    
                        <li key={index}>{item.title}</li>
                    )
                   }
                </ul>
            </div>
        </>
     );
}
 
export default SearchResult;