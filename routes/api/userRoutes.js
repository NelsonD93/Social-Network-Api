const Thought = require('../../models/thought')
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
// Add friend
router.put('/:userId/friends/:friendId',(req,res)=>{
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then((user) => {
            !user
                ? res.status(404).json({ message: 'Invalid user ID' })
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
})

// Delete friend
router.delete('/:userId/friends/:friendId',(req,res)=>{
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then((user) => {
            !user
                ? res.status(404).json({ message: 'Invalid user ID' })
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
})

// Delete User by ID
router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then((userdata)=>{
        Thought.deleteMany({_id: {$in: user.thoughts}})
        res.json(userdata)
    }) .catch((error)=>{
        res.json(error)
    })
})

module.exports = router