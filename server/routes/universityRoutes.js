// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");
const { QueryTypes, where } = require("sequelize");

// Import created models
const University = require("../models/university");

/**
 * GET - afisare lista universitati.
 */
application.get("/universities", async (request, response, next) => {
  try {
    const universities = await University.findAll();
    if (universities.length > 0) {
      response.json(universities);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

application.get("/universityName/:name", async (req, res, next) => {
  try {
    const regions = await sequelize.query(
      `SELECT * FROM universities where nume='${req.params.name}'`,
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
 * GET - afisarea unei anumite universitati
 */
application.get("/universities/:universityId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      res.status(200).json(university);
    } else {
      res.status(404).json({
        error: `Universitatea cu id-ul ${req.params.universityId} nu a fost gasita!`,
      });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST - adaugare universitate in baza de date
 */
application.post("/universities", async (request, response, next) => {
  try {
    const university = await University.create(request.body);
    response.status(201).json({ message: "Universitatea a fost adaugata!" });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT - actualizare universitate
 */
application.put("/universities/:universityId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      await university.update(req.body);
      res.status(200).json({
        message: `Universitatea cu id-ul ${req.params.universityId} a fost actualizata!`,
      });
    } else {
      res.status(404).json({
        error: `Universitatea cu id-ul ${req.params.universityId} nu a fost gasita!`,
      });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE - stergere universitate
 */
application.delete("/universities/:universityId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      await university.destroy();
      res.status(200).json({
        message: `Universitatea cu id-ul ${req.params.universityId} a fost sters!`,
      });
    } else {
      res.status(404).json({
        error: `Universitatea cu id-ul ${req.params.universityId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = application;
