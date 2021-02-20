const { Schema, model, Types } = require('mongoose');
const Thought = require('./thought');

const UserSchema = new Schema(

    {
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
       },
     //thoughts: [ThoughtSchema]
    },  
    {
    toJSON: {
           virtuals: true,
           getters: true
    }
    });
UserSchema.virtual('friendCount').get(function(){
    return this.friends.reduce((total, friend) => total + User.friends.length + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;