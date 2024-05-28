import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import ItemImgs from './ItemImgs'
import Description from './Description'
import { GetItem } from '../../../api/seller/get';




const Product = ({product_id}) => {
    let [item, setItem] = useState(
        {
            id: '',
            product_id: '',
            date: '',
            seller_id: '',
            title: '',
            category: '',
            type: '',
            condition: '',
            stock: '',
            locale: '',
            price: '',
            description: '',
            package: ''
        }
    )

    let [stock, set_stock] = useState(1)
 
    let [activeImg, setActiveImg] = useState(imgSvg)

    let {ItemImages} = useSelector(s => s.itemImages)
    let {ActiveImg} = useSelector(s => s.ActiveImg)

    let [role, setRole] = useState(0)

    let location = useLocation()

    useEffect(() => {
        if(location.search !== ''){
            setRole(1)
        }else{
            setRole(0)
        }
    }, [location])

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');
        
        GetItem(product_id)
        .then((result) => {
            setItem(result[0])
            set_stock(result[0].others ? JSON.parse(result[0].others).stock : 1)
            overlay.removeAttribute('id')
        })
        .catch(err => console.log(err))

    }, [])

  let navigate = useNavigate();

    useEffect(() => {
        setActiveImg(ItemImages.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ItemImages])

    useEffect(() => {
        setActiveImg(ItemImages.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ActiveImg])

    let [immediate_purchase, set_immediate_purchase] = useState(1)

    return ( 
        <>
          
            <div className="overlay">
                <div className="loader">
                </div>
            </div>
            <div className="buy_now_overlay" onClick={e => {
                if(e.target === document.querySelector('.buy_now_overlay')){document.querySelector('.buy_now_overlay').removeAttribute('id')}
            }}>
                <div className="buy_now_cnt">
                    <p style={{color: 'orangered', textDecoration: 'underline'}}><b> {stock} Units</b></p>


                    <p style={{textAlign: 'left', justifyContent: 'left'}}>There Are Only {stock} Availble {item.title}</p>

                    <div className="btn-cnt"> 
                        <button onClick={e => {e.preventDefault(); if(immediate_purchase > 1){set_immediate_purchase(immediate_purchase - 1)}}}>-</button>
                        <div  style={{height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{immediate_purchase}</div>
                        <button onClick={e => {e.preventDefault(); if(immediate_purchase <  stock){set_immediate_purchase(immediate_purchase + 1)}}}>+</button>
                    </div>
                    <br />

                    <p style={{textAlign: 'left', justifyContent: 'left'}}>You Are Buying {immediate_purchase} Unit Of {item.title}</p>

                    <br />
                    <button style={{fontSize: 'small'}} onClick={
                        e => role === 0 ? navigate(`/checkout/${btoa(item.product_id)}/${btoa(item.price * immediate_purchase)}/immediate_purchase-${immediate_purchase}`) : navigate(`/seller/editor?product_id=${item.product_id}`)
                    }>Checkout SubTotal ({item.price * immediate_purchase})</button>
                </div>
            </div>

            <div className="buyer-product" style={{width: '100%', padding: '5px'}}>
                <div className="buyer-product-cnt" style={{display: 'flex', flexDirection: 'column'}}>
                    <div className="buyer-product-data" style={{display: 'flex', flexDirection: 'column', margin: '0', width: '100%'}}>
                        <div id="left" >
                            <div className="img-cnt" style={{backgroundImage: `url(${activeImg})`, height: '250px', borderRadius: '5px', backgroundRepeat: 'no-repeat', backgroundSize: '200px 200px', backgroundPosition: 'center'}}>
                                {/* <img src={activeImg} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" /> */}
                            </div>
                            <ItemImgs />
                        </div>

                        <div id="right" style={{width: '100%'}}>
  
                            <p style={{fontWeight: '400', padding: '0px', fontSize: 'x-large'}}>{item['title']}</p>

                            <section style={{display: 'flex', justifyContent: 'center'}}>
                                <div style={{fontSize: 'x-small'}}>
                                    <span ><span style={{color: '#626262', fontSize: 'x-small'}}>Shop ID :</span> <span style={{color: 'orangered', fontSize: 'x-small'}}>CE_4590-ddf</span></span> 
                                </div>
                                &nbsp;
                                &nbsp; 
                                <div style={{fontSize: 'x-small'}}>
                                    <span><span style={{color: '#626262', fontSize: 'x-small'}}>Product Code: </span> <span style={{color: 'orangered', fontWeight: '700', fontSize: 'x-small'}}>{item.product_id}</span></span>
                                </div>
                                &nbsp;
                                &nbsp;
                                <div style={{fontSize: 'x-small'}}>
                                    <span><span style={{color: '#626262', fontSize: 'x-small'}}>Shop Rating:</span> <span style={{color: 'orangered', fontSize: 'x-small'}}>Jacob N.N</span></span>
                                </div>
                            </section>

                            <hr style={{margin: '15px'}} />

                            {/* <br /> */}

                            <div style={{background: '#fff4e0', padding: '10px', color: 'orangered', fontWeight: '500', borderRadius: '5px', height: 'fit-content'}}>
                                <p style={{fontWeight: '400', padding: '0px', fontSize: 'xx-large'}}>
                                    <small>&#8358;</small>{new Intl.NumberFormat('en-us').format(item.price)}
                                </p>
                                <p style={{fontWeight: '500', padding: '0px'}}>{stock} Units Available</p>

                                <p>+ shipping from ₦0 to AWKA TOWN</p> 
                            </div>

                            {/* <hr /> */}
                            {/* <br /> */}

                           


                         
                          
                        </div>
                    </div>      
                    <Description item={item} />


                </div>
            </div>
        </>
     );
}
 
export default Product;