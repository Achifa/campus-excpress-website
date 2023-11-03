import { useEffect, useState } from 'react';
import '../../styles/plan_card.css'
import Link from 'react'
import items from '../../items.json'
import { uploadItem } from '../../api/seller';
const Editor = () => {

    let [productTitle, setProductTitle] = useState(null)
    let [productDescription, setProductDescription] = useState(null)
    let [productCategory, setProductCategory] = useState(null)
    let [productType, setProductType] = useState(null)
    let [productPrice, setProductPrice] = useState(null)
    let [productLocale, setProductLocale] = useState(null)
    let [productStock, setProductStock] = useState(null)
    let [productCondition, setProductCondition] = useState(null)
    let [productPackage, setProductPackage] = useState(null)
    let [productPhotos, setProductPhotos] = useState([])

    let [categories, setCategories] = useState('')
    let [type, setType] = useState('')
    let [price, setPrice] = useState('')


    let handleForm = () => {
        uploadItem(productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos)
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    let [categoriesList, setCategoriesList] = useState([])
    let [typeList, setTypeList] = useState([])

    let plans = [
        {price: 3000, title: 'Premium', description: 'Exclusive Features for you to sell', package: 3, features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']}, 
        {price: 1500, title: 'Standard', description: 'Top Notch Features for you to sell', package: 2, features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']},
        {price: 750, title: 'Basic', description: 'Basic Features for you to sell', package: 1, features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']}, 
        {price: 0, title: 'Free', description: 'Startup Features for you to sell', package: 0, features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']}]


    useEffect(() => {
        setCategoriesList(items.items.category)
    },[])

    useEffect(() => {
       let type = categoriesList.filter(item => Object.keys(item)[0] === productCategory)[0]
       if(type){
            console.log(productCategory)
            setTypeList(type[productCategory])
       }
    },[productCategory])

    let handleImage = () => {

        
        let f = document.querySelector("#files");


        let reader = new FileReader();

        reader.onload = (result) => {

             let img = reader.result;
             setProductPhotos(item => [...item, img])

        }
        reader.readAsDataURL([...f.files][0]);
    } 


    return ( 
        <>
            <div className="seller-shop">

                <div className='seller-shop-form-body'>
                    <div className="seller-shop-form shadow-sm">
                    
                        <div className='seller-shop-form-cnt'> 
                            <div className="seller-shop-form-group-2">
                                <div className="input-cnt">
                                    <label htmlFor="">Category</label>
                                    <select name="" onInput={e => setProductCategory(e.target.value)} id="">
                                        <option value={''}>Select A Category</option>

                                        {
                                            categoriesList.map((item, index) => 
                                                <option key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className="input-cnt">
                                    <label htmlFor="">Type</label>
                                    <select onInput={e => setProductType(e.target.value)} name="" id="">
                                        <option value={''}>Select Product Type</option>

                                        {
                                            typeList.map((item, index) => 
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className="input-cnt">
                                    <label htmlFor="">Condition</label>
                                    <select onInput={e => setProductCondition(e.target.value)} name="" id="">
                                        <option value={''}>Select Product Type</option>

                                        {
                                            ["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="seller-shop-form-group-1">
                                

                                <div className="input-cnt">
                                    <label htmlFor="">Stock <small>(Quantity Availble For Sale)</small></label>
                                    <input type="number" placeholder="Stock" onInput={e => setProductStock(e.target.value)} />
                                </div>
                                <div className="input-cnt">
                                    <label htmlFor="">Price</label>
                                    <input onInput={e => setProductPrice(e.target.value)} type="number" placeholder="Price" />
                                </div>

                                <div className="input-cnt">
                                    <label htmlFor="">Location</label>
                                    <input onInput={e => setProductLocale(e.target.value)}  type="text" placeholder="Location" />
                                </div>

                                
                            </div>

                        </div>


                        <div className="seller-upload-btn " style={{width: '100%', padding: '0', marginTop: '20px', height: 'fit-content'}}>
                            <div className="seller-item-preview-cnt">

                            </div>
                            <button onClick={handleForm} style={{width: '100%', height: '55px', marginTop: '10px', borderRadius: '8px', padding: '0', background: 'orangered', outline: 'none', border: 'none', color: '#fff', borderRadius: '2.5px'}}>
                                <div>Upload</div>
                            </button>

                        </div>
                    </div>


                    <div className="seller-shop-description shadow-sm">
                        <div className="input-cnt" style={{width: '100%', padding: '0'}}>
                            {/*<label htmlFor="">Description</label>*/}
                            <textarea placeholder="Title" className="seller-shop-title shadow-sm" onInput={e => setProductTitle(e.target.value)}>
                                
                            </textarea>
                        </div>
                        <div className="seller-shop-samples shadow-sm">
                            <label htmlFor="files" style={{height: '100%', margin: '0 5px 0 5px', width: '200px', background: '#fff',cursor: 'pointer'}}>

                            </label>
                            <input type="file" name="" style={{display: 'none'}} id="files" onChange={handleImage} />

                            <section className='seller-product-image-cnt'>
                                {
                                    productPhotos.map((item, index) => 
                                    
                                        <img src={item} key={index} style={{height: '100%', width: '200px', background: '#fff', margin: '0 5px 0 5px', borderRadius: '5px', position: 'relative', flexShrink: '0'}} alt="" />
                                    )
                                }
                            </section>
                        </div>

                        <div className="input-cnt" style={{width: '100%', padding: '0'}}>
                            {/*<label htmlFor="">Description</label>*/}
                            <textarea onInput={e => setProductDescription(e.target.value)} placeholder="Description" className="seller-shop-desc shadow-sm"></textarea>
                        </div>

                        
                        <div className="seller-Ads-deal">
                    
                            {
                                plans.reverse().map((item, index) => 
                                    <div className="plan">
                                        <div className="inner">
                                            <span className="pricing">
                                                <span>
                                                &#8358;{item.price} <small>/ m</small>
                                                </span>
                                            </span>
                                            <p className="title">{item.title}</p>
                                            <p className="info">{item.description}</p>
                                            <ul className="features">
                                                {/*<li>
                                                    <span className="icon">
                                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                                            <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                                        </svg>
                                                    </span>
                                                    <span><strong>20</strong> team members</span>
                                                </li>
                                                <li>
                                                    <span className="icon">
                                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                                            <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                                        </svg>
                                                    </span>
                                                    <span>Plan <strong>team meetings</strong></span>
                                                </li>
                                                <li>
                                                    <span className="icon">
                                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                                            <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                                        </svg>
                                                    </span>
                                                    <span>File sharing</span>
                            </li>*/}

                                                {
                                                    item.features.map((item) => 
                                                        <li>
                                                            <span className="icon">
                                                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                                                    <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                                                </svg>
                                                            </span>
                                                            <span>{item}</span>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                            <div className="action">
                                            <a data-package={item.package} onClick={e => {e.preventDefault(); setProductPackage(e.target.dataset.package)}} className="button" href="#">
                                                Choose plan
                                            </a>
                                            </div>
                                        </div>
                                    </div>    
                                    
                                )
                            }

                        </div>
                    </div>

                    
                    
                </div>

                

                
            </div>
        </>
     );
}
 
export default Editor;