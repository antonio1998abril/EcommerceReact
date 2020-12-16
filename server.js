const express=require('express')
const app=express()
const mongoose =require('mongoose')
const cors= require('cors')
const bodyParser=require('body-parser')
const cookieParser =require('cookie-parser')
const fileUpload = require('express-fileupload')
const userRoute=require('./routes/userRoute')
const categoryRoute=require('./routes/categoryRoute')
const  productRoute=require('./routes/productRoute')
const paymentRoute=require('./routes/paymentRoute')
const uploadRoute=require('./routes/uploads')

const path =require('path')
require('dotenv').config()


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

app.use('/user',userRoute)
app.use('/api',categoryRoute)
app.use('/api',productRoute)
app.use('/api',paymentRoute)
app.use('/api',uploadRoute)


const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})