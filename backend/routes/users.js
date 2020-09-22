const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async(req, res) => {
   try{
    const users = await User.find()
    res.json(users)
   } catch{
    res.status(500).json({message: err.message})
   }
})

router.post('/register', async(req, res)=>{
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    try{
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch(err){
        res.status(400).json({message:err.message})
    }
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
    res.json(user);
})


module.exports = router