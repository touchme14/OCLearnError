const { Router } = require('express');
const dashboard = require('../dashboard/dashboard');

const dashboardController = Router();
dashboardController.use(dashboard);

module.exports.dashboardController = dashboardController;
