const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping_server',{useNewUrlParser:true,useUnifiedTopology: true })

const User = mongoose.model('User',{
    username:String,
    email:String,
    password:String
})
module.exports={
    User
}