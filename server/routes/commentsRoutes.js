// Express Initialisation
const express = require("express");
const application = express();

// Sequelize Initialisation
const sequelize = require("../sqlite/sequelize");
const { QueryTypes, where } = require("sequelize");
const nodemailer = require("nodemailer");

// Import created models
const Comment = require("../models/comment");
const SpecializationsTotal = require("../models/specializationsTotal");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nodemailerpopescu@gmail.com",
    pass: "jlxkaeovgkowlzvc",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * GET - afisare specializari pentru ramura specificata.
 */
application.get("/comments", async (request, response, next) => {
  try {
    const comments = await sequelize.query(
      `SELECT a.id, a.continut, a.data, a.autor, a.parinte, a.status, b.specializare
      FROM comments a, specializationsTotals b
      WHERE a.id_specializare=b.id order by a.status desc, a.parinte`,
      { type: QueryTypes.SELECT }
    );
    if (comments.length > 0) {
      response.json(comments);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET - afisare specializari pentru ramura specificata.
 */
application.get(
  "/specialization/:specializationId/comments",
  async (request, response, next) => {
    try {
      const specializations = await sequelize.query(
        `SELECT * FROM comments where id_specializare=${request.params.specializationId} and status="Aprobat"`,
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
  "/specialization/:specializationId/parent/:parentId/comments",
  async (request, response, next) => {
    try {
      const specializations = await sequelize.query(
        `SELECT * FROM comments where id_specializare=${request.params.specializationId} and status="Aprobat" and parinte=${request.params.parentId} `,
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

/**
 * POST - adaugare specializare la facultate.
 */
application.post(
  "/specialization/:specializationId/comments",
  async (request, response, next) => {
    try {
      const specialization = await SpecializationsTotal.findByPk(
        request.params.specializationId
      );
      // const user = await User.findByPk(
      //   request.params.userId
      // );
      if (specialization) {
        const comment = await Comment.create(request.body);
        specialization.addComment(comment);
        await specialization.save();

        // user.addComment(comment);
        // await user.save();
        response.status(200).json(comment);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT - actualizare universitate
 */
application.put("/comments/:commentId", async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (comment) {
      await comment.update(req.body);
      res.status(200).json({
        message: `Comentariul cu id-ul ${req.params.commentId} a fost actualizat!`,
      });

      let mailOptions = {
        from: "denisaiordache550@gmail.com",
        to: comment.autor,
        subject: "Comentariul tau pe site-ul Univercity4U",
        text: "Iti multumim pentru contributia ta pe site! Comentariul tau a fost postat.",
      };
      transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent successfully!");
        }
      });
    } else {
      res.status(404).json({
        error: `Comentariul cu id-ul ${req.params.commentId} nu a fost gasit!`,
      });
    }
  } catch (err) {
    next(err);
  }
});

application.delete("/comments/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      await comment.destroy();
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
