import React,{useContext,useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'
import{GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productitem/Productitem'

function DetailProduct() {
    const params =useParams()
    const state =useContext(GlobalState)
    const [products] =state.productsAPI.products
    const [detailproduct,setDetailProduct]=useState([])
    const addCart=state.userAPI.addCart

    useEffect(()=>{
        if(params.id){
            products.forEach(product=>{
                if(product._id=== params.id) setDetailProduct(product)
            })
        }
    },[params.id,products])

    

    if(detailproduct.length ===0) return null;

    return (
        <>
        <div className="detail">
            <img src={detailproduct.images.url} alt=""></img> 
      <div className="box-detail">
          <div className="row">
    <h2>{detailproduct.title}</h2>
    <h6>{detailproduct.category}</h6>
          </div>
    <span>${detailproduct.price}</span>
    <p>{detailproduct.description}</p>
    <p>{detailproduct.content}</p>
    <p>Sold:{detailproduct.sold}</p>
    <Link to="/cart" className="cart"
    onClick={()=>addCart(detailproduct)}>Buy Now</Link>
      </div>
        </div>

            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product=>{
                            return product.category===detailproduct.category
                        ?<ProductItem key={product._id} product={product}/>:null
                        })
                    }
                </div>
            </div>
    </>

    )
}

export default DetailProduct
