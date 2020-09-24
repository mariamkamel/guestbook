const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt  = require('jsonwebtoken')

router.get('/', async(req, res) => {
   try{
    const users = await User.find()
    res.json(users)
   } catch{
    res.status(500).json({message: err.message})
   }
})

router.post('/register', async(req, res)=>{
    const checkUser = await User.findOne({email: req.body.email})

    //register data validation
    if(checkUser) return res.status(400).json({ error: "An account with the same email already found" });

    if(req.body.email=="" || req.body.username=="" || req.body.password=="") 
        return res.status(400).json({ error: "You should enter email, username and password" });

    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailRegex.test(req.body.email))  
        return res.status(400).json({ error: "You should enter the right email format" });

    //password encryption
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)


    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password
    })

    try{
        const newUser = await user.save();
        res.status(201).json(newUser.id)
    } catch(err){
        res.status(400).json({message:err.message})
    }
})

router.post('/login', async(req, res)=>{
    const user =  await User.findOne({ email: req.body.email });
    
    const validatePassword = await bcrypt.compare(req.body.password, user.password)
    if (!validatePassword)
     return res.status(400).json({ error: "Password is wrong" });
   
     const token = jwt.sign(
        {
          username: user.username,
          id: user.id,
        },
        process.env.JWT_SECRET
      );
    
      res.header("auth-token", token).json({
        error: null,
        data: {
          token,
        },
      });

})


router.get('/:id', async(req,res)=>{
    let user
    try{
        user = await User.findById(req.params.id);
        if(user==null){
            return res.status(404).json({message: 'Cannot find user'})
        }
    } catch(err){
       return res.status(500).json({message:err.message})

    }
    res.user = user;
})


module.exports = router