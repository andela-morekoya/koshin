import models from '../models';
import Logger from '../../tracer';

function fetchUserEmails(req, res) {
  models.Email.findAll({
    where: { githubId: req.body.githubId }
  })
    .then((emails) => {
      res.send({ emails });
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
      res.send({ error: 'Error fetching stakeholders emails' });
    });
}

class EmailsControllers {
  listEmails(req, res) {
    return fetchUserEmails(req, res);
  }

  addEmail(req, res) {
    const emails = req.body.emails;
    emails.forEach((email) => {
      const stakeholder = {
        email,
        githubId: req.body.githubId
      };
      models.Email.create(stakeholder)
        .then((record) => {
          Logger.info(`New email ${record.email} added.`);
        })
        .catch((err) => {
          Logger.error(`Error: ${err}`);
          res.send({ error: 'Error adding email' });
        });
    });
    return fetchUserEmails(req, res);
  }

  updateEmail(req, res) {
    models.Email.update(req.body, {
      where: { id: req.body.emailId }
    })
      .then(() => fetchUserEmails(req, res))
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error adding repository' });
      });
  }

  removeEmail(req, res) {
    models.Email.destroy({
      where: { email: req.body.email }
    })
      .then(() => {
        fetchUserEmails(req, res);
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error deleting email' });
      });
  }
}

export default new EmailsControllers();
