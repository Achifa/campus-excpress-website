import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    let navigation = useNavigate()

    let products = [
        {condition: 'Total Products For Sale ', text: 0},
        {condition: 'Total Products Sold', text: 0},
        {condition: 'Total Products Unsold', text: 0},
        {condition: 'Total Products Reported', text: 0}
    ]
    return ( 
        <>
            <div className="seller-home">
                <div className="seller-home-overview">

                    <ul>

                        {
                            products.map((item, index) => 
                                <li style={{borderLeft: index === 0 ? 'none' : '1px solid orangered', borderRight: index === products.length - 1 ? 'none' : '1px solid orangered'}}>
                                    <div><h4>{item.text}</h4></div>
                                    <div><h5>{item.condition}</h5></div>
                                   
                                </li>
                            )
                        }
                        
                       
                    </ul>

                </div>

                <div className="seller-home-list">
                    
                   
                </div>
                
            </div>
        </>
     );
}
 
export default Home;