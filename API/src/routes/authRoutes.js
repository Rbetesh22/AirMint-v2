const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const Project = mongoose.model("Project");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { projectName, email, password, projectAddress, discord, twitter } =
    req.body;

  try {
    const buffer = crypto.randomBytes(32);
    const key = buffer.toString("base64");
    const project = new Project({
      projectName,
      email,
      password,
      projectAddress,
      discord,
      twitter,
      key,
    });

    const token = jsonwebtoken.sign(
      { projectId: project._id },
      "MY_SECRET_KEY"
    );
    await project.save();
    res.send({ project, token });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const project = await Project.findOne({ email });

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  if (!project) {
    return res.status(404).send({ error: "Invalid password or email." });
  }

  try {
    await project.comparePassword(password);
    const token = jsonwebtoken.sign(
      { projectId: project._id },
      "MY_SECRET_KEY"
    );
    res.send({ project, token });
  } catch (e) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
});

router.get("/checkJWT", (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({
      error: "No token provided",
    });
  }
  const token = authorization.replace("Bearer ", "");
  jsonwebtoken.verify(token, "MY_SECRET_KEY", (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: "Invalid token",
      });
    }

    return res.send({
      valid: true,
    });
  });
});

module.exports = router;
