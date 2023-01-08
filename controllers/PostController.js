const pool = require('../DataBase');
const validation = require('../helpers/validation');

const createPost = async (req, res) => {
  const isValid = validation.createPostValidation(req, res);
  if (isValid === false) return;
  const payload = req.body;
  const query =
    'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *'; //consulta sql
  const values = [
    payload.titulo,
    payload.url,
    payload.descripcion,
    payload.likes,
  ]; //los valores que se van a insertar en la base de datos de esta forma se evita el sql injection
  await pool.query(query, values);
  res.json({ msj: 'Hemos creado una tarjeta' });
};

const getPosts = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM posts');
  res.json(rows);
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { rows } = await pool.query('SELECT * FROM posts WHERE id= $1', [id]);
  const like = rows[0].likes === null ? 1 : rows[0].likes + 1;
  await pool.query('UPDATE posts SET likes= $1 WHERE id= $2', [like, id]);
  res.json({ msj: 'a like' });
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM posts WHERE id = $1';
  const value = [id];
  await pool.query(query, value);
  res.json({ msj: 'Eliminaste una tarjeta' });
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
};
