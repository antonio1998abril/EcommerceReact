import Axios from 'axios'
import React, {createContext,useState,useEffect} from 'react'
import CategoriesAPI from './api/CategoriesAPI'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'

export const GlobalState = createContext()

export const DataProvider=({children})=>{
    const [token,setToken]=useState(false)


    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken=async()=>{
                const ver=await Axios.get('/user/refresh_token')      
                setToken(ver.data.token)
    
                setTimeout(()=>{
                    refreshToken()
                },15000)
            
            }
            refreshToken()
        }
        else{
            
        }
      

        
    },[])

    const state={
        token:[token,setToken],
        productsAPI:ProductsAPI(),
        userAPI:UserAPI(token),
        categoriesAPI:CategoriesAPI()
    }
   
    return(
        <GlobalState.Provider value={state}>
        {children}
        </GlobalState.Provider>
    )
}