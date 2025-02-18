// routes/web.js
const { Router } = require('express');

const authController = require('../controllers/authController'); // Import authController

const { bookController } = require('../controllers/web/book/index.js');
const { dashboardController } = require('../controllers/web/dashboard/index.js');

const web = Router();

web.use(authController); // Route untuk autentikasi (register, login)
web.use('/books', bookController); // Route untuk buku (dengan prefix /books)
web.use('/', dashboardController)

web.get('/', (req, res) => {
  res.send("Halaman Utama"); // Ganti dengan render view yang sesuai
  // res.render('index'); // Jika ada
});

// webRouter.get('/profile', (req, res) => { // Anda belum punya middleware ensureAuthenticated
//   res.render('profile');
// });




module.exports = web;
