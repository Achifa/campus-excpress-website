import { useEffect, useRef, useState } from 'react';
import '../../styles/plan_card.css'
import '../../styles/loader.css'
import '../../styles/Seller/overlay.css' 
import Link from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import items from '../../items.json'
import { GetEditedItem, updateItem, uploadItem } from '../../api/seller';
import { GetItem } from '../../api/buyer';
const Editor = () => {

    let location = useLocation();

    let [edit,setEdit] = useState('')

    let navigate = useNavigate()
    let [productTitle, setProductTitle] = useState('')
    let [productDescription, setProductDescription] = useState('')
    let [productCategory, setProductCategory] = useState('')
    let [productType, setProductType] = useState('')
    let [productPrice, setProductPrice] = useState(0)
    let [productLocale, setProductLocale] = useState('')
    let [productStock, setProductStock] = useState(0)
    let [productCondition, setProductCondition] = useState('')
    let [productPackage, setProductPackage] = useState('')
    let [productPhotos, setProductPhotos] = useState([])
    let [screenWidth, setScreenWidth] = useState(0)

    let [categories, setCategories] = useState('')
    let [type, setType] = useState('')
    let [price, setPrice] = useState('')

    let [titleCount, setTitleCount] = useState(0)
    let [descriptionCount, setDescriptionCount] = useState(0)

    let validationBoolean = useRef({
        title: false,
        description: false,
        photos: false,
        category: false,
        condition: false,
        type: false,
        stock: false,
        price: false
    })


    useEffect(() => {
        setTitleCount(productTitle.length)
    }, [productTitle])

    useEffect(() => {
        setDescriptionCount(productDescription.length)
    }, [productDescription])

    let [role, setRole] = useState(0)

    function Validation(element) {

        let name = element.name
        let type = element.tagName.toLowerCase();
        if(type === 'textarea'){
            if(element.name === 'title'){
                if(productTitle.split(' ').length >= 2){
                    element.style.border = '1px solid #000'
                    validationBoolean.current.title = true;

                }else{
                    element.style.border = '1px solid red'
                    validationBoolean.current.title = false;
                }
            }else{
                if(productDescription.split(' ').length >= 10){
                    element.style.border = '1px solid #000'
                    validationBoolean.current.description = true;

        
                }else{
                    element.style.border = '1px solid red'
                    validationBoolean.current.description = false;

                    
                }
            }
        }else if(type === 'input'){
            if(element.type !== 'file'){
                if(element.name === 'stock'){
                    if(productStock > 0){
                        element.style.border = '1px solid #000'
                        validationBoolean.current.stock = true;
                    }else{
                        element.style.border = '1px solid red'
                        validationBoolean.current.stock = false;
                    }
                }else if(element.name === 'price'){
                    if(productPrice >= 25){
                        element.style.border = '1px solid #000'
                        validationBoolean.current.price = true;
                    }else{
                        element.style.border = '1px solid red'
                        validationBoolean.current.price = false;
                    }
                }
            }else{
                if(productPhotos.length > 0){
                    document.querySelector('.seller-shop-samples').style.border = '1px solid #000'
                    validationBoolean.current.photos = true;
                }else{
                    document.querySelector('.seller-shop-samples').style.border = '1px solid red'
                    validationBoolean.current.photos = false;

                }
            }
            
        }else if(type === 'select'){
            if(element.name === 'category'){
                if(productCategory !== ''){
                    element.style.border = '1px solid #000'

                    validationBoolean.current.category = true;

                }else{
                    element.style.border = '1px solid red'
                    validationBoolean.current.category = false;

                }
            }else if(element.name === 'type'){
                if(productType !== ''){
                    element.style.border = '1px solid #000'

                    validationBoolean.current.type = true;
        
                }else{
                    element.style.border = '1px solid red'
                    validationBoolean.current.type = false;
                    
                }
            }else if(element.name === 'condition'){
                if(productCondition !== ''){
                    element.style.border = '1px solid #000'

                    validationBoolean.current.condition = true;
        
                }else{
                    element.style.border = '1px solid red'
                    validationBoolean.current.condition = false;
                    
                }
            }
    
        }


        

    }

    function closeOverlay(params) {
        let overlay = document.querySelector('.overlay')
        overlay.onclick = e => {
            overlay.removeAttribute('id')
        }
    }

    let updateForm = () => {
        let inputs = [...document.querySelectorAll('input')]
        let textareas = [...document.querySelectorAll('textarea')]
        let selects = [...document.querySelectorAll('select')]

        let allFields = [...inputs,...textareas,...selects]

        allFields.map((item, index) => {
            Validation(item)
        })

        let falseyList = []

        for(let x in validationBoolean.current){
            console.log(x)

            if(validationBoolean.current[x] === false){
                falseyList.push(false)
            }else{
                falseyList.push(true) 

            }


            
        }

        let result = falseyList.filter(item => item === false)


        if(result.length > 0){
            // let overlay = document.querySelector('.overlay')
            // overlay.setAttribute('id', 'overlay');

        }else{
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            updateItem(productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos,window.localStorage.getItem("CE_seller_id"),edit.product_id)
            .then((result) => {
                result
                ?
                navigate('/seller/shop')
                :
                alert('Error Uploading Data...')
                
            })
            .catch((err) => {
                console.log(err)
            })
        }


      
    }


    let handleForm = () => {
        let inputs = [...document.querySelectorAll('input')]
        let textareas = [...document.querySelectorAll('textarea')]
        let selects = [...document.querySelectorAll('select')]

        let allFields = [...inputs,...textareas,...selects]

        allFields.map((item, index) => {
            Validation(item)
        })

        let falseyList = []

        for(let x in validationBoolean.current){
            console.log(x)

            if(validationBoolean.current[x] === false){
                falseyList.push(false)
            }else{
                falseyList.push(true) 
            }

        }

        let result = falseyList.filter(item => item === false)


        if(result.length > 0){
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');

        }else{
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            uploadItem(productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos,window.localStorage.getItem("CE_seller_id"))
            .then((result) => {
                result
                ?
                navigate('/seller/shop')
                :
                alert('Error Uploading Data...')
                
            })
            .catch((err) => {
                console.log(err)
            })
        }


      
    }

    
    let [update, setUpdate] = useState(false)

    useEffect(() => {
        if(location.search !== ''){

            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            setUpdate(true)

            GetEditedItem(location.search.split('=').splice(-1)[0])
            .then((result) => {
                setProductPhotos(result.photos.map(item => item.file))
                setEdit(result.meta_data[0])
                setProductCategory(result.meta_data[0].category)
                setProductTitle(result.meta_data[0].title)
                setProductDescription(result.meta_data[0].description)
                setProductPrice(result.meta_data[0].price)
                setProductStock(result.meta_data[0].stock)
                setProductType(result.meta_data[0].type)
                setProductCondition(result.meta_data[0].condition)
                setProductLocale(result.meta_data[0].locale)
                overlay.removeAttribute('id')
            })
            .catch(err => console.log(err))
        }else{
            
        }
    }, [location])

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

        [...f.files].map(item => {
            let reader = new FileReader();

            reader.onload = (result) => {
                let img = reader.result;
                setProductPhotos(file => [...file, img])
            }
            reader.readAsDataURL(item);
        })

        
    } 

    let removeImg = i => {

        let list = productPhotos.filter((item, index) => index !== i)
        setProductPhotos(list)
        
    }   


    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>
            <div className="seller-shop">

                <div className='seller-shop-form-body'>
                    <div className="seller-shop-form shadow-sm">
                    
                        <div className='seller-shop-form-cnt'> 
                            <div className="seller-shop-form-group-2">
                                <div className="input-cnt">
                                    <label htmlFor="">Category</label>
                                    <select name="category" onInput={e => setProductCategory(e.target.value)} id="">
                                        <option value={''}>Select A Category</option>

                                        {
                                            categoriesList.map((item, index) => {
                                                {/* <option key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option> */}

                                                return(Object.keys(item)[0] === edit.category
                                                ?
                                                <option selected key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                                                :
                                                <option key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>)
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="input-cnt">
                                    <label htmlFor="">Type</label>
                                    <select onInput={e => setProductType(e.target.value)} name="type" id="">
                                        <option value={''}>Select Product Type</option>

                                        {
                                            typeList.map((item, index) => 
                                                item === edit.type
                                                ?
                                                <option selected key={index} value={item}>{item}</option>
                                                :
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className="input-cnt">
                                    <label htmlFor="">Condition</label>
                                    <select onInput={e => setProductCondition(e.target.value)} name="condition" id="">
                                        <option value={''}>Select Product Type</option>

                                        {
                                            ["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
                                                item === edit.condition
                                                ?
                                                <option selected key={index} value={item}>{item}</option>
                                                :
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="seller-shop-form-group-1">
                                

                                <div className="input-cnt">
                                    <label htmlFor="">Stock <small>(Quantity Availble For Sale)</small></label>
                                    <input type="number" defaultValue={edit.stock} name='stock' placeholder="Stock" onInput={e => setProductStock(e.target.value)} />
                                </div>
                                <div className="input-cnt">
                                    <label htmlFor="">Price</label>
                                    <input min={0} defaultValue={edit.price} name='price' onInput={e => setProductPrice(e.target.value)} type="number" placeholder="Price"  />
                                </div>

                                {/*<div className="input-cnt">
                                    <label htmlFor="">Location</label>
                                    <input onInput={e => setProductLocale(e.target.value)}  type="text" placeholder="Location" />
                                    </div>*/}

                                
                            </div>

                        </div>


                        <div className="seller-upload-btn " style={{width: '100%', padding: '0', marginTop: '20px', height: 'fit-content'}}>
                            {/* <div className="seller-item-preview-cnt">

                            </div> */}
                            <button onClick={e => update ? updateForm(e) : handleForm(e)} style={{width: '100%', height: '55px', marginTop: '10px', borderRadius: '8px', padding: '0', background: 'orangered', outline: 'none', border: 'none', color: '#fff', borderRadius: '2.5px'}}>
                                <div>{update ? 'Update' : 'Upload'}</div>
                            </button>

                        </div>
                    </div>


                    <div className="seller-shop-description shadow-sm" style={{textAlign: 'left', justifyContent: 'left'}}>
                        <div className="input-cnt" style={{width: '100%', padding: '0', position: 'relative'}}>
                            {/*<label htmlFor="">Description</label>*/}
                            <textarea defaultValue={edit.title} maxLength={60} placeholder="Title" name='title' className="seller-shop-title shadow-sm" onInput={e => {
                                setProductTitle(e.target.value)
                            }}>
                                
                            </textarea>

                            <div style={{height: 'fit-content', position: 'absolute', fontSize: 'small', right: '10px', bottom: '25px'}}>{titleCount}/60</div>
                        </div>
                        <div className="seller-shop-samples shadow-sm">
                            
                            <label htmlFor="files" style={{height: '100%', margin: '0 5px 0 5px', background: '#fff',cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', }}>
                                <small>Click here to Upload photo</small>
                            </label>
                            <input type="file" name="file" multiple style={{display: 'none'}} id="files" onChange={handleImage} />

                            <section className='seller-product-image-cnt'>
                                {
                                    productPhotos.map((item, index) => 
                                    
                                        <div style={{position: 'relative', padding: '0', height: '100%'}}>
                                            <div onClick={e => removeImg(index)} className="delete-sample-img" style={{position: 'absolute', top: '5px', right: '5px', color: '#fff', background: 'red', zIndex: '1000', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px', height: '20px'}}>x</div>
                                            <img src={item} key={index} style={{height: '100%', width: screenWidth <= 480 ? '100px' : '250px', background: '#fff', margin: '0 5px 0 5px', borderRadius: '5px', position: 'relative', flexShrink: '0'}} alt="" />
                                        </div>
                                    )
                                }
                            </section>
                        </div>

                        <div className="input-cnt" style={{width: '100%', position: 'relative', padding: '0'}}>
                            {/*<label htmlFor="">Description</label>*/}
                            <textarea defaultValue={edit.description} maxLength={650} name='description' onInput={e => setProductDescription(e.target.value)} placeholder="Description" className="seller-shop-desc shadow-sm"></textarea>
                            <div style={{height: 'fit-content', position: 'absolute', right: '10px', fontSize: 'small', bottom: '5px'}}>{descriptionCount}/650</div>
                        </div>

                        
                        {/* <div className="seller-Ads-deal">
                    
                            {
                                plans.reverse().map((item, index) => 
                                    index === 0
                                    ?
                                    <div id='activePack' className="plan" key={index}>
                                        <div className="inner">
                                            <span className="pricing">
                                                <span>
                                                &#8358;{item.price} <small>/ m</small>
                                                </span>
                                            </span>
                                            <p className="title">{item.title}</p>
                                            <p className="info">{item.description}</p>
                                            <ul className="features">
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
                                            <button data-package={item.package} onClick={e => {
                                                e.preventDefault(); 
                                                setProductPackage(e.target.dataset.package);
                                                let topElem = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
                                                let pElem = e.currentTarget.parentElement.parentElement.parentElement;

                                                let activePack = [...topElem.children].filter(item => item.hasAttribute('id'));
                                                console.log(topElem)

                                                activePack[0].removeAttribute('id')
                                                pElem.setAttribute('id', 'activePack');

                                            }} className="button" href="#">
                                                Choose plan
                                            </button>
                                            </div>
                                        </div>
                                    </div>  
                                    
                                    :

                                    <div className="plan" key={index}>
                                        <div className="inner">
                                            <span className="pricing">
                                                <span>
                                                &#8358;{item.price} <small>/ m</small>
                                                </span>
                                            </span>
                                            <p className="title">{item.title}</p>
                                            <p className="info">{item.description}</p>
                                            <ul className="features">
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
                                            <button data-package={item.package} onClick={e => {
                                                e.preventDefault(); 
                                                setProductPackage(e.target.dataset.package);
                                                let topElem = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
                                                let pElem = e.currentTarget.parentElement.parentElement.parentElement;

                                                let activePack = [...topElem.children].filter(item => item.hasAttribute('id'));
                                                console.log(topElem)

                                                activePack[0].removeAttribute('id')
                                                pElem.setAttribute('id', 'activePack');

                                            }} className="button" href="#">
                                                Choose plan
                                            </button>
                                            </div>
                                        </div>
                                    </div>  
                                    
                                )
                            }

                        </div> */}
                    </div>

                    
                    
                </div>

                

                
            </div>
        </>
     );
}
 
export default Editor;