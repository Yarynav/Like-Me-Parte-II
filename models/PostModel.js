const pool = require('../helpers/DataBase').getInstance();

const create = async (values) => {
  const query =
    'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *'; //consulta sql
  await pool.query(query, values);
};

const list = async () => {
  const { rows } = await pool.query('SELECT * FROM posts ORDER BY id ASC');
  return rows;
};

const getById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM posts WHERE id= $1', [id]);
  return rows;
};

const getByImg = async (img) => {
  const { rows } = await pool.query('SELECT * FROM posts WHERE img= $1', [img]);
  return rows;
};

const update = async (likes, id) => {
  await pool.query('UPDATE posts SET likes= $1 WHERE id= $2', [likes, id]);
};

const remove = async (id) => {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
};

module.exports = {
  create,
  list,
  remove,
  update,
  getById,
  getByImg,
};
