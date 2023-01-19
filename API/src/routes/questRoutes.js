const express = require('express');
const mongoose = require('mongoose');
const Quest = mongoose.model('Quest');
const Project = mongoose.model('Project');
const router = express.Router();

router.post('/addQuest', async (req, res) => {
    const {projectAddress, title, description, tweetId, type, start, end} = req.body;
    try {
      const quest = new Quest({projectAddress, title, description, tweetId, type, start, end});
      Project.findOne({projectAddress}, (err, project) => {
        if (err) {
          res.status(500).send('An error occurred while trying to find the project');
        } else {
          project.quests.push(quest);
          project.save((err) => {
            if (err) {

              res.status(500).send('An error occurred while trying to save the project with the new quest');
            }
          });
        }
      });
      await quest.save();
      res.send({quest});
    } catch (e) {
      res.status(422).send(e.message);
    }

  });
  
  router.get('/quest/:id', (req, res) => {
    const id = req.params.id;
    Quest.findById(id, (err, quest) => {
      if (err) {
        res.status(500).send('An error occurred while trying to retrieve the quest');
      } else {
        res.send(quest);
      }
    });
  });

  router.get('/quests/:projectAddress', (req, res) => {
    const projectAddress = req.params.projectAddress;
  
    Quest.find({ projectAddress }, (err, quests) => {
      if (err) {
        res.status(500).send('An error occurred while trying to retrieve the quests');
      } else {
        res.send(quests);
      }
    });
  });

  router.delete('/deleteQuest/:id', (req, res) => {
    const id = req.params.id;
    let projectAddress = '';

    Quest.findById(id, (err, quest) => {
      if (err) {
        res.status(500).send('An error occurred while trying to retrieve the quests');
      } else {
        projectAddress = quest.projectAddress;

        Project.findOne({ projectAddress }, async (err, project) => {
          if (err) {
            return res.status(500).send({ error: err });
          }
          if (!project) {
            return res.status(404).send({ error: 'Project not found' });
          }
          const index = project.quests.findIndex(q => q._id.toString() === id);

          if (index === -1) {
            res.status(404).send({ message: 'Quest not found' });
        } else {
            project.quests.splice(index, 1); // Delete the quest from project
            await project.save();

            // Delete the quest
            Quest.findByIdAndDelete(id, (err) => {
              if (err) {
                res.status(500).send('An error occurred while trying to delete the quest');
              } else {
                res.send('Quest deleted successfully');
              }
            });
        }
        });
      }
    });
  });
  

module.exports = router;