const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class djs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   this.belongsTo(models.clubs);
      //   this.belongsToMany(models.musicalgenres, {
      //     through: "djmusicalgenres",
      //     foreignKey: "djId",
      //     as: "musical_genres",
      //   });
      // }
      this.belongsTo(models.clubs, {
        foreignKey: {
          name: "clubId",
        },
      });
      this.belongsToMany(models.musicalgenres, {
        through: "djmusicalgenres",
        foreignKey: {
          name: "djId",
        },
      });
    }
  }
  djs.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        autoIncrement: true,
        defaultValue: Sequelize.UUIDV4,
      },

      urlName: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      biorgraphy: {
        type: DataTypes.STRING,
      },
      soundcloud: {
        type: DataTypes.STRING,
      },
      facebook: {
        type: DataTypes.STRING,
      },
      instagram: {
        type: DataTypes.STRING,
      },
      spotify: {
        type: DataTypes.STRING,
      },
      beatport: {
        type: DataTypes.STRING,
      },
      mixcloud: {
        type: DataTypes.STRING,
      },
      youtube: {
        type: DataTypes.STRING,
      },
      clubId: {
        type: DataTypes.UUID,
        references: {
          model: "clubs",
          key: "id",
        },
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
      modelName: "djs",
    }
  );
  return djs;
};
