const validation = require('../helpers/validation');
const PostModel = require('../models/PostModel');

const createPost = async (req, res) => {
  const isValid = await validation.createPostValidation(req, res);
  if (isValid === false) return;
  const payload = req.body;
  const values = [
    payload.titulo,
    payload.url,
    payload.descripcion,
    payload.likes,
  ];
  await PostModel.create(values);
  res.json({ msj: 'Hemos creado una tarjeta' });
};

const getPosts = async (req, res) => {
  const rows = await PostModel.list();
  res.json(rows);
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.getById(id);
  if (post.length > 0) {
    const likes = post[0].likes === null ? 1 : post[0].likes + 1;
    await PostModel.update(likes, id);
    res.json({ msj: 'a like' });
  } else {
    res.status(404).json({ msj: 'El registro no existe' });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.getById(id);
  if (post.length > 0) {
    await PostModel.remove(id);
    res.json({ msj: 'Eliminaste una tarjeta' });
  } else {
    res.status(404).json({ msj: 'El registro no existe' });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
};
