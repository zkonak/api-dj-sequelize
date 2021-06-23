const { BadRequestError } = require("../helpers/errors");
const { clubs } = require("../models");

const clubsController = {
  getAllClubs: async () => {
    const Clubs = await clubs.findAll({
      order: [["name", "ASC"]],
      logging: false,
      attributes: ["name"],
      raw: true,
    });
    return Clubs;
  },
  getClub: async (name) => {
    const club = await clubs.findOne({
      where: {
        name,
      },
      attributes: ["id", "name"],
    });
    if (!club) {
      throw new BadRequestError("Le Dj n'existe pas");
    }
    return club;
  },
  addClub: async (data) => {
    const { name } = data;
    const club = await clubs.findOne({
      where: {
        name,
      },
    });

    if (club) {
      throw new BadRequestError("Le club exist deja");
    } else {
      const newClub = await clubs.create({ name });
      return newClub;
    }
  },
};

module.exports = clubsController;
