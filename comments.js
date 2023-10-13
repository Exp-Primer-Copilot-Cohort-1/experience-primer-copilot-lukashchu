// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Import custom modules
const { getComments, addComment, deleteComment } = require('../utils/comments');

// Create router
const router = express.Router();

// Create middleware
router.use(bodyParser.json());

// Create routes
router.get('/', (req, res) => {
  const comments = getComments();
  res.json(comments);
});

router.post('/', (req, res) => {
  const { comment } = req.body;
  const comments = getComments();
  const id = uuidv4();
  const newComment = {
    id,
    comment,
  };
  comments.push(newComment);
  fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'comments.json'),
    JSON.stringify(comments, null, 2)
  );
  res.status(201).json(newComment);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const comments = getComments();
  const newComments = deleteComment(comments, id);
  fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'comments.json'),
    JSON.stringify(newComments, null, 2)
  );
  res.status(204).send();
});

// Export router
module.exports = router;