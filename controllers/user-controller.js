const db = require('../models/');
const user = require('../models/user')
module.exports = {

    getAllUsers(req, res) {
      user.find({})
      .populate({
        path: 'thoughts',
        select: '-__v' ?? ''
      })
      .select('-__v' ?? '')
      .then(dbUserData => {res.json(dbUserData)})
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    getUserById({ params }, res) {
      user.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
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
   user.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
  // update pizza by id
updateUser({ params, body }, res) {
   user.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
   user.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
  }

// module.exports = userController;