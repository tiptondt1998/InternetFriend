const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./reactions');

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
        reactions: [reactionSchema]
    }

);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.reduce((total, reaction) => total + Thought.reaction.length + 1, 0);
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;