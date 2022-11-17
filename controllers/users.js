const { User, Thought } = require('../models');

const userObj = {

    getUser(req, res) {
        User.find()
            .then((userdata) => {
                res.json(userdata)
            }).catch((error) => {
                res.json(error)
            })
    }

    
}