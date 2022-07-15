// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");
const { QueryTypes, where } = require("sequelize");

// Import created models
const City = require("../models/city");
const University = require("../models/university");
const Faculty = require("../models/faculty");

application.get("/facultyName/:name/:id_univ", async (req, res, next) => {
  try {
    const regions = await sequelize.query(`SELECT * FROM faculties where nume='${req.params.name}' and id_universitate=${req.params.id_univ}`, { type: QueryTypes.SELECT });
    if (regions.length > 0) {
      res.json(regions);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

application.get("/facultyUnivCity", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `SELECT a.id, a.nume facultate, a.link, a.taxa_anuala, b.nume universitate, c.nume oras
    FROM faculties a, universities b, cities c
    WHERE a.id_universitate=b.id and a.id_oras=c.id order by c.nume, b.nume
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

application.get("/facultyUnivCity/:id", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `SELECT a.id, a.nume facultate, a.link, a.taxa_anuala, b.nume universitate, c.nume oras
      FROM faculties a, universities b, cities c
      WHERE a.id_universitate=b.id and a.id_oras=c.id and a.id=${req.params.id}`,
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

application.post("/facultyUnivCity", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `INSERT INTO faculties (nume, link, taxa_anuala, id_universitate, id_oras) VALUES ('${req.body.nume}','${req.body.link}', ${req.body.taxa_anuala}, ${req.body.id_universitate}, ${req.body.id_oras})`,
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

application.put("/facultyUnivCity/:id", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `UPDATE faculties set nume = '${req.body.nume}', link = '${req.body.link}', taxa_anuala = ${req.body.taxa_anuala}, id_universitate=${req.body.id_universitate}, id_oras=${req.body.id_oras} where id=${req.params.id}`,
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
 * GET - afisare facultati
 */
 application.get("/faculties", async (request, response, next) => {
  try {
    const movies = await Faculty.findAll();
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

application.get("/universities/:universityName/facultiesUniversities", async (req, res, next) => {
  try {
    const faculties = await sequelize.query(`SELECT * FROM facultiesUniversities where universitate='${req.params.universityName}'`, { type: QueryTypes.SELECT });
    if (faculties.length > 0) {
      res.json(faculties);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET - preluarea unei anumite facultati dintr-un anumit oras
 */
application.get(
  "/faculties/:facultyId",
  async (req, res, next) => {
    try {
      const faculty = await Faculty.findByPk(req.params.facultyId);
      if (faculty) {
        res.status(200).json(faculty);
      } else {
        res.status(404).json({
          error: `Facultatea cu id-ul ${req.params.facultyId} nu a fost gasit!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST - adaugare facultate in universitate si oras.
 */
application.post(
  "/universities/:universityId/cities/:cityId/faculties",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      const city = await City.findByPk(request.params.cityId);
      if (university && city) {
        const faculty = await Faculty.create(request.body);
        university.addFaculty(faculty);
        city.addFaculty(faculty);
        await university.save();
        await city.save();
        response.status(200).json(faculty);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT - actualizare facultate dintr-o universitate specificata
 */
application.put(
  "/cities/:cityId/universities/:universityId/faculties/:facultyId",
  async (req, res, next) => {
    try {
      const city = await City.findByPk(req.params.cityId);
      const university = await University.findByPk(req.params.universityId);
      if (university && city) {
        const faculties = await university.getFaculties({
          where: { id: req.params.facultyId },
        });
        const faculty = faculties.shift();
        if (faculty) {
          await faculty.update(req.body);
          res.status(200).json({
            message: `Facultatea cu id-ul ${req.params.facultyId} a fost actualizata!`,
          });
        } else {
          res.status(404).json({
            error: `Facultatea cu id-ul ${req.params.facultyId} nu a fost gasita!`,
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
 * PUT - actualizare facultate dintr-un oras specificat
 */
application.put(
  "/cities/:cityId/faculties/:facultyId",
  async (req, res, next) => {
    try {
      const city = await City.findByPk(req.params.cityId);
      if (city) {
        const faculties = await city.getFaculties({
          where: { id: req.params.facultyId },
        });
        const faculty = faculties.shift();
        if (faculty) {
          await faculty.update(req.body);
          res.status(200).json({
            message: `Facultatea cu id-ul ${req.params.facultyId} a fost actualizata!`,
          });
        } else {
          res.status(404).json({
            error: `Facultatea cu id-ul ${req.params.facultyId} nu a fost gasita!`,
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
 * DELETE - stergere facultate din universitate
 */
application.delete(
  "/universities/:universityId/faculties/:facultyId",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const faculties = await university.getFaculties({
          where: { id: request.params.facultyId },
        });
        const faculty = faculties.shift();
        if (faculty) {
          await faculty.destroy();
          response.status(200).json({
            message: `Facultatea cu id-ul ${request.params.facultyId} a fost stearsa!`,
          });
        } else {
          response.status(404).json({
            error: `Facultatea cu id-ul ${request.params.facultyId} nu a fost gasita!`,
          });
        }
      } else {
        response.status(404).json({
          error: `Facultatea cu id-ul ${request.params.facultyId} nu a fost gasita!`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE - stergere facultate din oras
 */
application.delete(
  "/cities/:cityId/faculties/:facultyId",
  async (request, response, next) => {
    try {
      const city = await City.findByPk(request.params.cityId);
      if (city) {
        const faculties = await city.getFaculties({
          where: { id: request.params.facultyId },
        });
        const faculty = faculties.shift();
        if (faculty) {
          await faculty.destroy();
          response.status(200).json({
            message: `Facultatea cu id-ul ${request.params.facultyId} a fost stearsa!`,
          });
        } else {
          response.status(404).json({
            error: `Facultatea cu id-ul ${request.params.facultyId} nu a fost gasita!`,
          });
        }
      } else {
        response.status(404).json({
          error: `Facultatea cu id-ul ${request.params.facultyId} nu a fost gasita!`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

application.delete("/facultyUnivCity/:id", async (req, res, next) => {
  try {
    const domain = await Faculty.findByPk(req.params.id);
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
