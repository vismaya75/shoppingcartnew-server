const db= require('./db');

let details={
    1:{username:"vismaya",email:'vismaya@gmail.com',password:'1234'},
    2:{username:"Ammu",email:'ammu@gmail.com',password:'2222'}

}
let currentUser
const register=(username,email,password)=>
{
    return db.User.findOne({email}).then(user=>{
     console.log(user);
     if(user){
        //req.session.currentUser=user
        return{
            status:false,
            statusCode:422,
            message:"User already exist.Please Login "
        }

     }
     else{
         const newUser= new db.User({
                
                username,
                email,
                password
            
         });
         newUser.save();
         return {
             status:true,
             statusCode:200,
             message:"Registration Success"
      }
     }
    })
    
}
const login=(req,email1,password)=>{
    var email=parseInt(email1);
    console.log(email1);
    console.log(password);
    return db.User.findOne({
        email:email1,
        password
    }).then(user=>{
        console.log(user);
        if(user){
            req.session.currentUser=user.email
            return {
                status:true,
                statusCode:200,
                message:"Login Success"
         }
        }
        else{
        return {
            status:false,
            statusCode:422,
            message:"Ivalid Credentials"
        }
    }

    })
}
    



module.exports={
    register,
    login
}