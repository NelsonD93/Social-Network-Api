const Thought = require('../../models/thought');
const User = require('../../models/user');
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
router.post('/:userId/create/',(req,res)=>{
    Thought.create(req.body)
    .then((userdata)=>{
        User.findOneAndUpdate(
            {_id: userId },
            {$addToSet: {thoughts:thought.id} },
            {runValidators: true, new: true}
        )
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
// Delete thought by ID
router.delete('/:id',(req,res)=>{
    Thought.findByIdAndDelete(req.params.id)
    .then((userdata)=>{
        res.json(userdata)
    }) .catch((error)=>{
        res.json(error)
    })
})

// Add reactions to thoughts
router.post('/:thoughtId/reactions',(req,res)=>{
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )  
      .then((dbThoughtData)=>{
        if (!dbThoughtData) { // handle error if thought not found
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(dbThoughtData);
      })
})



// Delete reaction from thought
router.delete('/:thoughtId/reactions',(req,res)=>{
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {reactionId: req.body.reactionId } } },
        { runValidators: true, new: true }
      )  
      .then((dbThoughtData)=>{
        if (!dbThoughtData) { // handle error if thought not found
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(dbThoughtData);
      })
})

module.exports = router