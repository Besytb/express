
const express= require('express')
const router = express.Router();
const bankService= require('../services/bank.service')

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtSecret = "secretkey!@w"

const authMiddleware = (req,res,next)=>{
  console.log(req.headers)
  try{
    
    const token = req.headers.authorization.split(" ")[1]
const decoded=jwt.verify(token,jwtSecret)
    req.decoded=decoded
    next()
  }
   catch{
  res.status(401).send({message:"invalid token"})
    }
}


/* GET home page. */
router.get('/', function(req, res) {
  User.find({
    balance:{
      $gt:15000
    }
  })
  .then(users=>{
    res.send(users)
  })
  // const user = new User({

    // acno:1234,
    // balance:888,
    // username:"test",
    // password:"test",
    // history:[
        
  //   // ]
  // })
  // user.save();



});

router.get('/users',authMiddleware,function(req, res) {
bankService.getUsers()
.then(users=>{
  res.send(users)
  
 
});
})


router.post('/login', function(req, res) {
  bankService.authenticateUser(req.body.username,req.body.password)
  .then(user=>{
    if(user){
    const token = jwt.sign({
      exp: Math.floor(Date.now()/1000)+(60*60*5),
      username:req.body.username,
      _id:user._id
    },jwtSecret);

  res.send({
    message:"logged in successfully",
   token:token
   
});
  }else{
    res.status(422).send({
  message:"invalid credentials"
  });
}

  })
  
//res.render('index', { title: 'hello world' });
})




router.post('/deposit',authMiddleware,function(req, res) {
  bankService.deposit(req.decoded._id,req.body.amount)
  .then(message=>{ 
    res.send(message)
  
  
  });
})




router.post('/withdraw',authMiddleware, function(req, res) {
  bankService.withdraw(req.decoded._id,req.body.amount)
  .then(message=>{
    res.send(message)
    
   }); 
  })
    
  
  
  



router.get('/history',authMiddleware, function(req, res) {
  
  bankService.getUser(req.decoded._id)
  .then(user=>{
    res.send(user.history)
    
   
  });
})

router.get('/profile',authMiddleware, function(req, res) {
  
  bankService.getUser(req.decoded._id)
  .then(user=>{
    res.send(user)
    
   
  });
})

router.patch("/profile",authMiddleware, function(req,res){
  bankService.updateUser(req.decoded._id, req.body)
  .then(user=>{
    res.send({message:"profile updated succesfully"});
});
})
router.patch("/test/:id",function(req,res){
res.send(req.params.id)
})
router.delete("/users/:id",function(req,res){
  bankService.deleteUser(req.params.id)
  .then(user=>{
    res.send({message:"deleted successfully"})
  })
  
  })


module.exports = router;
