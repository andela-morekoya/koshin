const models = require('../models');
const Logger = require('../../tracer');

function addNewUser(req, res) {
  models.User.create(req.body)
    .then(() => {
      models.Repo.findAll({
        where: { githubId: req.body.githubId }
      })
        .then((repos) => {
          const user = req.body;
          user.repos = repos;
          res.send(user);
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.send({ error: 'Error fetching user repo' });
        });
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
      res.send({ error: 'Error creating new user' });
    });
}

function fetchUser(req, res) {
  const user = req.body;
  models.User.update(req.body, {
    where: { githubId: req.body.githubId }
  })
    .then(() => {
      models.Repo.findAll({
        where: { userId: req.body.githubId }
      })
        .then((repos) => {
          user.repos = repos;
          res.json(user);
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.send({ error: 'Error fetching user data' });
        });
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
      res.send({ error: 'Error updating user data' });
    });
}

class UserControllers {
  createUsers(req, res) {
    models.User.findOne({
      where: { githubId: req.githubId }
    })
      .then((user) => {
        if (!user) {
          return addNewUser(req, res);
        }
        return fetchUser(req, res);
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error processing user data' });
      });
  }

  updateUser(req, res) {
    models.User.update(req.body, {
      where: { githubId: req.body.githubId }
    })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
      });
  }
}

module.exports = new UserControllers();
