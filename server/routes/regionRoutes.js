// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");
const { QueryTypes, where } = require("sequelize");

// Import created models
const Region = require("../models/region");

/**
 * GET - afisare lista regiuni.
 */
application.get("/regions", async (request, response, next) => {
  try {
    const regions = await Region.findAll();
    if (regions.length > 0) {
      response.json(regions);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET - afisarea unei anumite regiuni
 */
application.get("/regions/:regionId", async (req, res, next) => {
  try {
    const region = await Region.findByPk(req.params.regionId);
    if (region) {
      res.status(200).json(region);
    } else {
      res.status(404).json({
        error: `Regiunea cu id-ul ${req.params.regionId} nu a fost gasita!`,
      });
    }
  } catch (err) {
    next(err);
  }
});

application.get("/regionsName/:name", async (req, res, next) => {
  try {
    const regions = await sequelize.query(
      `SELECT * FROM regions where nume='${req.params.name}'`,
      { type: QueryTypes.SELECT }
    );
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
 * POST - adaugare regiune in baza de date
 */
application.post("/regions", async (request, response, next) => {
  try {
    const region = await Region.create(request.body);
    response.status(201).json({ message: "Regiunea a fost adaugata!" });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT - actualizare regiune
 */
application.put("/regions/:regionId", async (req, res, next) => {
  try {
    const region = await Region.findByPk(req.params.regionId);
    if (region) {
      await region.update(req.body);
      res.status(200).json({
        message: `Regiunea cu id-ul ${req.params.regionId} a fost actualizata!`,
      });
    } else {
      res.status(404).json({
        error: `Regiunea cu id-ul ${req.params.regionId} nu a fost gasita!`,
      });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE - stergere regiune
 */
application.delete("/regions/:regionId", async (req, res, next) => {
  try {
    const region = await Region.findByPk(req.params.regionId);
    if (region) {
      await region.destroy();
      res.status(200).json({
        message: `Regiunea cu id-ul ${req.params.regionId} a fost stearsa!`,
      });
    } else {
      res.status(404).json({
        error: `Regiunea cu id-ul ${req.params.regionId} nu a fost gasita!`,
      });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = application;
