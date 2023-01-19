const express = require('express');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

router.get('/projects', (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let size = parseInt(req.query.size) || 10;
    Project.find({}, (err, projects) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      let paginatedProjects = projects.slice((page - 1) * size, page * size);
      res.send(paginatedProjects);
    });
});

router.get('/project/:projectAddress', (req, res) => {
    const projectAddress = req.params.projectAddress;
    Project.findOne({ projectAddress }, (err, project) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      if (!project) {
        return res.status(404).send({ error: 'Project not found' });
      }
      res.send(project);
    });
  });
  
router.get('/projectStyle/:key', (req, res) => {
    const key = req.params.key;
    Project.findOne({ key }, (err, project) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      if (!project) {
        return res.status(404).send({ error: 'Project not found' });
      }
      res.send(project.style);
    });
});

router.patch('/updateProjectStyle', (req, res) => {
    const {key, style} = req.body;
    Project.findOne({ key }, (err, project) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      if (!project) {
        return res.status(404).send({ error: 'Project not found' });
      }
      project.style = style;
      project.save((err) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        res.send(project);
      });
    });
  });
  
  router.patch('/updateProject/:projectAddress', (req, res) => {
    const { email, discord, twitter, token, metricsWeight, holders, style, quests } = req.body;
    const projectAddress = req.params.projectAddress;
    Project.findOne({ projectAddress }, (err, project) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      if (!project) {
        return res.status(404).send({ error: 'Project not found' });
      }
      project.email = email;
      project.discord = discord;
      project.twitter = twitter;
      project.token = token;
      project.metricsWeight = metricsWeight;
      project.holders = holders;
      project.style = style;
      project.quests = quests;
      project.save((err) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        res.send(project);
      });
    });
  });
  
  router.get('/metricsWeight/:projectAddress', (req, res) => {
    const projectAddress = req.params.projectAddress;
    Project.findOne({ projectAddress }, (err, project) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      if (!project) {
        return res.status(404).send({ error: 'Project not found' });
      }
      res.send({ metricsWeight: project.metricsWeight });
    });
  });

  router.put('/updateMetricsWeight/:projectAddress', (req, res) => {
    const projectAddress = req.params.projectAddress;
    Project.findOne({ projectAddress }, (err, project) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      if (!project) {
        return res.status(404).send({ error: 'Project not found' });
      }
      project.metricsWeight = req.body.metricsWeight;
      project.save((err) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        res.send(project);
      });
    });
  });
  
  router.delete('/deleteProject/:id', (req, res) => {
    const id = req.params.id;
    Project.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send('An error occurred while trying to delete the project');
      } else {
        res.send('Project deleted successfully');
      }
    });
  });

module.exports = router;