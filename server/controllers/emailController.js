const models = require('../models');
const Logger = require('../../tracer');
const FancyID = require('./fancyid');
const sendgrid = require('sendgrid');

function fetchUserEmails(req, res) {
  models.Email.findAll({
    where: { userId: req.params.id }
  })
    .then((emails) => {
      res.send({ emails });
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
      res.send({ error: 'Error fetching stakeholders emails' });
    });
}

module.exports = {
  listEmails(req, res) {
    return fetchUserEmails(req, res);
  },

  addEmail(req, res) {
    const emails = req.body.emails;
    if (!emails || !emails.length) {
      return res.send({ message: 'No Email to add' });
    }
    emails.forEach((email) => {
      const stakeholder = {
        id: FancyID(),
        email,
        userId: req.params.id
      };
      models.Email.findOne({ where: { email: email } })
        .then(mail => {
          if (mail && mail.userId === stakeholder.userId) {
            Logger.info(`Email exist already`);
          } else {
            models.Email.create(stakeholder)
              .then((record) => {
                Logger.info(`New email ${record.email} added.`);
              })
              .catch((err) => {
                Logger.error(`Error: ${err}`);
              });
          }
        });

    });
    return fetchUserEmails(req, res);
  },

  updateEmail(req, res) {
    models.Email.update(req.body, {
      where: { id: req.params.emailId }
    })
      .then(() => res.send({ message: 'Update successful' }))
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error adding repository' });
      });
  },

  removeEmail(req, res) {
    models.Email.destroy({
      where: { id: req.params.emailId }
    })
      .then(() => {
        fetchUserEmails(req, res);
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error deleting email' });
      });
  },

  sendEmails(userId, sender, report) {
    const helper = sendgrid.mail;
    const sg = sendgrid(process.env.SENDGRID_API_KEY);
    models.Email.findAll({
      where: { userId }
    })
      .then((emails) => {
        emails.forEach((email) => {
          const from = new helper.Email(sender);
          const to = new helper.Email(email.email);
          const subject = 'Product Updates';
          const content = new helper.Content('text/html', report);
          const mail = new helper.Mail(from, subject, to, content);
          const request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
          });

          sg.API(request, (err, reponse) => {
            if (err) {
              Logger.error(`Error: ${err.response.body.errors}`);
            }
          });
        });
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
      });
  }
};
