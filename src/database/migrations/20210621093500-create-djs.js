module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("djs", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.fn("uuid_generate_v4"),
      },
      urlName: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      biorgraphy: {
        type: Sequelize.STRING,
      },
      soundcloud: {
        type: Sequelize.STRING,
      },
      facebook: {
        type: Sequelize.STRING,
      },
      instagram: {
        type: Sequelize.STRING,
      },
      spotify: {
        type: Sequelize.STRING,
      },
      beatport: {
        type: Sequelize.STRING,
      },
      mixcloud: {
        type: Sequelize.STRING,
      },
      youtube: {
        type: Sequelize.STRING,
      },
      clubId: {
        type: Sequelize.UUID,
        references: {
          model: "clubs",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("djs");
  },
};
