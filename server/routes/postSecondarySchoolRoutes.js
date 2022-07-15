// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");

// Import created models
const City = require("../models/city");
const PostSecondarySchool = require("../models/postSecondarySchool");

/**
 * GET - afisare scoli postliceale pentru un oras specificat
 */
application.get(
  "/cities/:cityId/postSchools",
  async (request, response, next) => {
    try {
      const Op = require("sequelize").Op;
      const query = {};
      let pageSize = 2;
      const allowedFilters = ["denumire_postSecondarySchool"];
      const filterKeys = Object.keys(request.query).filter(
        (e) => allowedFilters.indexOf(e) !== -1
      );
      if (filterKeys.length > 0) {
        query.where = {};
        for (const key of filterKeys) {
          //if (isNaN(request.query[key]) == true) {
          query.where[key] = {
            [Op.like]: `%${request.query[key]}%`,
          };
          //}
        }
      }

      //const sortField = request.query.sortField;
      const sortField = "denumire_postSecondarySchool";
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
      const city = await City.findByPk(request.params.cityId);
      if (city) {
        const records = await city.getPostSecondarySchools(query);
        const count = records.length;
        if (records.length > 0) {
          response.status(200).json({ records, count });
        } else {
          response.sendStatus(204);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (e) {
      console.warn(e);
      response.status(500).json({ message: "server error" });
    }
    // try {
    //   const city = await City.findByPk(request.params.cityId);
    //   if (city) {
    //     const records = await city.getPostSecondarySchools();
    //     if (records.length > 0) {
    //       response.status(200).json({ records });
    //       //response.json(records);
    //     } else {
    //       response.sendStatus(204);
    //     }
    //   } else {
    //     response.sendStatus(404);
    //   }
    // } catch (error) {
    //   next(error);
    // }
  }
);

/**
 * GET - preluarea unei anumite scoli postliceale dintr-un anumit oras
 */
application.get(
  "/cities/:cityId/postSchools/:postSchoolId",
  async (req, res, next) => {
    try {
      const city = await City.findByPk(req.params.cityId);
      if (city) {
        const postSchools = await city.getPostSecondarySchools({
          where: { id: req.params.postSchoolId },
        });
        const postSchool = postSchools.shift();
        if (postSchool) {
          res.status(200).json(postSchool);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.status(404).json({
          error: `Scoala postliceala cu id-ul ${req.params.postSchoolId} nu a fost gasita!`,
        });
      }
    } catch (err) {
      next(error);
    }
  }
);

/**
 * POST - adaugare scoala postliceale in oras.
 */
application.post(
  "/cities/:cityId/postSchools",
  async (request, response, next) => {
    try {
      const city = await City.findByPk(request.params.cityId);
      if (city) {
        const postSchool = await PostSecondarySchool.create(request.body);
        city.addPostSecondarySchool(postSchool);
        await city.save();
        response.status(200).json(postSchool);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT - actualizare scoala postliceale dintr-un oras specificat
 */
application.put(
  "/cities/:cityId/postSchools/:postSchoolId",
  async (req, res, next) => {
    try {
      const city = await City.findByPk(req.params.cityId);
      if (city) {
        const postSchools = await city.getPostSecondarySchools({
          where: { id: req.params.postSchoolId },
        });
        const postSchool = postSchools.shift();
        if (postSchool) {
          await postSchool.update(req.body);
          res.status(200).json({
            message: `Scoala postliceala cu id-ul ${req.params.postSchoolId} a fost actualizata!`,
          });
        } else {
          res.status(404).json({
            error: `Scoala postliceala cu id-ul ${req.params.postSchoolId} nu a fost gasita!`,
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
 * DELETE - stergere scoala postliceale din oras
 */
application.delete(
  "/cities/:cityId/postSchools/:postSchoolId",
  async (request, response, next) => {
    try {
      const city = await City.findByPk(request.params.cityId);
      if (city) {
        const postSchools = await city.getPostSecondarySchools({
          where: { id: request.params.postSchoolId },
        });
        const postSchool = postSchools.shift();
        if (postSchool) {
          await postSchool.destroy();
          response.status(200).json({
            message: `Scoala postliceala cu id-ul ${request.params.postSchoolId} a fost stearsa!`,
          });
        } else {
          response.status(404).json({
            error: `Scoala postliceala cu id-ul ${request.params.postSchoolId} nu a fost gasita!`,
          });
        }
      } else {
        response.status(404).json({
          error: `Scoala postliceala cu id-ul ${request.params.postSchoolId} nu a fost gasita!`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);
module.exports = application;
