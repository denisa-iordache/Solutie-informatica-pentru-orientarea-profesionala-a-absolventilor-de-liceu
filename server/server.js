"use strict";
// Express Initialisation
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
// const path = require('path')
const port = process.env.PORT || 8080;
const application = express();

application.use(cors({origin:true}))
// application.use(express.static(path.join(__dirname, 'build')))
application.use(bodyParser.json());

const dbRoutes = require('./routes/dbRoutes');
const userRoutes = require('./routes/userRoutes');
const regionRoutes = require('./routes/regionRoutes');
const cityRoutes = require('./routes/cityRoutes');
const universityRoutes = require('./routes/universityRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const specializationRoutes = require('./routes/specializationRoutes');
const domainRoutes = require('./routes/domainRoutes');
const branchOfScienceRoutes = require('./routes/branchOScienceRoutes');
const postSecondarySchoolRoutes = require('./routes/postSecondarySchoolRoutes');
const specializationTotalsRoutes = require('./routes/specializationTotalsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
// Express middleware
application.use(
  express.urlencoded({
    extended: true,
  })
);
application.use(express.json());

//application.use('', loginRoutes);
application.use('',dbRoutes);
application.use('',userRoutes);
application.use('',regionRoutes);
application.use('',cityRoutes);
application.use('',universityRoutes);
application.use('',facultyRoutes);
application.use('',specializationRoutes);
application.use('',domainRoutes);
application.use('',branchOfScienceRoutes);
application.use('',postSecondarySchoolRoutes);
application.use('',specializationTotalsRoutes);
application.use('',commentsRoutes);

// Kickstart the Express aplication
application.listen(port, () => {
  console.log(`The server is running on http://localhost: ${port}.`);
});

// Create a middleware to handle 500 status errors.
application.use((error, request, response, next) => {
  console.error(`[ERROR]: ${error}`);
  response.status(500).json(error);
});