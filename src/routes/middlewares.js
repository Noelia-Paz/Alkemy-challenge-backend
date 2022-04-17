const { Blog } = require("../database");

const verificaciones = {};

verificaciones.verificarImagen = (req, res, next) => {
  const extensionesValidas = ".png, .gif, .jpeg, .jpg";
  const imagen = req.body.imagen;
  const extension = imagen.substring(imagen.lastIndexOf(".") + 1).toLowerCase();
  const extensionValida = extensionesValidas.indexOf(extension);
  if (extensionValida < 0) {
    res.send("extension de la imagen es incorrecta");
  } else {
    next();
  }
};

verificaciones.verificarId = async (req, res, next) => {
  const blog = await Blog.findAll({ where: { id: Number(req.params.blogId) } });
  if (blog.length > 0) {
    next();
  } else {
    return res.send("El id no existe");
  }
};

module.exports = {
  verificaciones,
};
