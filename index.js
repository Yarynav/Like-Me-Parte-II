const express = require('express');
const app = express();
const cors = require('cors');
const PostController = require('./controllers/PostController');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.get('/posts', PostController.getPosts);
app.post('/posts', PostController.createPost);
app.delete('/posts/:id', PostController.deletePost);
app.put('/posts/like/:id', PostController.updatePost);

app.listen(3000, console.log('SERVIDOR ENCENDIDO'));
