// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");
const { QueryTypes, where } = require("sequelize");

// Import created models
const Domain = require("../models/domain");

/**
 * GET - afisare lista domenii.
 */
application.get("/domains", async (request, response, next) => {
  try {
    const domains = await Domain.findAll();
    if (domains.length > 0) {
      response.json(domains);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET - afisarea unui anumit domeniu
 */
application.get("/domains/:domainId", async (req, res, next) => {
  try {
    const domain = await Domain.findByPk(req.params.domainId);
    if (domain) {
      res.status(200).json(domain);
    } else {
      res.status(404).json({
        error: `Domeniul cu id-ul ${req.params.domainId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    next(err);
  }
});

application.get("/domainName/:name", async (req, res, next) => {
  try {
    const regions = await sequelize.query(
      `SELECT * FROM domains where nume='${req.params.name}'`,
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
 * POST - adaugare domeniu in baza de date
 */
application.post("/domains", async (request, response, next) => {
  try {
    const domain = await Domain.create(request.body);
    response.status(201).json({ message: "Domeniul a fost adaugat!" });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT - actualizare domeniu
 */
application.put("/domains/:domainId", async (req, res, next) => {
  try {
    const domain = await Domain.findByPk(req.params.domainId);
    if (domain) {
      await domain.update(req.body);
      res.status(200).json({
        message: `Domeniul cu id-ul ${req.params.domainId} a fost actualizat!`,
      });
    } else {
      res.status(404).json({
        error: `Domeniul cu id-ul ${req.params.domainId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE - stergere domeniu
 */
application.delete("/domains/:domainId", async (req, res, next) => {
  try {
    const domain = await Domain.findByPk(req.params.domainId);
    if (domain) {
      await domain.destroy();
      res.status(200).json({
        message: `Domeniul cu id-ul ${req.params.domainId} a fost sters!`,
      });
    } else {
      res.status(404).json({
        error: `Domeniul cu id-ul ${req.params.domainId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = application;
