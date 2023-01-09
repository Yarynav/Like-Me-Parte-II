const PostModel = require('../models/PostModel');

const createPostValidation = async (req, res) => {
  const previousPost = await PostModel.getByImg(req.body.url);
  if (
    req.body.titulo.length === 0 ||
    req.body.url.length === 0 ||
    req.body.descripcion.length === 0
  ) {
    res
      .status(500)
      .json({ msj: 'Debe ingresar todos los campos del formulario' });
    return false;
  } else if (previousPost.length > 0) {
    res.status(409).json({ msj: 'Ya existe un registro con la misma url' });
    return false;
  } else {
    return true;
  }
};

module.exports = {
  createPostValidation,
};
