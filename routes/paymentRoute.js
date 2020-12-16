const router = require('express').Router()
const paymentController= require('../controllers/paymentController')
const auth =require ('../middleware/auth')
const authAdmin= require ('../middleware/authadmin')

router.route('/payment')
    .get(auth,authAdmin,paymentController.getPayments)
    .post(auth,paymentController.createPayment)

module.exports=router