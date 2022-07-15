// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");
const { QueryTypes, where } = require("sequelize");

// Import created models
const SpecializationsTotal = require("../models/specializationsTotal");

/**
 * GET - afisare lista specializari complete.
 */
//Operație GET pentru prima entitate - 0.3
// application.get("/specializationsTotal", async (request, response, next) => {
//   try {
//     const specializations = await sequelize.query("SELECT * FROM specializationsTotals", { type: QueryTypes.SELECT });
//     if (specializations.length > 0) {
//       response.json(specializations);
//     } else {
//       response.sendStatus(204);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

application.get("/specializationsTotal", async (request, response, next) => {
  try {
    const Op = require("sequelize").Op;
    const query = {};
    let pageSize = 20;

    const allowedFilters = [
      "specializare",
      "facultate",
      "universitate",
      "domeniu",
      "ramura",
      "regiune",
      "oras",
      "numar_locuri_buget",
      "numar_locuri_taxa",
      "ultima_medie_buget",
      "ultima_medie_taxa",
      "taxa_anuala",
    ];
    const filterKeys = Object.keys(request.query).filter(
      (e) => allowedFilters.indexOf(e) !== -1
    );
    if (filterKeys.length > 0) {
      query.where = {};
      for (const key of filterKeys) {
        if (isNaN(request.query[key]) || request.query[key]==="") {
          query.where[key] = {
            [Op.like]: `%${request.query[key]}%`,
          };
        } else {
          query.where[key] = {
            [Op.lt]: parseFloat(request.query[key]),
          };
        }
      }
    }

    const sortField = request.query.sortField;
    let sortOrder = "ASC";
    if (request.query.sortOrder && request.query.sortOrder === "-1") {
      sortOrder = "DESC";
    }

    if (request.query.pageSize) {
      pageSize = parseInt(request.query.pageSize);
    }

    if (sortField) {
      query.order = [[sortField, sortOrder]];
    }

    if (!isNaN(parseInt(request.query.page))) {
      query.limit = pageSize; //->limit
      query.offset = pageSize * parseInt(request.query.page); //->skip
    }

    const records = await SpecializationsTotal.findAll(query);
    const count = await SpecializationsTotal.count();
    response.status(200).json({ records, count });
  } catch (e) {
    console.warn(e);
    response.status(500).json({ message: "server error" });
  }
});

application.get(
  "/specializationsTotal/:regiune",
  async (request, response, next) => {
    try {
      const query = {};
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { regiune: request.params.regiune };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: { regiune: request.params.regiune }
      });
      response.status(200).json({ records, count });
    } catch (e) {
      console.warn(e);
      response.status(500).json({ message: "server error" });
    }
  }
);

application.get("/specializationsTotals/:id", async (req, res, next) => {
  try {
    const specialization = await SpecializationsTotal.findByPk(req.params.id);
    if (specialization) {
      res.status(200).json(specialization);
    } else {
      res.status(404).json({
        error: `Domeniul cu id-ul ${req.params.id} nu a fost gasit!`,
      });
    }
  } catch (err) {
    next(err);
  }
});

application.get(
  "/specializationsTotalOras/:oras",
  async (request, response, next) => {
    try {
      const query = {};
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { oras: request.params.oras };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: { oras: request.params.oras }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalUniversitate/:universitate",
  async (request, response, next) => {
    try {
      const query = {};
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { universitate: request.params.universitate };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: { universitate: request.params.universitate }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalFacultate/:facultate",
  async (request, response, next) => {
    try {
      const query = {};
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { facultate: request.params.facultate };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: { facultate: request.params.facultate }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalDomeniu/:domeniu",
  async (request, response, next) => {
    try {
      const query = {};
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { domeniu: request.params.domeniu };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: { domeniu: request.params.domeniu }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalRamura/:ramura",
  async (request, response, next) => {
    try {
      const query = {};
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { ramura: request.params.ramura };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: { ramura: request.params.ramura }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalRamuraQuiz/:ramura",
  async (request, response, next) => {
    try {
      const specializations = await sequelize.query(
        `SELECT * FROM specializationsTotals where ramura='${request.params.ramura}'`,
        { type: QueryTypes.SELECT }
      );
      if (specializations.length > 0) {
        response.json(specializations);
      } else {
        response.sendStatus(204);
      }
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalStatut/:statut",
  async (request, response, next) => {
    try {
      const query = {};
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { statut: request.params.statut };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: { statut: request.params.statut }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalLB/:lb",
  async (request, response, next) => {
    try {
      const query = {};
      const Op = require("sequelize").Op;
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { numar_locuri_buget: {
        [Op.lt]: request.params.lb
      } };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: {numar_locuri_buget: {
          [Op.lt]: request.params.lb
        } }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalLT/:lt",
  async (request, response, next) => {
    try {
      const query = {};
      const Op = require("sequelize").Op;
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { numar_locuri_taxa: {
        [Op.lt]: request.params.lt
      } };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: {numar_locuri_taxa: {
          [Op.lt]: request.params.lt
        } }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalUMB/:umb",
  async (request, response, next) => {
    try {
      const query = {};
      const Op = require("sequelize").Op;
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { ultima_medie_buget: {
        [Op.lt]: request.params.umb
      } };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: {ultima_medie_buget: {
          [Op.lt]: request.params.umb
        } }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalUMT/:umt",
  async (request, response, next) => {
    try {
      const query = {};
      const Op = require("sequelize").Op;
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { ultima_medie_taxa: {
        [Op.lt]: request.params.umt
      } };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: {ultima_medie_taxa: {
          [Op.lt]: request.params.umt
        } }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalTA/:ta",
  async (request, response, next) => {
    try {
      const query = {};
      const Op = require("sequelize").Op;
      let pageSize = 20;

      if (request.query.pageSize) {
        pageSize = parseInt(request.query.pageSize);
      }

      if (!isNaN(parseInt(request.query.page))) {
        query.limit = pageSize; //->limit
        query.offset = pageSize * parseInt(request.query.page); //->skip
      }

      query.where = { taxa_anuala: {
        [Op.lt]: request.params.ta
      } };

      const records = await SpecializationsTotal.findAll(query);
      const count = await SpecializationsTotal.count({
        where: {taxa_anuala: {
          [Op.lt]: request.params.ta
        } }
      });
      response.status(200).json({ records, count });
    } catch (error) {
      next(error);
    }
  }
);

application.get(
  "/specializationsTotalRamuraSomeFields/:ramura1/:ramura2/:ramura3/:ramura4?/:ramura5?",
  async (request, response, next) => {
    try {
      const specializations = await sequelize.query(
        `SELECT specializare, facultate, universitate, ramura, domeniu, oras, regiune, link, statut, numar_locuri_buget, numar_locuri_taxa, ultima_medie_buget, ultima_medie_taxa, taxa_anuala FROM specializationsTotals where ramura in ('${request.params.ramura1}', '${request.params.ramura2}', '${request.params.ramura3}','${request.params.ramura4}','${request.params.ramura5}') ORDER BY ramura ASC, oras`,
        { type: QueryTypes.SELECT }
      );
      if (specializations.length > 0) {
        response.json(specializations);
      } else {
        response.sendStatus(204);
      }
    } catch (error) {
      next(error);
    }
  }
);

// application.get("/specializationsTotals/:regiune?/:oras?/:universitate?/:facultate?/:domeniu?/:ramura?", async (request, response, next) => {
//   try {
//     const specializations = await sequelize.query(`SELECT * FROM specializationsTotals where regiune='${request.params.regiune}
//     or oras='${request.params.oras} or universitate='${request.params.universitate} or facultate='${request.params.facultate} or domeniu='${request.params.domeniu} or ramura='${request.params.ramura}'`, { type: QueryTypes.SELECT });
//     if (specializations.length > 0) {
//       response.json(specializations);
//     } else {
//       response.sendStatus(204);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = application;
