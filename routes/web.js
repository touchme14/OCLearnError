const { Router } = require('express')
const bookController = require('../controllers/web/book/index.js')

const web = Router()

web.use(`/book`, bookController)

web.get('/', (req, res) => {
    res.render('pages/home', { title: 'Atlantis Lite Dashboard' });
});

web.get('/pembayaran', (req, res) => {
    res.render('pages/pembayaran', { title: 'Atlantis Lite Dashboard' });
});

web.get('/manajemenUsers', (req, res) => {
    res.render('pages/manajemenUsers', { title: 'Atlantis Lite Dashboard' });
});

web.get('/kategoriKelas', (req, res) => {
    res.render('pages/kategoriKelas', { title: 'Atlantis Lite Dashboard' });
});

web.get('/bahasa', (req, res) => {
    res.render('pages/master_data/bahasa', { title: 'Atlantis Lite Dashboard' });
});

web.get('/metodePembayaran', (req, res) => {
    res.render('pages/master_data/metodePembayaran', { title: 'Atlantis Lite Dashboard' });
});

web.get('/kelas', (req, res) => {
    res.render('pages/kelas', { title: 'Atlantis Lite Dashboard' });
});

web.get('/setting', (req, res) => {
    res.render('pages/setting', { title: 'Atlantis Lite Dashboard' });
});

module.exports = web