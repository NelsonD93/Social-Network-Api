const {Schema, model, Model, Types} = require('mongoose');
const moment = require('moment')

const reactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: ()=>{
            return new Types.ObjectId()
        }
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(timestamp) {
        return moment(timestamp).format('MM/DD/YYYY')
        }
    },
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(timestamp) {
        return moment(timestamp).format('MM/DD/YYYY')
        }
    },
    username: 
        {
            type: String,
            required: true
        },
    reactions: [
        reactionSchema
    ],

},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
})

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)
module.exports = Thought