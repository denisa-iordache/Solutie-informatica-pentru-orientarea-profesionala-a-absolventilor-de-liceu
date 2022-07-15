// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");
const { QueryTypes, where } = require("sequelize");

// Import created models
const City = require("../models/city");
const Region = require("../models/region");

application.get("/cityName/:name", async (req, res, next) => {
  try {
    const regions = await sequelize.query(`SELECT * FROM cities where nume='${req.params.name}'`, { type: QueryTypes.SELECT });
    if (regions.length > 0) {
      res.json(regions);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET - afisare orase pentru un judet specificat.
 */
application.get("/cities", async (request, response, next) => {
  try {
    const movies = await City.findAll();
    if (movies.length > 0) {
      response.json(movies);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

application.post("/citiesRegions", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `INSERT INTO cities (nume, id_regiune) VALUES ('${req.body.nume}', ${req.body.id_regiune})`,
      { type: QueryTypes.INSERT }
    );
    if (counties.length > 0) {
      res.json(counties);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

application.put("/citiesRegions/:id", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `UPDATE cities set nume = '${req.body.nume}', id_regiune=${req.body.id_regiune} where id=${req.params.id}`,
      { type: QueryTypes.UPDATE }
    );
    if (counties.length > 0) {
      res.json(counties);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});


application.get("/citiesRegions", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `SELECT a.id, a.nume oras, b.nume regiune
    FROM cities a, regions b
    WHERE a.id_regiune=b.id order by b.nume
    `,
      { type: QueryTypes.SELECT }
    );
    if (counties.length > 0) {
      res.json(counties);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

application.get("/citiesRegions/:id", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `SELECT a.id, a.nume oras, b.nume regiune
      FROM cities a, regions b
      WHERE a.id_regiune=b.id and a.id=${req.params.id}`,
      { type: QueryTypes.SELECT }
    );
    if (counties) {
      res.json(counties);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET - preluarea unui anumit oras dintr-un anumit judet
 */
application.get(
  "/regions/:regionName/citiesRegions",
  async (req, res, next) => {
    try {
      const counties = await sequelize.query(
        `SELECT * FROM citiesRegions where regiune='${req.params.regionName}'`,
        { type: QueryTypes.SELECT }
      );
      if (counties.length > 0) {
        res.json(counties);
      } else {
        res.sendStatus(204);
      }
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST - adaugare oras la regiune.
 */
application.post(
  "/regions/:regionId/cities",
  async (request, response, next) => {
    try {
      const region = await Region.findByPk(request.params.regionId);
      if (region) {
        const city = await City.create(request.body);
        region.addCity(city);
        await region.save();
        response.status(200).json(city);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT - actualizare oras dintr-un judet specificat
 */
application.put("/regions/:regionId/cities", async (req, res, next) => {
  try {
    const region = await Region.findByPk(req.params.regionId);
    if (region) {
      const cities = await region.getCities({
        where: { id: req.params.cityId },
      });
      const city = cities.shift();
      if (city) {
        await city.update(req.body);
        res.status(200).json({
          message: `Orasul cu id-ul ${req.params.cityId} a fost actualizat!`,
        });
      } else {
        res.status(404).json({
          error: `Orasul cu id-ul ${req.params.cityId} nu a fost gasit!`,
        });
      }
    } else {
      response.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

application.delete("/cities/:cityId", async (req, res, next) => {
  try {
    const domain = await City.findByPk(req.params.cityId);
    if (domain) {
      await domain.destroy();
      res.status(200).json({
        message: `Domeniul cu id-ul ${req.params.cityId} a fost sters!`,
      });
    } else {
      res.status(404).json({
        error: `Domeniul cu id-ul ${req.params.cityId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = application;
