const Users=require('../models/UserModel').Users;

const authAdmin = async (req, res, next) =>{
    try {
        // Get user information by Id
        const user = await Users.findOne({
            _id: req.user.id
        })

        if (user.role === 0) 
            return res.status(400).json({msg: 'Admin resources access denied'})
            next()
        

        
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}
module.exports = authAdmin