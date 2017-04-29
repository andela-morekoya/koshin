import models from '../models';
import Logger from '../../tracer';

function addNewUser(req, res) {
  const userReq = req.user._json;
  const user = {
    id: userReq.id.toString()
  };
  if (userReq.email) {
    user.senderEmail = userReq.email;
  }
  models.User.create(user)
    .then((data) => {
      Logger.info('User created successfully');
      res.send({ github: req.user._json, local: data });
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
    });
}

function getUser(req, res) {
  models.User.findOne({
    where: { id: req.user.id.toString() }
  })
    .then((user) => {
      res.send({ github: req.user._json, local: user });
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
    });
}

function updateOrgs(req, res, orgs) {
  models.User.findOne({
    where: { id: req.params.id }
  }).then((user) => {
    user.organisations.push(orgs);
    user.update({
      organisations: user.organisations
    }, {
        where: { id: req.params.id }
      }).then((result) => {
        res.send({ github: req.user._json, local: result });
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
      });
  })
    .catch((error) => {
      Logger.error(`Error: ${error}`);
    });
}

function editUser(req, res) {
  let orgs;
  if (req.body.organisations) {
    orgs = req.body.organisations;
    delete req.body.organisations;
  }

  models.User.update(req.body, {
    where: { id: req.params.id }
  })
    .then((user) => {
      if (orgs) {
        return updateOrgs(req, res, orgs)
      }
      return getUser(req, res);
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
      if (res) {
        res.send({ error: 'Error fetching user data' });
      }
    });
}

class UserControllers {
  createUsers(req, res) {
    models.User.findOne({
      where: { id: req.user._json.id.toString() }
    })
      .then((user) => {
        if (!user) {
          return addNewUser(req, res);
        }
        req.body = {
          senderEmail: req.user._json.email
        }
        return editUser(req, res);
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
      });
  }

  updateUser(req, res) {
    editUser(req, res);
  }
}

export default new UserControllers();

