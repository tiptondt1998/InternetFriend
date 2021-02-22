const router = require('express').Router();

const { getAllThoughts, addThought, removeThought,addReply, removeReply } = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

router.route('/:thoughtId/reactions')
.post(addReply)

router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReply)
  module.exports = router;