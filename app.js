const path = require('path')
const express = require('express')
const router = require('./cores/router')
const middleware = require('./cores/middleware')
const { port } = require('./config/config')

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, './views'))
app.use('/assets', express.static('./views/assets'))
middleware(express, app)
router(app)

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
  console.log('Press CTRL-C to stop')
})
