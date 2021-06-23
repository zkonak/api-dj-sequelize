module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("musicalgenres", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.fn("uuid_generate_v4"),
        defaultValue: Sequelize.UUIDV4,
      },
      // id:{
      //   type: Sequelize.UUID,
      // },
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
    await queryInterface.dropTable("musicalgenres");
  },
};
