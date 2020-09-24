const express = require('express');
const router = express.Router()
const Comment = require('../models/comment')
const jwt = require("jsonwebtoken");
const comment = require('../models/comment');


router.get('/', async(req, res) => {
    console.log(req, res)
   try{
    const comments = await Comment.find().populate('replies.author author');
    res.json(comments)
   } catch{
    res.status(500).json({message: err.message})
   }
})

router.get('/:id', getComment, (req,res)=>{
    res.json(res.comment)
})


router.post('/', async(req, res)=>{
    const comment = new Comment({
        author: req.body.author,
        content: req.body.content,
        replies: req.body.replies
    })
    try{
        const newComment = await comment.save();
        res.status(201).json(newComment)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})


router.patch('/edit/:id',getComment, async(req,res)=>{
    token = req.header("auth-token");

    if(req.body.content!=undefined)
    {
        if(jwt.decode(token).id!= res.comment.author)  
            return res.status(401).json({ error: "User is unauthorized for this action" });
        else
             res.comment.content = req.body.content

    }
 
    else if(req.body.replies!=null) 
             res.comment.replies = res.comment.replies.concat(req.body.replies); 

    try{
        const updatedComment = await res.comment.save();
        res.json(updatedComment);
    } catch(err){
        res.status(400).json({message:err.message})
    }

})


router.delete('/delete/:id', getComment, async(req, res)=>{
    token = req.header("auth-token");
 

    if(jwt.decode(token).id!= res.comment.author)  
            return res.status(401).json({ error: "User is unauthorized for this action" });

    try {
        await res.comment.remove();
        res.json("comment deleted")
    } catch(err){
        res.status(500).json({message:err.message})

    }
})

async function getComment(req, res, next){
    let comment
    try{
        comment = await Comment.findById(req.params.id)
        if(comment==null){
            return res.status(404).json({message: 'Cannot find comment'})
        }
    }catch(err){
       return res.status(500).json({message:err.message})

    }
    res.comment = comment;
    next();
}

module.exports = router