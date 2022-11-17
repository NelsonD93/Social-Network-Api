const { User, Thought } = require('../models');

const thoughtObj = {

    getThoughts(req, res) {
        Thought.find()
            .then((userdata) => {
                res.json(userdata)
            }).catch((error) => {
                res.json(error)
            })
    }

    
}

Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )

  // $pull for deleting thought