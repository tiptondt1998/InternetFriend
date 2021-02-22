const db = require('../models/');
const user = require('../models/user')

module.exports = {

    getAllUsers(req, res) {
      db.User.find({})
      // .populate({
      //   path: 'thoughts',
      //   select: '-__v' ?? ''
      // })
      // .select('-__v' ?? '')
      .then(dbUserData => {res.json(dbUserData)})
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    getUserById({ params }, res) {
      db.User.findOne({ _id: params.id })
        .populate({
          path: 'users',
          select: '-__v' ?? ''
        })
        .select('-__v' ?? '')
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    
createUser({ body }, res) {
   db.User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
  
updateUser({ params, body }, res) {
   db.User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  // delete pizza
deleteUser({ params }, res) {
   db.User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  addFriend({ params }, res){
    db.User.findOneAndUpdate({ _id: params.userId }, {$addToSet: { friends: params.friendId }}, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  removeFriend(){
    db.User.findOneAndUpdate({ _id: params.userId }, {$pull: { friends: params.friendId }}, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
}