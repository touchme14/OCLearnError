const { Router } = require('express');
const listBook = require('./list');
const dashboard = require('./dashboard');

const bookController = Router();
bookController.use(listBook);

const dashboardController = Router();
dashboardController.use(dashboard);

module.exports.bookController = bookController;
module.exports.dashboardController = dashboardController;
