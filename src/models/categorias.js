//modelo de la tabla
module.exports = (sequelize, type) => {
  return sequelize.define(
    "categorias",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      categoria: type.STRING,
    },
    { freezeTableName: true, timestamps: true }
  );
};
