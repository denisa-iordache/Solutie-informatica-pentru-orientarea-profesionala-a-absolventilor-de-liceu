// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");
const { QueryTypes, where } = require("sequelize");

// Import created models
const Faculty = require("../models/faculty");
const Specialization = require("../models/specialization");
const BranchOfScience = require("../models/branchOfScience");

application.get("/specializationsFacRam", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `SELECT a.id, a.nume specializare, a.numar_locuri_buget, a.numar_locuri_taxa, a.ultima_medie_buget, a.ultima_medie_taxa, b.nume facultate, c.nume universitate, d.nume ramura
    FROM specializations a, faculties b, universities c, branchOfSciences d
    WHERE a.id_facultate=b.id and b.id_universitate=c.id and a.id_ramura=d.id order by c.nume, b.nume, a.nume
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

application.get("/specializationsFacRam/:id", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `SELECT a.id, a.nume specializare, a.numar_locuri_buget, a.numar_locuri_taxa, a.ultima_medie_buget, a.ultima_medie_taxa, b.nume facultate, c.nume universitate, d.nume ramura
      FROM specializations a, faculties b, universities c, branchOfSciences d
      WHERE a.id_facultate=b.id and b.id_universitate=c.id and a.id_ramura=d.id and a.id=${req.params.id}`,
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

application.post("/specializationsFacRam", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `INSERT INTO specializations (nume, numar_locuri_buget, numar_locuri_taxa, ultima_medie_buget, ultima_medie_taxa, id_facultate, id_Ramura) VALUES ('${req.body.nume}',${req.body.numar_locuri_buget}, ${req.body.numar_locuri_taxa}, ${req.body.ultima_medie_buget}, ${req.body.ultima_medie_taxa}, ${req.body.id_facultate}, ${req.body.id_ramura})`,
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

application.put("/specializationsFacRam/:id", async (req, res, next) => {
  try {
    const counties = await sequelize.query(
      `UPDATE specializations set nume = '${req.body.nume}', numar_locuri_buget = ${req.body.numar_locuri_buget}, numar_locuri_taxa = ${req.body.numar_locuri_taxa}, ultima_medie_buget = ${req.body.ultima_medie_buget},ultima_medie_taxa = ${req.body.ultima_medie_taxa}, id_facultate=${req.body.id_facultate}, id_ramura=${req.body.id_ramura} where id=${req.params.id}`,
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

application.delete("/specializationsFacRam/:id", async (req, res, next) => {
  try {
    const domain = await Specialization.findByPk(req.params.id);
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

/**
 * GET - afisare lista toate specializarile.
 */
application.get("/specializations", async (request, response, next) => {
  try {
    const specializations = await Specialization.findAll();
    if (specializations.length > 0) {
      response.json(specializations);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});
/**
 * POST - adaugare specializare la facultate.
 */
application.post(
  "/faculties/:facultyId/branches/:branchId/specializations",
  async (request, response, next) => {
    try {
      const faculty = await Faculty.findByPk(request.params.facultyId);
      const branch = await BranchOfScience.findByPk(request.params.branchId);
      if (faculty && branch) {
        const specialization = await Specialization.create(request.body);
        faculty.addSpecialization(specialization);
        branch.addSpecialization(specialization);
        await faculty.save();
        await branch.save();
        response.status(200).json(specialization);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT - actualizare specializare pentru o facultate specificata
 */
application.put(
  "/faculties/:facultyId/specializations/:specializationId",
  async (req, res, next) => {
    try {
      const faculty = await Faculty.findByPk(req.params.facultyId);
      if (faculty) {
        const specializations = await faculty.getSpecializations({
          where: { id: req.params.specializationId },
        });
        const specialization = specializations.shift();
        if (specialization) {
          await specialization.update(req.body);
          res.status(200).json({
            message: `Specializarea cu id-ul ${req.params.specializationId} a fost actualizata!`,
          });
        } else {
          res.status(404).json({
            error: `Specializarea cu id-ul ${req.params.specializationId} nu a fost gasita!`,
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
 * PUT - actualizare specializare pentru o ramura specificata
 */
application.put(
  "/branches/:branchId/specializations/:specializationId",
  async (req, res, next) => {
    try {
      const branch = await BranchOfScience.findByPk(req.params.branchId);
      if (branch) {
        const specializations = await branch.getSpecializations({
          where: { id: req.params.specializationId },
        });
        const specialization = specializations.shift();
        if (specialization) {
          await specialization.update(req.body);
          res.status(200).json({
            message: `Specializarea cu id-ul ${req.params.specializationId} a fost actualizata!`,
          });
        } else {
          res.status(404).json({
            error: `Specializarea cu id-ul ${req.params.specializationId} nu a fost gasita!`,
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
 * DELETE - stergere specializare din facultate
 */
application.delete(
  "/faculties/:facultyId/specializations/:specializationId",
  async (request, response, next) => {
    try {
      const faculty = await Faculty.findByPk(request.params.facultyId);
      if (faculty) {
        const specializations = await faculty.getSpecializations({
          where: { id: request.params.specializationId },
        });
        const specialization = specializations.shift();
        if (specialization) {
          await specialization.destroy();
          response.status(200).json({
            message: `Specializarea cu id-ul ${request.params.specializationId} a fost stearsa!`,
          });
        } else {
          response.status(404).json({
            error: `Specializarea cu id-ul ${request.params.specializationId} nu a fost gasita!`,
          });
        }
      } else {
        response.status(404).json({
          error: `Specializarea cu id-ul ${request.params.specializationId} nu a fost gasita!`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE - stergere specializare din ramura
 */
application.delete(
  "/branches/:branchId/specializations/:specializationId",
  async (request, response, next) => {
    try {
      const branch = await BranchOfScience.findByPk(request.params.branchId);
      if (branch) {
        const specializations = await branch.getSpecializations({
          where: { id: request.params.specializationId },
        });
        const specialization = specializations.shift();
        if (specialization) {
          await specialization.destroy();
          response.status(200).json({
            message: `Specializarea cu id-ul ${request.params.specializationId} a fost stearsa!`,
          });
        } else {
          response.status(404).json({
            error: `Specializarea cu id-ul ${request.params.specializationId} nu a fost gasita!`,
          });
        }
      } else {
        response.status(404).json({
          error: `Specializarea cu id-ul ${request.params.specializationId} nu a fost gasita!`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);
module.exports = application;
