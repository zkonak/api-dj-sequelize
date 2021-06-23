module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("djmusicalgenres", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.fn("uuid_generate_v4"),
      },
      djId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "djs",
          key: "id",
        },
      },
      musicalgenreId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "musicalgenres",
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
    await queryInterface.dropTable("djmusicalgenres");
  },
};
