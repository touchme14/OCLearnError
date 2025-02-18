const { Router } = require('express')
const { bookController } = require('../controllers/web/book/index.js');
const { dashboardController } = require('../controllers/web/book/index.js');

const web = Router()

web.use(`/book`, bookController)

web.use('/', dashboardController)

module.exports = web