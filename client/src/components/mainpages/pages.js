import React,{useContext} from 'react'
import {Switch,Route} from 'react-router-dom'
import Products from './product/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/NotFound'
import DetailProduct from './detailProduct/DetailProduct'
import { GlobalState } from '../../GlobalState'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'

function Pages() {
    const  state= useContext(GlobalState)
    const [isLogged]=state.userAPI.isLogged
    const [isAdmin]=state.userAPI.isAdmin
   

    return (
     
            <Switch>
                <Route path="/" exact component={Products}></Route>
                <Route path="/detail/:id" exact component={DetailProduct}></Route>
                <Route path="/login" exact component={isLogged ? NotFound:Login}></Route>
                <Route path="/register" exact component={isLogged ? NotFound : Register}></Route>
                <Route path="/category" exact component={isAdmin ? Categories:NotFound}></Route>
                <Route path="/create_product" exact component={isAdmin ? CreateProduct:NotFound}></Route>
                <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct:NotFound}></Route>
                <Route path="/history" exact component={isLogged? OrderHistory: NotFound}></Route>
                <Route path="/history/:id" exact component={isLogged? OrderDetails: NotFound}></Route>
                <Route path="/cart" exact component={Cart}></Route>
                <Route path="*" exact component={NotFound}></Route>
            </Switch>
         
         
     
    )
}

export default Pages
