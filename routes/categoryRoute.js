const router =require('express').Router()
const categoryController=require('../controllers/categoryController')
const auth=require('../middleware/auth')
const authadmin=require('../middleware/authadmin')


router.route('/category')
    .get(categoryController.getCategory)
    .post(auth,authadmin,categoryController.createCategory)

router.route('/category/:id')
    .delete(auth,authadmin,categoryController.deleteCategory)
    .put(auth,authadmin,categoryController.updateCategory)



module.exports=router