const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');

router.get('/', PostController.getPosts);
router.post('/', PostController.createPost);
router.delete('/:id', PostController.deletePost);
router.put('/like/:id', PostController.updatePost);

module.exports = router;
