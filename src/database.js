const { Sequelize } = require("sequelize");

const BlogModel = require("./models/blog");

const CategoriaModel = require("./models/categorias");

const UserModel = require("./models/User");

const sequelize = new Sequelize("api_blog", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

const Blog = BlogModel(sequelize, Sequelize);
const Categoria = CategoriaModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("tablas sincronizadas");
});

module.exports = {
  Blog,
  Categoria,
  User,
};
