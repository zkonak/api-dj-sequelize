const { Model, Sequelize } = require("sequelize");
// const djmusicalgenres = require("./djmusicalgenres");

module.exports = (sequelize, DataTypes) => {
  class musicalgenres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.djs, { foreignKey: "djId" });
      // this.belongsTo(models.djmusicalgenres, { foreignKey: "musicalgenreId" });
      musicalgenres.belongsToMany(models.djs, {
        through: "djmusicalgenres",
        foreignKey: "musicalgenreId",
      });
    }
  }
  musicalgenres.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        autoIncrement: true,
        defaultValue: Sequelize.UUIDV4,
      },

      name: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "musicalgenres",
    }
  );
  return musicalgenres;
};
