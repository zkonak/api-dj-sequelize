const { musicalgenres } = require("../models");

const musicalGenresController = {
  getAllMusicalGenres: async () => {
    const MusicalGenres = await musicalgenres.findAll({
      order: [["name", "ASC"]],
      logging: false,
      attributes: ["name"],
      raw: true,
    });
    return MusicalGenres;
  },
};

module.exports = musicalGenresController;
