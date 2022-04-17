const router = require("express").Router();

const { Blog, Categoria } = require("../database");

const { verificaciones } = require("../routes/middlewares");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.get("/:blogId", verificaciones.verificarId, async (req, res) => {
  const blog = await Blog.findAll({
    where: { id: req.params.blogId },
  });

  const categoriaId = blog[0].categoriaId;
  const categoria = await Categoria.findAll({
    where: { id: categoriaId },
    attributes: ["categoria"],
  });
  const nombreCategoria = categoria[0].categoria;
  blog[0].categoriaId = nombreCategoria;
  res.json(blog);
});

router.post("/", verificaciones.verificarImagen, async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.put(
  "/:blogId",
  verificaciones.verificarImagen,
  verificaciones.verificarId,
  async (req, res) => {
    console.log(req);
    const blog = await Blog.update(req.body, {
      where: { id: req.params.blogId },
    });
    return res.json(blog);
  }
);

router.delete("/:blogId", verificaciones.verificarId, async (req, res) => {
  await Blog.destroy({ where: { id: req.params.blogId } });
  res.json({ success: "se ha borrado la pelicula" });
});

module.exports = router;
