import models from '../models';
import Logger from '../../tracer';
import FancyID from './fancyid';

function fetchUserRepos(req, res) {
  models.Repo.findAll({
    where: { userId: req.params.id }
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
    console.log('create');
    req.body.id = FancyID();
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

export default new RepoControllers();
