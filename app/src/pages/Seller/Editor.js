import { useEffect, useRef, useState } from 'react';
import '../../styles/plan_card.css'
import '../../styles/loader.css'
import '../../styles/Seller/overlay.css' 
import Link from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import items from '../../items.json'
import { GetEditedItem, GetSeller, updateItem, uploadItem } from '../../api/seller';
import { GetItem } from '../../api/buyer';
import TypeSelect from '../../components/Seller/editor/TypeSelect';
import StockSelect from '../../components/Seller/editor/StockSelect';
import PriceSelect from '../../components/Seller/editor/PriceSelect';
import ConditionSelect from '../../components/Seller/editor/ConditionSelect';
import ClothingCategory from '../../components/Seller/editor/ClothingSelect';
import SizeSelect from '../../components/Seller/editor/SizeSelect';
import GenderSelect from '../../components/Seller/editor/GenderSelect';
import LocationSelect from '../../components/Seller/editor/LocationSelect';
import CategorySelect from '../../components/Seller/editor/CategorySelect';
import EditorTitle from '../../components/Seller/editor/EditorTitle';
import EditorPhotoStore from '../../components/Seller/editor/EditorPhotoStore';
import EditorDescription from '../../components/Seller/editor/EditorDescription';
const Editor = ({editorTitle}) => {

    let location = useLocation();
    let navigate = useNavigate();
    
    let [update, setUpdate] = useState(false);
    let [edit,setEdit] = useState('');
    let [screenWidth, setScreenWidth] = useState('')

    useEffect(() => {setScreenWidth(window.innerWidth)},[])

    function setAllInputsToNull(params) {
         setGender('')
         setCtype('')
         setsize('')
         setclothingCategory('')
         setLocale('')
         setCondition('')
    }
    
    let [title, setTitle] = useState('')
    function productTitle(data) {setTitle(data)}

    let [description, setDescription] = useState('')
    function productDescription(data) {setDescription(data)}

    let [category, setCategory] = useState('')
    function productCategory(data) {setCategory(data)}

    let [gender, setGender] = useState('')
    function productGender(data) {setGender(data)}

    let [cType, setCtype] = useState('')
    function productType(data) {setCtype(data)}

    let [size, setsize] = useState('')
    function productSizeSelect(data) {setsize(data)}
    
    let [clothingCategory, setclothingCategory] = useState('')
    function productClothingCategory(data) {setclothingCategory(data)}

    let [price, setPrice] = useState('')
    function productPrice(data) {setPrice(data)}

    let [locale, setLocale] = useState('')
    function productLocale(data) {setLocale(data)}

    let [stock, setStock] = useState('')
    function productStock(data) {setStock(data)}

    let [condition, setCondition] = useState('')
    function productCondition(data) {setCondition(data)}

    let [photos, setPhotos] = useState([])
    function productPhotos(data) {setPhotos(file => [...file, data])}
    function deletePhoto(data) {setPhotos(data)}

    let [productPackage, setProductPackage] = useState('')

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

    function Validation(element) {

        let name = element.name
        let type = element.tagName.toLowerCase();
        if(type === 'textarea'){
            if(element.name === 'title'){
                if(title.split(' ').length >= 2){
                    element.style.border = '1px solid #000'
                    validationBoolean.current.title = true;

                }else{
                    element.style.border = '1px solid red'
                    validationBoolean.current.title = false;
                }
            }else{
                if(description.split(' ').length >= 10){
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
                    if(stock > 0){
                        element.style.border = '1px solid #000'
                        validationBoolean.current.stock = true;
                    }else{
                        element.style.border = '1px solid red'
                        validationBoolean.current.stock = false;
                    }
                }else if(element.name === 'price'){
                    if(price >= 25){
                        element.style.border = '1px solid #000'
                        validationBoolean.current.price = true;
                    }else{
                        element.style.border = '1px solid red'
                        validationBoolean.current.price = false;
                    }
                }
            }else{
                if(photos.length > 0){
                    document.querySelector('.seller-shop-samples').style.border = '1px solid #000'
                    validationBoolean.current.photos = true;
                }else{
                    document.querySelector('.seller-shop-samples').style.border = '1px solid red'
                    validationBoolean.current.photos = false;

                }
            }
            
        }else if(type === 'select'){
            if(element.name === 'category'){
                if(category !== ''){
                    element.style.border = '1px solid #000'

                    validationBoolean.current.category = true;

                }else{
                    element.style.border = '1px solid red'
                    validationBoolean.current.category = false;

                }
            }else if(element.name === 'type'){
                if(cType !== ''){
                    element.style.border = '1px solid #000'

                    validationBoolean.current.type = true;
        
                }else{
                    element.style.border = '1px solid red'
                    validationBoolean.current.type = false;
                    
                }
            }else if(element.name === 'condition'){
                if(condition !== ''){
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
            updateItem(title,description,category,cType,condition,price,locale,stock,productPackage,photos,window.localStorage.getItem("CE_seller_id"),edit.product_id)
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
            console.log(validationBoolean.current[x])

            if(validationBoolean.current[x] === false){
                falseyList.push(false)
            }else{
                falseyList.push(true) 
            }

        }

        let result = falseyList.filter(item => item === false)


        if(result.length > 0){
            console.log(title,description,category,price,photos,window.localStorage.getItem("CE_seller_id"),[cType,condition,locale,stock,gender,size,clothingCategory] )
            // let overlay = document.querySelector('.overlay')
            // overlay.setAttribute('id', 'overlay');

        }else{
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');

            let dynamicInput = [cType,condition,locale,stock,gender,size,clothingCategory];
            let dynamicInputValues = dynamicInput.filter(item => item !== '')
            uploadItem(title,description,category,photos,window.localStorage.getItem("CE_seller_id"),dynamicInputValues)
            .then((result) => {
                result
                ?
                navigate('/seller/shop')
                :
                alert('Error Uploading Data...')
                
            })
            .catch((err) => console.log(err))
        }


      
    }

    useEffect(() => {
        if(location.search !== ''){

            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            setUpdate(true)

            GetEditedItem(location.search.split('=').splice(-1)[0])
            .then((result) => {
                productPhotos(result.photos.map(item => item.file))
                setEdit(result.meta_data[0])
                productCategory(result.meta_data[0].category)
                productTitle(result.meta_data[0].title)
                productDescription(result.meta_data[0].description)
                productPrice(result.meta_data[0].price)
                productStock(result.meta_data[0].stock)
                productType(result.meta_data[0].type)
                productCondition(result.meta_data[0].condition)
                productLocale(result.meta_data[0].locale)
                overlay.removeAttribute('id')
            })
            .catch(err => console.log(err))
        }else{
            
        }
    }, [location])

    let [categoriesList, setCategoriesList] = useState([])
    let [typeList, setTypeList] = useState([])

    useEffect(() => {setCategoriesList(items.items.category)},[])
    useEffect(() => {setAllInputsToNull('')},[category])

    useEffect(() => {
       let type = categoriesList.filter(item => Object.keys(item)[0] === category)[0]
       if(type){
            console.log(category)
            setTypeList(type[category])
       }
    },[category,categoriesList])

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

                            <div className="seller-shop-form-group-2" style={{opacity: category !== '' ? '1' : '.4', pointerEvents: category !== '' ? 'all' : 'none'}}>

                                <CategorySelect productCategory={productCategory} edit={edit} /> 
                                

                                {
                                    category === 'Fashion' 
                                    
                                    ? 
                                    
                                    <GenderSelect edit={edit} productGender={productGender} />

                                    :
                                    ""
                                }

                                <TypeSelect typeList={typeList} edit={edit} productType={productType} />

                                {
                                    category === 'Fashion' && cType === 'Clothing'
                                    ? 
                                    

                                    <ClothingCategory edit={edit} productClothingCategory={productClothingCategory} />

                                    : 

                                    ""
                                }
                                 

                                {
                                    category === 'Fashion'
                                    ? 

                                        cType === 'Clothing' ||  cType === 'Shoe'
                                        ?
                                        <SizeSelect edit={edit} productSizeSelect={productSizeSelect} cType={cType}  />
                                        :

                                        ""

                                    : 

                                    ""
                                }
                                

                                {
                                    category === 'Lodge/Apartments' || category === 'Pets' || category === 'Food'
                                    ? 
                                    ""
                                    : 
                                    <ConditionSelect category={category} productCategory={productCategory} edit={edit} clothingCategory={clothingCategory}  />
                                }

                                
                            </div>
                            <div style={{opacity: category !== '' ? '1' : '.4', pointerEvents: category !== '' ? 'all' : 'none'}} className="seller-shop-form-group-1">
                                
                                {

                                    category === 'Lodge/Apartments' 
                                    ? 
                                    ""
                                    : 

                                    <StockSelect edit={edit} productStock={productStock} />

                                }

                                
                                <PriceSelect edit={edit} productPrice={productPrice} />

                               

                                {
                                    category !== 'Lodge/Apartments' 
                                    ? 
                                    ""
                                    : 

                                    <LocationSelect productLocale={productLocale} edit={edit} />
                                }
                                
                            </div>

                        </div>

                        {
                            screenWidth > 761

                            ?

                            <div className="seller-upload-btn " style={{width: '100%', padding: '0', height: '60px', position: 'relative'}}>
                                    {/* <div className="seller-item-preview-cnt">

                                    </div> */}
                                <button onClick={e => update ? updateForm(e) : handleForm(e)} style={{width: '100%', height: '55px',  borderRadius: '8px', padding: '0', background: 'orangered', outline: 'none', border: 'none', color: '#fff', borderRadius: '2.5px'}}>
                                    <div>{update ? 'Update' : 'Upload'}</div>
                                </button>

                            </div>

                            :

                            ''
                        }

                    </div>


                    <div className="seller-shop-description shadow-sm" style={{textAlign: 'left', justifyContent: 'left'}}>
                        <EditorTitle productTitle={productTitle}  edit={edit} />

                        <EditorPhotoStore edit={edit} productPhotos={productPhotos} photoList={photos} deletePhoto={deletePhoto} />

                        <EditorDescription productDescription={productDescription} edit={edit} />

                        
                        
                    </div>

                </div>

                {
                    screenWidth < 761

                    ?

                    <div className="seller-upload-btn " style={{width: '100%', padding: '0', marginTop: '20px', height: '60px', position: 'relative'}}>
                            {/* <div className="seller-item-preview-cnt">

                            </div> */}
                        <button onClick={e => update ? updateForm(e) : handleForm(e)} style={{width: '100%', height: '55px', marginTop: '10px', borderRadius: '8px', padding: '0', background: 'orangered', outline: 'none', border: 'none', color: '#fff', borderRadius: '2.5px'}}>
                            <div>{update ? 'Update' : 'Upload'}</div>
                        </button>

                    </div>

                    :

                    ''
                }

            </div>
        </>
     );
}
 
export default Editor;