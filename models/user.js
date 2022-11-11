const {Schema, model, Model} = require('mongoose');
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: 	/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

},
{
    toJSON: {
        virtuals: true
    }
})

userSchema.virtual('friendcount').get(function(){
    return this.friends.length
})

const User = model('User', userSchema)
module.exports = User