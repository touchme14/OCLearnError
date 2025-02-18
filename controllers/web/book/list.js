const { Router } = require('express')
const response = require('../../../cores/response')
const BookService = require('../../../services/bookService')

const listBook = Router()

listBook.get('/detail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const bookDetail = await BookService.getDetailById(id)
        res.render('pages/book', {bookDetail})
    } catch (error) {
        response.notFound(res, 'Data Tidak Ditemukan')
    }
})

const dashboard = Router()

dashboard.get('/', (req, res) => {
    res.render('pages/home/index', { title: 'Atlantis Lite Dashboard' });
});

module.exports = listBook, dashboard;
