
import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function Productitem({product,deleteProduct,handleCheck}) {
  
    const state =useContext(GlobalState)
    const [isAdmin] =state.userAPI.isAdmin
    const addCart =state.userAPI.addCart
   


 
    

    return (
        <div className="product_card">
            {
                isAdmin  && <input type="checkbox" checked={product.checked}
                onChange={()=>handleCheck(product._id)}></input> 
            }
            <img src={product.images.url} alt=""></img> 
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>${product.description}</p>
            </div>
        

            <div className="row_btn">
            {
                isAdmin ?
                <>
                <Link id="btn_buy" to="#!" onClick={()=>deleteProduct(product._id,product.images.public_id)}>
                    Delete
                </Link>
                <Link id="btn_view" to={`/edit_product/${product._id}`}>
                    Edit
                </Link>

                </>
                :<>
            
                <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                    Buy
                </Link>
                <Link id="btn_view" to={`/detail/${product._id}`}>
                    View
                </Link>
            </>
            }
            </div>
        </div>
    )
}

export default Productitem
