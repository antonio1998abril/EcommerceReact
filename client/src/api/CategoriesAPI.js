import {useState,useEffect} from 'react'
import Axios from 'axios'

function CategoriesAPI() {
    const [categories,setCategories]=useState([])
    const [callback,setCallback]=useState(false)

    useEffect(()=>{
        const getCategories =async()=>{
            const res= await Axios.get('/api/category')
            setCategories(res.data)
        }
        getCategories()
    },[callback])
    return{
        categories:[categories,setCategories],
        callback:[callback,setCallback]
    }
}

export default CategoriesAPI
