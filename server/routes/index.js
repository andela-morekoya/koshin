const express = require('express');
const userController = require('../controllers/userController');
const repoController = require('../controllers/repoController');
const emailController = require('../controllers/emailController');
const reportController = require('../controllers/reportController');

const route = express.Router();

route.put('/:id', (req, res) => {
  userController.updateUser(req, res);
});

route.get('/:id/repos', (req, res) => {
  repoController.listRepos(req, res);
});

route.get('/:id/repos/:repoId', (req, res) => {
  repoController.getRepo(req, res);
});

route.put('/:id/repos/:repoId', (req, res) => {
  repoController.updateRepo(req, res);
});

route.post('/:id/repos', (req, res) => {
  repoController.addRepo(req, res);
});

route.delete('/:id/repos/:repoId', (req, res) => {
  emailController.removeRepo(req, res);
});

route.get('/:id/emails', (req, res) => {
  emailController.listEmails(req, res);
});

route.put('/:id/emails/:emailId', (req, res) => {
  emailController.updateEmail(req, res);
});

route.post('/:id/emails', (req, res) => {
  emailController.addEmail(req, res);
});

route.delete('/:id/emails/:emailId', (req, res) => {
  emailController.removeEmail(req, res);
});

route.get('/:id/reports', (req, res) => {
  reportController.listReports(req, res);
});

route.post('/:id/report', (req, res) => {
  reportController.addReport(req, res);
});

route.delete('/:id/reports/:reportId', (req, res) => {
  reportController.removeReport(req, res);
});

module.exports = route;
