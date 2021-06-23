module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("clubs", {
      id: {
        type: Sequelize.UUID,
        default: Sequelize.fn("uuid_generate_v4"),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("clubs");
  },
};
