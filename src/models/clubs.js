const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class clubs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.djs, { foreignKey: "clubId" });
      this.hasMany(models.djs, {
        foreignKey: {
          name: "clubId",
        },
      });
    }
  }

  clubs.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.UUID,
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
      modelName: "clubs",
    }
  );
  return clubs;
};
