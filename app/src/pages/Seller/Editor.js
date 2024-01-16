import { useEffect, useRef, useState } from 'react';
import '../../styles/plan_card.css'
import '../../styles/loader.css'
import '../../styles/notice.css'
import '../../styles/Seller/overlay.css' 
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
// import  upload  from '../../components/Functions/upload';
import { validate_inputs } from '../../components/Functions/validation';
import { uploadForm } from '../../components/Functions/upload';

const Editor = () => {

    let location = useLocation();
    let navigate = useNavigate();

    let book = []
    
   
    

    let [update, setUpdate] = useState(false);
    let [edit,setEdit] = useState('');
    let [screenWidth, setScreenWidth] = useState('')

    let [categoriesList, setCategoriesList] = useState([])
    let [typeList, setTypeList] = useState([])

    let [img_list, setimg_list] = useState([])


    function closeOverlay(params) {let overlay = document.querySelector('.overlay');overlay.onclick = e => {overlay.removeAttribute('id')}}

    let gender = useRef('')
    let [gender_state, set_gender_state] = useState('')
    function productGender(data) {
        gender.current = (data);
        set_gender_state(data) 
        window.localStorage.setItem('draft_gender', data)
    }

    let size = useRef('')
    let [size_state,set_size_state] = useState('')
    function productSizeSelect(data) {
        size.current = (data); 
        set_size_state(data)
        window.localStorage.setItem('draft_size', data)
    }
    
    let subCategory = useRef('')
    let [subCategory_state,set_subCategory_state] = useState('')
    function productSubCategory(data) {
        subCategory.current = (data); 
        set_subCategory_state(data);
        window.localStorage.setItem('draft_sub_category', data)
    }

    let locale = useRef('')
    let [locale_state,set_locale_state] = useState('')
    function productLocale(data) {
        locale.current = (data); 
        set_locale_state(data)
        window.localStorage.setItem('draft_locale', data)
    }

    let condition= useRef('')
    let [condition_state,set_condition_state]= useState('')
    function productCondition(data) {
        set_condition_state(data)
        condition.current = (data); 
        window.localStorage.setItem('draft_condition', data)
    }



    
    let title = useRef('')
    let [title_state,set_title_state] = useState('')
    function productTitle(data) {
        title.current = (data)
        console.log(title.current)
        set_title_state(data)
        window.localStorage.setItem('draft_title', data)
    } 

    let description = useRef('')
    let [description_state,set_description_state] = useState('')
    function productDescription(data) {
        description.current = (data)
        set_description_state(data)
        window.localStorage.setItem('draft_description', data)
    }

    let category = useRef('')
    let [category_state,set_category_state] = useState('')
    function productCategory(data) {
        category.current = (data); 
        set_category_state(data)
        window.localStorage.setItem('draft_category', data)
    }
    
    let cType = useRef('')
    let [cType_state,set_cType_state] = useState('')
    function productType(data) {
        cType.current = (data); 
        set_cType_state(data)
        window.localStorage.setItem('draft_c_type', data)
    }

    let price = useRef('')
    let [price_state,set_price_state] = useState('')
    function productPrice(data) {
        price.current = (data); 
        set_price_state(data)
        window.localStorage.setItem('draft_price', data)
    }

    let stock = useRef('')
    let [stock_state,set_stock_state] = useState('')
    function productStock(data) {
        stock.current = (data); 
        set_stock_state(data)
        window.localStorage.setItem('draft_stock', data)
    }

    let photos = useRef([])
    // let [photos_state,set_photos_state] = useRef([])
    function productPhotos(data) {
        let d = data !== '' ? photos.current.push(data) : ''
        setimg_list(item => [...item, data])
        console.log(photos.current.length)
        window.localStorage.setItem('draft_images', JSON.stringify(photos.current));
    }

    function deletePhoto(data) {
        photos.current = data;
        setimg_list(data)
        window.localStorage.setItem('draft_images', JSON.stringify(photos.current));

    }


    function setAllInputsToNull(params) {
        productGender('')
        productType('')
        productSizeSelect('')
        productSubCategory('')
        productLocale('')
        productCondition('')
   }
    useEffect(() => {
        if(window.localStorage.getItem('draft_category') !== null && window.localStorage.getItem('draft_category') !== undefined && window.localStorage.getItem('draft_category') !== ''){ 

            // productPhotos(())
            let img = 
            JSON.parse(window.localStorage.getItem('draft_images')) !== null 
            ? 
            JSON.parse(window.localStorage.getItem('draft_images')).map(item => productPhotos(item)) 
            : ''

            productCategory(window.localStorage.getItem('draft_category')) 
            productTitle(window.localStorage.getItem('draft_title'))
            // setPhotos(result.photos.map(item => item.file))
            productDescription(window.localStorage.getItem('draft_description'))
            productPrice(window.localStorage.getItem('draft_price'))
            // setProduct_id(result.meta_data[0].product_id)
            productStock(window.localStorage.getItem('draft_stock'))
            productType(window.localStorage.getItem('draft_c_type'))
            productCondition(window.localStorage.getItem('draft_condition'))
            productLocale(window.localStorage.getItem('draft_locale'))
        }else{
            // setCategory('')
        }
       
    }, [])
    useEffect(() => {setCategoriesList(items.items.category)},[])
    useEffect(() => {setAllInputsToNull('')},[category_state])
    useEffect(() => {setScreenWidth(window.innerWidth)},[])
    useEffect(() => {let type = categoriesList.filter(item => Object.keys(item)[0] === category.current)[0]; if(type){setTypeList(type[category_state])}},[categoriesList,category_state])
 
 
    let handleForm = () => {
       
        book = []
        let inputs = [...document.querySelectorAll('input')]
        let textareas = [...document.querySelectorAll('textarea')]
        let selects = [...document.querySelectorAll('select')]
        // let allFields = [...inputs,...textareas,...selects]

        let result1 = validate_inputs('input', inputs, photos.current)
        let result2 = validate_inputs('textarea', textareas)
        let result3 = validate_inputs('select', selects)
        let response = [...result1, ...result2, ...result3]
        response.map((item) => {
            if(item !== -1){
                item.err !== '' ?  book.push(false) : book.push(true)
                item.err !== '' ? item.element.style.border = '1px solid red' : item.element.style.border = '1px solid green'
                item.err !== '' ? handleErr(item.element, item.err) : handleErr(item.element, item.err)

                function handleErr(element, err) {
                    let pElem = element.parentElement;

                    if(pElem.lastChild.className === 'err-mssg'){
                        pElem.lastChild.remove()

                        let newElem = document.createElement('div')
                        newElem.className = 'err-mssg';
                        newElem.innerHTML = err;
                        pElem.append(newElem);
                    }else{
                        let newElem = document.createElement('div')
                        newElem.className = 'err-mssg';
                        newElem.innerHTML = err;
                        pElem.append(newElem);
                    }
                }


            }
        })

        let checkForError = book.filter(item => item === false)

        if(checkForError.length < 1){
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            let seller_id = window.localStorage.getItem("CE_seller_id")
            //upload for here

            
            uploadForm(
                { 
                    title: title.current,
                    description: description.current,
                    category: category.current,
                    price: price.current,
                    photos: photos.current,
                    seller_id : seller_id
                }, 
                
                {cType: cType_state,locale: locale_state,subCategory: window.localStorage.getItem('draft_sub_category'),gender: window.localStorage.getItem('draft_gender'),condition: condition_state,stock: stock_state,size: window.localStorage.getItem('draft_size')}
            )

        }
        

    }

    
    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>

            <div className="notice-cnt" style={{margin: 'auto'}}>
                <span style={{margin: "0 15px 0 .5px"}}>An Error Occured, Please Try Again</span>
                <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                    close
                </button>
            </div>

            <div className="seller-main">

                <div className="seller-shop">

                    <div className='seller-shop-form-body'>
                        <div className="seller-shop-form">
                        
                            <div className='seller-shop-form-cnt'>

                                <div className="seller-shop-form-group-2" >

                                    <CategorySelect productCategory={productCategory} edit={edit} /> 

                                    <div style={{opacity: category.current !== '' ? '1' : '.4', pointerEvents: category.current !== '' ? 'all' : 'none'}}>
                                    

                                        {
                                            category_state === 'Fashion' 
                                            
                                            ? 
                                            
                                            <GenderSelect edit={edit} productGender={productGender} />

                                            :
                                            ""
                                        }

                                        <TypeSelect typeList={typeList} category={category_state} edit={edit} productType={productType} />

                                        {
                                            category_state === 'Fashion' 
                                            ? 

                                                cType_state === 'Clothing' || cType_state === 'Foot Wear'

                                                ?

                                                <SubCategory edit={edit} gender={gender_state} cType={cType_state} productSubCategory={productSubCategory} />

                                                :

                                                ""
                                            : 
                                            ""
                                        }
                                        

                                        {
                                            category_state === 'Fashion'
                                            ? 
                                                cType_state === 'Clothing' ||  cType_state === 'Foot Wear'
                                                ?
                                                <SizeSelect edit={edit} productSizeSelect={productSizeSelect} cType={cType_state}  />
                                                :
                                                ""
                                            : 
                                            ""
                                        }
                                        

                                        {
                                            category_state === 'Lodge/Apartments' || category_state === 'Pets' || category_state === 'Food'
                                            ? 
                                            ""
                                            : 
                                            <ConditionSelect category={category_state} productCondition={productCondition} edit={edit} subCategory={subCategory_state}  />
                                        }

                                        
                                        </div>
                                        <div style={{opacity: category_state !== '' ? '1' : '.4', pointerEvents: category_state !== '' ? 'all' : 'none'}} className="seller-shop-form-group-1">
                                        
                                        {
                                            category_state === 'Lodge/Apartments' 
                                            ? 
                                            ""
                                            : 
                                            <StockSelect edit={edit} productStock={productStock} />
                                        }

                                        
                                        <PriceSelect edit={edit} productPrice={productPrice} />
                                        {
                                            category_state !== 'Lodge/Apartments' 
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
                                <UploadBtn update={update} updateForm={update} handleForm={handleForm} />
                                :
                                ''
                            }

                        </div>


                        <div className="seller-shop-description" style={{textAlign: 'left', justifyContent: 'left', height: '100%'}}>
                            
                            <EditorTitle productTitle={productTitle}  edit={edit} />
                            
                            <EditorDescription productDescription={productDescription} edit={edit} />

                            <EditorPhotoStore category={category_state} edit={edit} productPhotos={productPhotos} photos={img_list} deletePhoto={deletePhoto} />

                        </div>

                        

                    </div>

                    {
                        screenWidth < 761
                        ?
                        <UploadBtn update={update} updateForm={update} handleForm={handleForm} />

                        :
                        '' 
                    }

                     

                </div>

            </div>
        </>
     );
}
 
export default Editor;