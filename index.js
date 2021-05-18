
const express=require('express');
const session =require('express-session');

const dataService= require('./service/dataservice');

const cors= require('cors');
const app=express();


  app.use(cors({
    origin: "http://localhost:4200",
    credentials:true
    }))

app.use(express.json());

app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}))
 
  const authMiddleware=(req,res,next)=>{
     if(!req.session.currentUser){
         return res.json({
           status:false,
            statusCode:401,
            message:"pls register"
        })
     }
     else{
         next()
     }
 }

app.get('/',(req,res)=>{
    res.send("hiooo")
})

app.post('/register',(req,res)=>{
   dataService.register(req.body.username,req.body.email,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/login',(req,res)=>{
      dataService.login(req,req.body.email,req.body.password)
     .then(result=>{
        res.status(result.statusCode).json(result)
    })
 })

app.patch('/',(req,res)=>{
    res.send("patch")
})

app.put('/',(req,res)=>{
    res.send("put")
})
app.listen(5000,()=>{
    console.log("server is 5000");
})