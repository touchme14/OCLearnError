// app.js
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const crypto = require('crypto');
const config = require('./config/config'); // Import config
const web = require('./routes/web'); // Import webRouter
const router = require('./cores/router')

const app = express();

// --- Session Middleware ---
const sessionSecret = crypto.randomBytes(64).toString('hex');
app.use(
  session({
    secret: config.secret, // Dari config.js
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // httpOnly: true
  })
);

// --- Body Parser, CSRF ---
app.use(bodyParser.urlencoded({ extended: false }));
const csrfProtection = csrf({ cookie: false }); // Karena pakai session
app.use(csrfProtection);

// --- Static Files, View Engine ---
app.use('/asset', express.static(path.join(__dirname, 'asset')));
 app.use('/assets', express.static(path.join(__dirname, 'views/assets'))); // Perbaiki path
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views')); // Path ke views

// --- CSRF Middleware ---
app.use(function (req, res, next) {
  console.log("1. Middleware CSRF - Sebelum req.csrfToken()");
  res.locals.csrfToken = req.csrfToken();
  console.log("2. Middleware CSRF - Setelah req.csrfToken(), token:", res.locals.csrfToken);
  next();
});

// --- Gunakan web ---
app.use(web); // SEMUA route sekarang di web

// --- Error Handling (di akhir) ---
app.use((req, res, next) => {
  res.status(404).send('Halaman tidak ditemukan.');
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log error lengkap
  res.status(500).send('Terjadi kesalahan pada server.');
});

// --- Start Server ---
const port = config.port;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});