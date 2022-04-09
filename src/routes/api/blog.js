const router = require("express").Router();

const { Blog, Categoria } = require("../../database");

const { verificaciones } = require("../middlewares");

//trae todos los blogs
router.get("/", async (req, res) => {
  const blog = await Blog.findAll();
  res.json(blog);
});

// trae un blog por id
router.get("/:blogId", verificaciones.verificarId, async (req, res) => {
  const blog = await Blog.findAll({
    where: { id: req.params.blogId },
  });
  //para relacionar las 2 tablas y que me traiga las categorias por id
  const categoriaId = blog[0].categoriaId;
  const categoria = await Categoria.findAll({
    where: { id: categoriaId },
    attributes: ["categoria"],
  });
  const nombreCategoria = categoria[0].categoria;
  blog[0].categoriaId = nombreCategoria;
  res.json(blog);
});

//crea un nuevo blog pero antes valida las extensiones de las imagenes
router.post("/", verificaciones.verificarImagen, async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

//actualiza o edita el blog pero antes valida las extensiones de las imagenes y el id
router.put(
  "/:blogId",
  verificaciones.verificarImagen,
  verificaciones.verificarId,
  async (req, res) => {
    const blog = await Blog.update(req.body, {
      where: { id: req.params.blogId },
    });
    return res.json(blog);
  }
);

//elimina el blog pero antes verifica el id

router.delete("/:blogId", verificaciones.verificarId, async (req, res) => {
  await Blog.destroy({ where: { id: req.params.blogId } });
  res.json({ success: "se ha borrado la pelicula" });
});

module.exports = router;
