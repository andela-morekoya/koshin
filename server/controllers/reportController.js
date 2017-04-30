const models = require('../models');
const Logger = require('../../tracer');
const FancyID = require('./fancyid');
const EmailController = require('./emailController.js');
const RepoController = require('./repoController.js');

function fetchUserReports(req, res) {
  models.Report.findAll({
    where: { githubId: req.body.githubId }
  })
    .then((reports) => {
      res.send({ reports });
    })
    .catch((err) => {
      Logger.error(`Error: ${err}`);
      res.send({ error: 'Error fetching user reports' });
    });
}

const ReportsControllers = {
  listReports(req, res) {
    return fetchUserReports(req, res);
  },

  addReport(req, res) {
    req.body.id = FancyID();
    models.Report.create(req.body)
      .then((report) => {
        EmailController.sendEmails(req.params.id, req.body.sender, report.report)
        res.send({ success: 'Report added succeessfully' });
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error adding report' });
      });
  },

  removeReport(req, res) {
    models.Report.destroy({
      where: { id: req.body.id }
    })
      .then(() => {
        fetchUserReports(req, res);
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Error deleting report' });
      });
  }
}

module.exports = ReportsControllers;
