import models from '../models';
import Logger from '../../tracer';

function addNewUser(req) {
  const userReq = req.user._json;
  const user = {
    id: userReq.id.toString(),
    senderEmail: userReq.email
  };
  models.User.create(user)
    .then(() => {
      Logger.info('User created successfully');
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
    });
}

function editUser(req, res) {
  const user = req.body;
  models.User.update(req.body, {
    where: { id: req.user._json.id.toString() }
  })
    .then((user) => {
      if (res) {
        res.json(user);
      }
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
      if (res) {
        res.send({ error: 'Error fetching user data' });
      }
    });
}

class UserControllers {
  createUsers(req) {
    models.User.findOne({
      where: { id: req.user._json.id.toString() }
    })
      .then((user) => {
        if (!user) {
          return addNewUser(req);
        }
        req.body = {
          senderEmail: req.user._json.email
        }
        return editUser(req);
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
