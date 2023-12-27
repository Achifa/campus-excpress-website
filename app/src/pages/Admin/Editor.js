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
import SizeSelect from '../../components/Seller/editor/SizeSelect';
import GenderSelect from '../../components/Seller/editor/GenderSelect';
import LocationSelect from '../../components/Seller/editor/LocationSelect';
import CategorySelect from '../../components/Seller/editor/CategorySelect';
import EditorTitle from '../../components/Seller/editor/EditorTitle';
import EditorPhotoStore from '../../components/Seller/editor/EditorPhotoStore';
import EditorDescription from '../../components/Seller/editor/EditorDescription';
import SubCategory from '../../components/Seller/editor/ClothingSelect';
import UploadBtn from '../../components/Seller/editor/Button';
const Editor = ({editorTitle}) => {

    let location = useLocation();
    let navigate = useNavigate();
    let list = ['base','strata','tras','quan']
    
    let [update, setUpdate] = useState(false);
    let [edit,setEdit] = useState('');
    let [screenWidth, setScreenWidth] = useState('')
    let [productFormat, setProductFormat] = useState(list[1]);
    let [product_id,setProduct_id] = useState('')

    useEffect(() => {setScreenWidth(window.innerWidth)},[])

    function setAllInputsToNull(params) {
         setGender('')
         setCtype('')
         setsize('')
         setSubCategory('')
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
    
    let [subCategory, setSubCategory] = useState('')
    function productSubCategory(data) {setSubCategory(data)}

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

    useEffect(() => {
        if(category === 'Food' || category === 'Pet'){
            setProductFormat(list[0])

        }else if(category === 'Fashion'){
            setProductFormat(list[2])
        }else if(category === 'Lodge/Apartments'){
            setProductFormat(list[3])
        }else{
            setProductFormat(list[1])
        }
    },[category])

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

        function select(format) {
            if(category === 'fashion'){
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
                }else if(element.name === 'gender'){
                    if(gender !== ''){
                        element.style.border = '1px solid #000'
    
                        validationBoolean.current.condition = true;
            
                    }else{
                        element.style.border = '1px solid red'
                        validationBoolean.current.condition = false;
                        
                    }
                }else if(element.name === 'size'){
                    if(size !== ''){
                        element.style.border = '1px solid #000'
    
                        validationBoolean.current.condition = true;
            
                    }else{
                        element.style.border = '1px solid red'
                        validationBoolean.current.condition = false;
                        
                    }
                }else if(element.name === 'sub-category'){
                    if(subCategory !== ''){
                        element.style.border = '1px solid #000'
    
                        validationBoolean.current.condition = true;
            
                    }else{
                        element.style.border = '1px solid red'
                        validationBoolean.current.condition = false;
                        
                    }
                }
            }else{
                if(format !== 'base'){
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
                }else if(format === 'quan'){
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
                    }
                }else{
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
                    }else if(element.name === 'stock'){
                        if(cType !== ''){
                            element.style.border = '1px solid #000'
    
                            validationBoolean.current.type = true;
                
                        }else{
                            element.style.border = '1px solid red'
                            validationBoolean.current.type = false;
                            
                        }
                    }
                }
            }
        }

        function inputs(params) {
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
        }

        function textarea(params) {
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
        }

        let name = element.name
        let type = element.tagName.toLowerCase();

        

        if(type === 'textarea'){
            textarea()
        }else if(type === 'input'){
            inputs()
            
        }else if(type === 'select'){
            select()
    
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

        allFields.map((item, index) => Validation(item))

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
            // let overlay = document.querySelector('.overlay')
            // overlay.setAttribute('id', 'overlay');

            if(category === 'Food' || category === 'Pet'){
                setProductFormat(list[0])
    
            }else if(category === 'Fashion'){
                setProductFormat(list[2])
            }else if(category === 'Lodge/Apartments'){
                setProductFormat(list[3])
            }else{
                setProductFormat(list[1])
            }

            let dynamicInput = productFormat === 'base' ? [cType,stock] : productFormat === 'strata' ? [cType,condition,stock] : [cType,condition,stock,gender,size,subCategory]
            // let dynamicInputValues = dynamicInput.filter(item => item !== '')
            console.log(title,description,category,price,photos,window.localStorage.getItem("CE_seller_id"),dynamicInput)

        }else{
            
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');

            if(category === 'Food' || category === 'Pet'){
                setProductFormat(list[0])
    
            }else if(category === 'Lodge/Apartments'){
                setProductFormat(list[3])
            }else if(category === 'Fashion'){
                setProductFormat(list[2])
            }else{
                setProductFormat(list[1])
            }

            let dynamicInput = productFormat === 'base' ? [cType,stock] : productFormat === 'strata' ? [cType,condition,stock] : productFormat === 'quan' ? [cType,locale]: [cType,condition,stock,gender,size,subCategory]

            let dynamicInputValues = dynamicInput.filter(item => item !== '')

            if(category === 'Lodge/Apartments'){
                updateItem(title,description,category,price,photos,window.localStorage.getItem("CE_seller_id"),[cType,locale])
                .then((result) => {
                    result
                    ?
                    navigate('/seller/shop')
                    :
                    alert('Error Uploading Data...')
                    
                })
                .catch((err) => console.log(err))
            }else{
                updateItem(title,description,category,price,photos,window.localStorage.getItem("CE_seller_id"),dynamicInputValues)
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

    }

    let handleForm = () => {
        let inputs = [...document.querySelectorAll('input')]
        let textareas = [...document.querySelectorAll('textarea')]
        let selects = [...document.querySelectorAll('select')]

        let allFields = [...inputs,...textareas,...selects]

        allFields.map((item, index) => Validation(item))

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
            // let overlay = document.querySelector('.overlay')
            // overlay.setAttribute('id', 'overlay');

            if(category === 'Food' || category === 'Pet'){
                setProductFormat(list[0])
    
            }else if(category === 'Fashion'){
                setProductFormat(list[2])
            }else if(category === 'Lodge/Apartments'){
                setProductFormat(list[3])
            }else{
                setProductFormat(list[1])
            }

            let dynamicInput = productFormat === 'base' ? [cType,stock] : productFormat === 'strata' ? [cType,condition,stock] : productFormat === 'quan' ? [cType,locale]: [cType,condition,stock,gender,size,subCategory]
            // let dynamicInputValues = dynamicInput.filter(item => item !== '')
            console.log(title,description,category,price,photos,window.localStorage.getItem("CE_seller_id"),dynamicInput)

        }else{
            
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');

            if(category === 'Food' || category === 'Pet'){
                setProductFormat(list[0])
    
            }else if(category === 'Lodge/Apartments'){
                setProductFormat(list[3])
            }else if(category === 'Fashion'){
                setProductFormat(list[2])
            }else{
                setProductFormat(list[1])
            }

            let dynamicInput = productFormat === 'base' ? [cType,stock] : productFormat === 'strata' ? [cType,condition,stock] : productFormat === 'quan' ? [cType,locale]: [cType,condition,stock,gender,size,subCategory]

            let dynamicInputValues = dynamicInput.filter(item => item !== '')

            if(category === 'Lodge/Apartments'){
                uploadItem(title,description,category,price,photos,window.localStorage.getItem("CE_seller_id"),[cType,locale])
                .then((result) => {
                    result
                    ?
                    navigate('/seller/shop')
                    :
                    alert('Error Uploading Data...')
                    
                })
                .catch((err) => console.log(err))
            }else{
                uploadItem(title,description,category,price,photos,window.localStorage.getItem("CE_seller_id"),dynamicInputValues)
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


      
    }

    useEffect(() => {
        if(location.search !== ''){

            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            setUpdate(true)

            GetEditedItem(location.search.split('=').splice(-1)[0])
            .then((result) => {
                console.log(result.meta_data)
                if(result.meta_data.category !== 'Lodge/Apartments'){

                    productPhotos(result.photos.map(item => item.file))
                    setEdit(result.meta_data[0])
                    productCategory(result.meta_data[0].category)
                    productTitle(result.meta_data[0].title)
                    setPhotos(result.photos.map(item => item.file))
                    productDescription(result.meta_data[0].description)
                    productPrice(result.meta_data[0].price)
                    setProduct_id(result.meta_data[0].product_id)
                    productStock(result.meta_data[0].others[1])
                    productType(result.meta_data[0].others[0])
                    productCondition(result.meta_data[0].others[2])
                    productLocale(result.meta_data[0].locale)
                    overlay.removeAttribute('id')

                }
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
                    <div className="seller-shop-form">
                    
                        <div className='seller-shop-form-cnt'>

                            <div className="seller-shop-form-group-2" >

                                <CategorySelect productCategory={productCategory} edit={edit} /> 

                                <div style={{opacity: category !== '' ? '1' : '.4', pointerEvents: category !== '' ? 'all' : 'none'}}>
                                

                                    {
                                        category === 'Fashion' 
                                        
                                        ? 
                                        
                                        <GenderSelect edit={edit} productGender={productGender} />

                                        :
                                        ""
                                    }

                                    <TypeSelect typeList={typeList} category={category} edit={edit} productType={productType} />

                                    {
                                        category === 'Fashion' 
                                        ? 

                                            cType === 'Clothing' || cType === 'Foot Wear'

                                            ?

                                            <SubCategory edit={edit} gender={gender} cType={cType} productSubCategory={productSubCategory} />

                                            :

                                            ""
                                        : 
                                        ""
                                    }
                                    

                                    {
                                        category === 'Fashion'
                                        ? 
                                            cType === 'Clothing' ||  cType === 'Foot Wear'
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
                                        <ConditionSelect category={category} productCondition={productCondition} edit={edit} subCategory={subCategory}  />
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

                        </div>

                        {
                            screenWidth > 761
                            ?
                            <UploadBtn update={update} updateForm={updateForm} handleForm={handleForm} />
                            :
                            ''
                        }

                    </div>


                    <div className="seller-shop-description" style={{textAlign: 'left', justifyContent: 'left'}}>
                        <EditorTitle productTitle={productTitle}  edit={edit} />

                        <EditorPhotoStore edit={edit} productPhotos={productPhotos} photoList={photos} deletePhoto={deletePhoto} />

                        <EditorDescription productDescription={productDescription} edit={edit} />
                    </div>

                    

                </div>

                {
                    screenWidth < 761
                    ?
                    <UploadBtn update={update} updateForm={updateForm} handleForm={handleForm} />

                    :
                    ''
                }

                

            </div>
        </>
     );
}
 
export default Editor;