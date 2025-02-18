const { Router } = require('express');

const dashboard = Router();

dashboard.get('/', (req, res) => {
    res.render('pages/home/index', { title: 'Atlantis Lite Dashboard' });
});

module.exports = dashboard;
