const models = require('../models');
const Logger = require('../../tracer');

function fetchUserRepos(req, res) {
  models.Repo.findAll({
    where: { githubId: req.body.githubId }
  })
    .then((repos) => {
      res.send(repos);
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
      res.send({ error: 'Error fetching repositories.' });
    });
}

class RepoControllers {
  getRepo(req, res) {
    models.findOne({
      where: { githubId: req.body.githubId }
    })
      .then((repo) => {
        res.send(repo);
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error fetching repository' });
      });
  }

  listRepos(req, res) {
    return fetchUserRepos(req, res);
  }

  addRepo(req, res) {
    models.Repo.create(req.body)
      .then(() => fetchUserRepos(req, res))
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error adding repository' });
      });
  }

  updateRepo(req, res) {
    models.Repo.update(req.body, {
      where: { url: req.body.url }
    })
      .then(() => fetchUserRepos(req, res))
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error adding repository' });
      });
  }

  removeRepo(req, res) {
    models.Repo.destroy({
      where: { url: req.body.url }
    })
      .then(() => fetchUserRepos(req, res))
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error deleting repository' });
      });
  }
}

module.exports = new RepoControllers();
