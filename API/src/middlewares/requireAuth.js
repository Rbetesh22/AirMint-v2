const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const Project = mongoose.model("Project");
require("dotenv").config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === 'Bearer fashnjaurneae334fvdsfdas'

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");
  jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const { projectId } = payload;
    const project = await Project.findById(projectId);
    req.project = project;

    next();
  });
};
