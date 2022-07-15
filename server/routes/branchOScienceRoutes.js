// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");
const { QueryTypes, where } = require("sequelize");

// Import created models
const Domain = require("../models/domain");
const BranchOfScience = require("../models/branchOfScience");

application.get("/branchName/:name", async (req, res, next) => {
  try {
    const regions = await sequelize.query(`SELECT * FROM branchOfSciences where nume='${req.params.name}'`, { type: QueryTypes.SELECT });
    if (regions.length > 0) {
      res.json(regions);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

application.get("/branchesDomain", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `SELECT a.id, a.nume ramura, b.nume domeniu
    FROM branchOfSciences a, domains b
    WHERE a.id_domeniu=b.id order by b.nume
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

application.get("/branchesDomain/:id", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `SELECT a.id, a.nume ramura, b.nume domeniu
      FROM branchOfSciences a, domains b
      WHERE a.id_domeniu=b.id and a.id=${req.params.id}`,
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

application.post("/branchesDomain", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `INSERT INTO branchOfSciences (nume, id_domeniu) VALUES ('${req.body.nume}', ${req.body.id_domeniu})`,
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

application.put("/branchesDomain/:id", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `UPDATE branchOfSciences set nume = '${req.body.nume}', id_domeniu=${req.body.id_domeniu} where id=${req.params.id}`,
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

/**
 * GET - afisare ramuri pentru un domeniu specificat
 */
application.get("/branches", async (request, response, next) => {
  try {
    const movies = await BranchOfScience.findAll();
    if (movies.length > 0) {
      //response.sendStatus(200).json(movies);
      response.json(movies);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET - preluarea unei anumite ramuri dintr-un anumit domeniu
 */
application.get("/branchesOfScience/:branchOfScienceId", async (req, res, next) => {
  try {
    const branch = await BranchOfScience.findByPk(req.params.branchOfScienceId);
    if (branch) {
      res.status(200).json(branch);
    } else {
      res.status(404).json({
        error: `Universitatea cu id-ul ${req.params.branchOfScienceId} nu a fost gasita!`,
      });
    }
  } catch (err) {
    next(err);
  }
});

application.get("/domains/:domainName/branchesDomains", async (req, res, next) => {
  try {
    const branches = await sequelize.query(`SELECT * FROM branchesDomains where domeniu='${req.params.domainName}'`, { type: QueryTypes.SELECT });
    if (branches.length > 0) {
      res.json(branches);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST - adaugare ramura la domeniu.
 */
application.post(
  "/domains/:domainId/branchesOfScience",
  async (request, response, next) => {
    try {
      const domain = await Domain.findByPk(request.params.domainId);
      if (domain) {
        const branchOfScience = await BranchOfScience.create(request.body);
        domain.addBranchOfScience(branchOfScience);
        await domain.save();
        response.status(200).json(branchOfScience);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT - actualizare ramura dintr-un domeniu specificat
 */
application.put(
  "/domains/:domainId/branchesOfScience/:branchOfScienceId",
  async (req, res, next) => {
    try {
      const domain = await Domain.findByPk(req.params.domainId);
      if (domain) {
        const branchesOfScience = await domain.getBranchOfSciences({
          where: { id: req.params.branchOfScienceId },
        });
        const branchOfScience = branchesOfScience.shift();
        if (branchOfScience) {
          await branchOfScience.update(req.body);
          res.status(200).json({
            message: `Ramura cu id-ul ${req.params.branchOfScienceId} a fost actualizata!`,
          });
        } else {
          res.status(404).json({
            error: `Ramura cu id-ul ${req.params.branchOfScienceId} nu a fost gasita!`,
          });
        }
      } else {
        response.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE - stergere ramura din domeniu
 */
// application.delete(
//   "/domains/:domainId/branchesOfScience/:branchOfScienceId",
//   async (request, response, next) => {
//     try {
//       const domain = await Domain.findByPk(request.params.domainId);
//       if (domain) {
//         const branchesOfScience = await domain.getBranchOfSciences({
//           where: { id: request.params.branchOfScienceId },
//         });
//         const branchOfScience = branchesOfScience.shift();
//         if (branchOfScience) {
//           await branchOfScience.destroy();
//           response.status(200).json({
//             message: `Ramura cu id-ul ${request.params.branchOfScienceId} a fost stearsa!`,
//           });
//         } else {
//           response.status(404).json({
//             error: `Ramura cu id-ul ${request.params.branchOfScienceId} nu a fost gasita!`,
//           });
//         }
//       } else {
//         response.status(404).json({
//           error: `Ramura cu id-ul ${request.params.branchOfScienceId} nu a fost gasita!`,
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

application.delete("/branches/:id", async (req, res, next) => {
  try {
    const domain = await BranchOfScience.findByPk(req.params.id);
    if (domain) {
      await domain.destroy();
      res.status(200).json({
        message: `Domeniul cu id-ul ${req.params.id} a fost sters!`,
      });
    } else {
      res.status(404).json({
        error: `Domeniul cu id-ul ${req.params.id} nu a fost gasit!`,
      });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = application;
