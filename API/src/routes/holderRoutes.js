const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Holder = mongoose.model('Holder');
const Project = mongoose.model('Project');

const router = express.Router();


router.post('/addHolder', async (req, res) => {
    const {
      privyId, 
      email,
      twitterUsername, 
      pfpURL, 
      username, 
      projectAddress, 
      twitterURL,
      discord, 
      wallet, 
      scores
    } = req.body;

    if(!privyId) {
        return res
        .status(422)
        .send({ error: 'You must provide user id'})
    }

    const holder = new Holder({
      privyId, 
      twitterUsername, 
      pfpURL, 
      twitterURL, 
      username, 
      email, 
      discord, 
      wallet, 
      scores
    });

    Project.findOne({ projectAddress }, (err, project) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        if (!project) {
          return res.status(404).send({ error: 'Project not found' });
        }
        project.holders.push(holder);
        project.save((err) => {
          if (err) {
            return res.status(500).send({ error: err });
          }
          res.send(holder);
        });
    });

    await holder.save();
});

router.get('/holder/:id', async (req, res) => {
    const id = req.params.id;
    const holder = await Holder.findById(id)
    if (!holder) {
      return res.status(404).send({ error: 'Holder not found' });
    }
    res.send(holder);
});

router.get('/holders', (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let size = parseInt(req.query.size) || 10;

    Holder.find({}, (err, holders) => {
      if (err) {
        return res.status(500).send({ error: err });
      }

      let paginatedHolders = holders.slice((page - 1) * size, page * size);

      res.send(paginatedHolders);
    });
});  

router.patch('/updateHolder', (req, res) => { //only project founders and our script
    const privyId = req.body.privyId;
    Holder.findOne({ privyId }, (err, holder) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      if (!holder) {
        return res.status(404).send({ error: 'Holder not found' });
      }
      holder.email = req.body.email;
      holder.wallet = req.body.wallet;
      holder.pfpURL = req.body.pfpURL;
      holder.username = req.body.username;
      holder.scores = req.body.scores;
      holder.save((err) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        res.send(holder);
      });
    });
});

router.get('/getScore/:privyId', (req, res) => {
    const { privyId } = req.params;
    Holder.findOne({ privyId }, (err, holder) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        if (!holder) {
          return res.status(404).send({ message: 'Holder not found' });
        }
        if (holder) {
        res.send(holder.scores);
        } else {
        res.status(404).send({ message: 'Holder not found' });
        }
  });
});

router.patch('/updateScore', (req, res) => {
    const {privyId, projectAddress, score} = req.body;
    Holder.findOne({ privyId }, async (err, holder) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        if (!holder) {
          return res.status(404).send({ error: 'Holder not found' });
        }
        if (holder) {
            console.log(holder.scores)
        const index = holder.scores.findIndex(s => s.projectAddress.toString() === projectAddress);
        if (index === -1) {
            res.status(404).send({ message: 'Project not found' });
        } else {
            holder.scores[index].currentScore = score;
            holder.scores[index].scoreHistory.push({
              timestamp: Date.now(),
              score: score
            });
        }
        await holder.save();
        res.send(holder);
        } else {
        res.status(404).send({ message: 'Holder not found' });
        }
    });
});

router.get('/getProjectHolders/:projectAddress', (req, res) => {
    const projectAddress = req.params.projectAddress;
    Project.findOne({ projectAddress }, (err, project) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      if (!project) {
        return res.status(404).send({ error: 'Project not found' });
      }
      res.send(project.holders);
    });
  });
  
  // Query the database for all holder models that have a twitterUsername field included in the given array
  router.get('/holders/:twitterUsername', (req, res) => {
    const twitterUsername = req.params.twitterUsername;
  
    Holder.findOne({ twitterUsername }, (err, holders) => {
      if (err) {
        res.status(500).send('An error occurred while trying to retrieve the holders');
      } else {
        res.send(holders);
      }
    });
  });

module.exports = router;