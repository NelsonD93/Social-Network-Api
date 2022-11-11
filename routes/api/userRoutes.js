const User = require('../../models/user')
const router = require('express').Router()
// GET all users
router.get('/',(req,res)=>{
    User.find()
    .then((userdata)=>{
        res.json(userdata)
    }) .catch((error)=>{
        res.json(error)
    })
})
// Get user by ID
router.get('/:id',(req,res)=>{
    User.findById(req.params.id)
    .then((userdata)=>{
        res.json(userdata)
    }) .catch((error)=>{
        res.json(error)
    })
})
// Create a user
router.post('/',(req,res)=>{
    User.create(req.body)
    .then((userinfo)=>{
        res.json(userinfo)
    }) .catch((error)=>{
        res.json(error)
    })
})
// Update user by iD
router.put('/:id',(req,res)=>{
    User.findOneAndUpdate({_id: req.params.id},{$set: req.body})
    .then((userinfo)=>{
        res.json(userinfo)
    }) .catch((error)=>{
        res.json(error)
    })
})
// Delete by ID
router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then((userdata)=>{
        res.json(userdata)
    }) .catch((error)=>{
        res.json(error)
    })
})

module.exports = router