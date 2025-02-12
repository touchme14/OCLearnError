const { Router } = require('express')
const bookController = require('../controllers/web/book/index.js')

const web = Router()

web.use(`/book`, bookController)

module.exports = web