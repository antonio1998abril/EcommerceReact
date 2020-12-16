const Product=require('../models/ProductModel').Product

class APIfeature{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    filtering(){
        const queryObj={...this.queryString}
        const excludedFields=['page','sort','limit']
        excludedFields.forEach(el=>delete(queryObj[el]))

        let queryStr =JSON.stringify(queryObj)
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$'+match)

        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ')
            this.query=this.query.sort(sortBy)
        }else{
            this.query=this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page=this.queryString.page *1||1
        const limit=this.queryString.limit * 1||6
        const skip =(page -1)*limit;
        this.quey=this.query.skip(skip).limit(limit)
        return this;
    }
}
module.exports={
  
    getProducts:async(req,res)=>{
        try{
          
            const features= new APIfeature(Product.find().lean(),req.query)
            .filtering().sorting().paginating()
            const products= await features.query

            res.json({
                status:'success',
                result:products.length,
                products:products
            })

           
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    createProduct:async(req,res)=>{
        try{
            const {title,price,description,content,images,category}=req.body;
         const product= await Product.findOne({title})
            if (product){
                return res.status(400).json({msg:"This product already exists."})
            } 

            else{
                const newProduct =new Product({
                    price,title:title.toLowerCase(),description,content,images,category
                })
                await newProduct.save()
                res.json({msg:"created a new product"})
            }
           

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    deleteProduct:async(req,res)=>{
        try{
            await Product.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleteeed a product"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateProduct:async(req,res)=>{
        try{
            const {title,price,description,content,images,category}=req.body;

            await Product.findByIdAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),price,description,content,images,category
            })
            res.json({msg:"Updated prodct"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
}