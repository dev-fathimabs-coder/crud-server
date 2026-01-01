let mongoose = require('mongoose');

let userSchema=new mongoose.Schema({
username :String,
email:String,
password:String
});

let Users =new mongoose.model('user',userSchema);

module.exports=Users;