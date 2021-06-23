/* eslint-disable camelcase */
const { clubs, djs, djmusicalgenres, musicalgenres } = require("../models");

// const { Dj, Musicalgenre, DjMusicalgenre } = require("../models");
const { BadRequestError, NotFoundError } = require("../helpers/errors");
// const clubs = require("../models/clubs");

async function buildMusicalGenreArray(musical_genres, djId) {
  const AllMusicalGenres = await musicalgenres.findAll();

  return musical_genres.map((musical_genre) => {
    const genreFound = AllMusicalGenres.find(
      (anmusicGenre) => musical_genre === anmusicGenre.name
    );
    if (!musical_genre) {
      throw new NotFoundError(
        "Resource introuvable",
        "musical genre n'existe pas"
      );
    }
    return {
      djId,
      musicalgenreId: genreFound.id,
    };
  });
}

const djsController = {
  getAllDjs: async () => {
    const listDjs = await djs.findAll({
      attributes: {
        exclude: ["id", "clubId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: clubs,
          attributes: ["name"],
        },
        {
          model: musicalgenres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      order: [["name", "ASC"]],
    });
    return { listDjs };
  },

  getDj: async (name) => {
    const dj = await djs.findOne({
      where: {
        name,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "clubId"] },
      include: [
        {
          model: clubs,
          attributes: ["name"],
        },
        {
          model: musicalgenres,
          through: { attributes: [] },
        },
      ],
    });
    if (!dj) {
      throw new BadRequestError("Le Dj n'existe pas");
    }
    return { dj };
  },

  addDj: async (data) => {
    const { name, clubId } = data;
    const Dj = await djs.findOne({
      where: {
        name,
      },
    });

    if (Dj) {
      throw new BadRequestError("Le dj exist deja");
    }

    const club = await clubs.findOne({
      where: {
        id: clubId,
      },
    });
    if (!club) {
      throw new NotFoundError("Le club n'existe pas");
    }

    const newDj = await djs.create(data);

    const musicalgenre = await musicalgenres.findOne({
      where: {
        name: data.musical_genres[0],
      },
    });
    if (!musicalgenre) {
      throw new BadRequestError("musicalgenre n'exist pas");
    }

    await djmusicalgenres.create({
      djId: newDj.id,
      musicalgenreId: musicalgenre.id,
    });
    return newDj;
  },

  updateDj: async (name, data) => {
    const dj = await djs.findOne({
      // include: [
      //   {
      //     model: clubs,
      //     attributes: ["name"],
      //     as: "clubs",
      //   },
      //   {
      //     model: musicalgenres,
      //     as: "musical_genres",
      //     through: { attributes: [] },
      //   },
      // ],
      where: {
        name,
        // ...options,
      },
    });

    if (!dj) {
      throw new NotFoundError("Le Dj n'existe pas");
    }

    // const djToUpdate = pick(data);
    const djUpdated = await dj.update(data);

    const musicalGenresToUpdate = await buildMusicalGenreArray(
      data.musical_genres,
      djUpdated.id
    );
    await djmusicalgenres.destroy({
      where: { djId: djUpdated.id },
      //   ...options
    });

    await djmusicalgenres.bulkCreate(musicalGenresToUpdate);
    return { djUpdated };
  },

  deleteDj: async (name) => {
    const dj = await djs.findOne({
      where: {
        name,
      },
    });

    await djmusicalgenres.destroy({
      where: {
        djId: dj.id,
      },
    });
    const deletedDj = await djs.destroy({
      where: {
        name,
      },
    });
    return {
      deletedDj,
    };
  },
};

module.exports = djsController;
