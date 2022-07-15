const sequelize = require("../sqlite/sequelize");
const { DataTypes } = require("sequelize");

const SpecializationsTotal = sequelize.define("specializationsTotal", {
  id_s: {
    type: DataTypes.INTEGER,
  },
  id_f: {
    type: DataTypes.INTEGER,
  },
  id_u: {
    type: DataTypes.INTEGER,
  },
  id_ra: {
    type: DataTypes.INTEGER,
  },
  id_d: {
    type: DataTypes.INTEGER,
  },
  id_re: {
    type: DataTypes.INTEGER,
  },
  id_o: {
    type: DataTypes.INTEGER,
  },
  specializare: {
    type: DataTypes.TEXT,
  },
  facultate: {
    type: DataTypes.TEXT,
  },
  universitate: {
    type: DataTypes.TEXT,
  },
  numar_locuri_buget: {
    type: DataTypes.INTEGER,
  },
  numar_locuri_taxa: {
    type: DataTypes.INTEGER,
  },
  ultima_medie_buget: {
    type: DataTypes.REAL,
  },
  ultima_medie_taxa: {
    type: DataTypes.REAL,
  }
  ,
  taxa_anuala: {
    type: DataTypes.REAL,
  },
  link: {
    type: DataTypes.TEXT,
  },
  statut: {
    type: DataTypes.TEXT,
  },
  ramura: {
    type: DataTypes.TEXT,
  },
  domeniu: {
    type: DataTypes.TEXT,
  },
  oras: {
    type: DataTypes.TEXT,
  },
  regiune: {
    type: DataTypes.TEXT,
  }
});

module.exports = SpecializationsTotal;
