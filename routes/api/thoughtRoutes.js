const Thought = require('../../models/thought');
const router = require('express').Router();

// Get all thoughts
router.get('/',(req,res)=>{
    Thought.find()
    .then((userdata)=>{
        res.json(userdata)
    }) .catch((error)=>{
        res.json(error)
    })
})
// Get one thought by ID
router.get('/:id',(req,res)=>{
    Thought.findById(req.params.id)
    .then((userdata)=>{
        res.json(userdata)
    }) .catch((error)=>{
        res.json(error)
    })
})

// Create thought
router.post('/',()=>{
    Thought.create(req.body)
    .then((userdata)=>{
        res.json(userdata)
    }) .catch((error)=>{
        res.json(error)
    })
})
// Update thought by ID
router.put('/:id',(req,res)=>{
    Thought.findOneAndUpdate({_id: req.params.id},{$set: req.body})
    .then((userdata)=>{
        res.json(userdata)
    }) .catch((error)=>{
        res.json(error)
    })
})

router.delete('/:id',(req,res)=>{
    Thought.findByIdAndDelete(req.params.id)
    .then((userdata)=>{
        res.json(userdata)
    }) .catch((error)=>{
        res.json(error)
    })
})

// Thought.findOneAndUpdate(
//     { _id: req.params.thoughtId },
//     { $addToSet: { reactions: req.body } },
//     { runValidators: true, new: true }
//   )

module.exports = router