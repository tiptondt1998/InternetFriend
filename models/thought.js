const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema(

    {
        thoughtText: {
            type: String
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: createdAtVal => dateFormat
        },
    }

);

const reactionsSchema = new Schema(
    {

       reactionId: {
           type: Schema.Types.ObjectId,
           default: () => new Types.ObjectId()
       },
       reactionBody:{
        type: String
       },
       writtenBy:{
           type: String
       },
       createdAt: {
           type: Date,
           default: Date.now,
           get: createdAtVal => dateFormat(createdAtVal)
       }
    },
    {
        toJSON:{
            getters: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.reduce((total, reaction) => total + Thought.reaction.length + 1, 0);
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;