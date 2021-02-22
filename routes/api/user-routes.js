const router = require('express').Router({ mergeParams: true });


const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  } = require('../../controllers/user-controller');


router
  .route('/')
  .get(getAllUsers)
  .post(createUser);


router
  .route('/:id')
  .get(getUserById)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;