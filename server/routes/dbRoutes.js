// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");

// Import created models
const Region = require("../models/region");
const City = require("../models/city");
const University = require("../models/university");
const Faculty = require("../models/faculty");
const Specialization = require("../models/specialization");
const Domain = require("../models/domain");
const BranchOfScience = require("../models/branchOfScience");
const User = require("../models/user");
const Comment = require("../models/comment");
const SpecializationTotal = require("../models/specializationsTotal");
// const UserType = require("../models/userType");

// Define entities relationship
Region.hasMany(City, { foreignKey: "id_regiune" });
University.hasMany(Faculty, { foreignKey: "id_universitate" });
City.hasMany(Faculty, { foreignKey: "id_oras" });
Faculty.hasMany(Specialization, { foreignKey: "id_facultate" });
Domain.hasMany(BranchOfScience, { foreignKey: "id_domeniu" });
BranchOfScience.hasMany(Specialization, { foreignKey: "id_ramura" });
SpecializationTotal.hasMany(Comment, { foreignKey: "id_specializare" });
// User.hasMany(Comment, { foreignKey: "id_utilizator" });
// UserType.hasMany(User, { foreignKey: "id_userType" });

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
application.get("/create", async (request, response, next) => {
  try {
    await sequelize.sync({ force: true });
    response.sendStatus(204).json({ message: "Baza de date a fost creata" });
  } catch (error) {
    next(error);
  }
});

application.get("/update", async (req, res, next) => {
  try {
    await sequelize.sync({ alter: true });
    res.status(201).json({ message: "Baza de date actualizata." });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
module.exports = application;
