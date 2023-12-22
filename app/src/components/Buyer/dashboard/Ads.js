import Category from "../../../redux/buyer/Category";
import img from '../../../images/Slider.png'
const Ads = () => {
    return ( 
        <>
            <div className="buyer-ads-cnt">
                <section>
                    {/* <Category />  */}
                </section>
                <section className="img-cnt">
                    <img src={img}  alt="" />
                </section>
            </div>
        </> 
     );
} 
 
export default Ads; 