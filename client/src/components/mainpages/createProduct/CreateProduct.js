import React,{useState,useContext,useEffect} from 'react'
import Axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'
import {useHistory,useParams} from 'react-router-dom'


const initialState={
    product_id:'',
    title:'',
    price:0,
    description:'llenar',
    content:'Antonio',
    category:'',
    id:''

}

function CreateProduct() {
    const state=useContext(GlobalState)
    const [product,setProduct] =useState(initialState)
    const [categories] =state.categoriesAPI.categories
    const [images,setImages]=useState(false)
    const [loading,setLoading] = useState(false)

    const [isAdmin]=state.userAPI.isAdmin
    const [token] = state.token
    const history = useHistory()
    const params=useParams()

    const [products] =state.productsAPI.products
    const [onEdit,setOnEdit] =useState(false)
    const [callback,setCallback]=state.productsAPI.callback

    useEffect(()=>{
        if(params.id){
            setOnEdit(true)
            products.forEach(product=>{
                if(product._id === params.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[params.id,products])

    const handleUpload =async e=>{
        e.preventDefault()
        try{
            if(!isAdmin)
            return alert("you are not Admin")
            const file=e.target.files[0]

            if(!file) return alert("file not exist")

            if(file.size >1024 *1024)
            return alert("File not exist")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return alert("File format is incorrect")

            let formData = new FormData()
            formData.append('file',file)

            setLoading(true)
             const res= await Axios.post('/api/upload',formData,{
                 headers:{'content-type':'multipart/form-data',Authorization:token}
             }) 
             setLoading(false)
             setImages(res.data)
        }catch(err){
            alert(err.response.data.msg)
        }
    }
    const handleDestroy=async()=>{
        try{
            if(!isAdmin) return alert("yuo are not an admin")
            setLoading(true)
            await Axios.post('/api/destroy',{public_id: images.public_id},{
                headers:{Authorization:token}
            })
            setLoading(false)
            setImages(false)

        }catch(err){
            alert(err.response.data.msg)
        }
    }
    const handleChangeInput=e=>{
        const {name,value}=e.target
        setProduct({...product,[name]:value})
    }
    const handleSubmit=async e=>{
        e.preventDefault()
        try{
            if (!isAdmin) return alert("you are not admin")
            if (!images) return alert("No image Upload")

            if(onEdit){
                await Axios.put(`/api/products/${product._id}`,{...product,images},{
                    headers:{Authorization:token}
                })
            }else{
                await Axios.post('/api/products',{...product,images},{
                    headers:{Authorization:token}
                })
            }
           
         /*    setImages(false)
            setProduct(initialState) */
            setCallback(!callback)
            history.push("/")
        }catch(err){
            alert(err.response.data.msg)

        }
    }



    const styleUpload={
        display:images ? "block" :"none"
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}></input>
                    {
                        loading ? <div id="file_img"><Loading></Loading></div>
                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url:''} alt=""></img>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                    }
            
            <form onSubmit={handleSubmit}>
              {/*   <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit}></input>
                </div> */}

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput}></input>
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput}></input>
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="5" onChange={handleChangeInput}></textarea>
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content}rows="5" onChange={handleChangeInput}></textarea>
                </div>


                <div className="row">
                    <label htmlFor="categories">Categories</label>
                    <select name="category" value={product.category} onChange={handleChangeInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map( category =>(
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                    <button type="submit"> {onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    </div>
    )
}
/* cloudimage ?o]7^4mQ */
export default CreateProduct
