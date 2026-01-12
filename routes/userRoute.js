let express = require('express');
const { addUser, getAllUsers, getUserById, updateUserById, deleteUser } = require('../controllers/userController');

let userRoute = express.Router();

userRoute.post('/', addUser)

userRoute.get('/all-users', getAllUsers)
userRoute.get('/user/:id', getUserById)

userRoute.patch('/update/:id', updateUserById)

userRoute.delete('/delete/:id', deleteUser)

module.exports=userRoute
