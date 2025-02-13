// controllers/authController.js
const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import model User

const authController = Router();

authController.get('/register', (req, res) => {
  console.log("GET /register - Sebelum res.render");
  res.render('pages/register', { error: null }); // Perbaiki path ke view
  console.log("GET /register - Setelah res.render");
});

authController.post('/register', async (req, res) => {
  console.log("POST /register - Menerima data:", req.body);
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      console.log("POST /register - Validasi gagal: data kosong");
      return res.render('pages/register', { error: 'Semua kolom harus diisi.' }); // Perbaiki path
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      console.log("POST /register - Validasi gagal: email sudah ada");
      return res.render('pages/register', { error: 'Email sudah terdaftar.' });// Perbaiki path
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("POST /register - Password di-hash");

    const newUser = await User.create({
      full_name: full_name,
      email: email,
      password: hashedPassword,
    });
    console.log("POST /register - User berhasil dibuat:", newUser.toJSON());

    // res.redirect('/login'); // Hapus redirect untuk debugging
    res.status(200).send("OK"); // Kirim respons OK

  } catch (error) {
    console.error("Error in POST /register:", error);
    res.status(500).send('Terjadi kesalahan saat mendaftar.');
  }
});

authController.get('/login', (req, res) => {
  console.log("GET /login - Sebelum res.render");
  res.render('pages/login', { error: null }); // Perbaiki path
  console.log("GET /login - Setelah res.render");
});

authController.post('/login', async (req, res) => {
  console.log("POST /login - Menerima data:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("POST /login - Validasi gagal: data kosong");
    return res.render('pages/login', { error: 'Semua kolom harus diisi.' }); // Perbaiki path
  }

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      console.log("POST /login - User tidak ditemukan");
      return res.render('pages/login', { error: 'Email atau password salah.' }); // Perbaiki path
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("POST /login - Password tidak cocok");
      return res.render('pages/login', { error: 'Email atau password salah.' }); // Perbaiki path
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    };
    console.log("POST /login - Login berhasil, session:", req.session);

    res.redirect('/'); // Redirect setelah login berhasil
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send('Terjadi kesalahan saat login.');
  }
});
 authController.get('/logout', (req,res) => {
     req.session.destroy((err) => {
         if(err){
             console.error('error logout', err);
             res.status(500).send('Terjadi Kesalahan saat logout')
         } else {
             res.redirect('/login')
         }
     });
 });

module.exports = authController;