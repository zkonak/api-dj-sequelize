const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class djmusicalgenres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.djs, {
        through: "djmusicalgenres",
        foreignKey: "musicalgenreId",
        as: "djs",
      });
    }
  }
  djmusicalgenres.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,

        validate: {
          notNull: true,
        },
      },
      djId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      musicalgenreId: {
        allowNull: false,
        type: DataTypes.UUID,
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
      modelName: "djmusicalgenres",
    }
  );
  return djmusicalgenres;
};
