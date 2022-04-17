module.exports = (sequelize, type) => {
  return sequelize.define(
    "blog",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: type.STRING,
      contenido: type.STRING,
      imagen: type.STRING,
      categoriaId: type.INTEGER,
    },
    { freezeTableName: true, timestamps: true }
  );
};
