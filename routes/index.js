var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const mangaController = require('../controllers/mangaController');
const mangakaController = require('../controllers/mangakaController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/books', bookController.viewAll);
router.get('/books/profile/:id', bookController.viewProfile);
router.get('/books/edit/:id', bookController.renderEditForm);
router.post('/books/edit/:id', bookController.updateBook);
router.get('/books/add', bookController.renderAddForm);
router.post('/books/add', bookController.addBook);
router.get('/books/delete/:id', bookController.deleteBook);


router.get('/author', authorController.viewAll);
router.get('/author/profile/:id', authorController.viewProfile);
router.get('/author/edit/:id', authorController.renderEditForm);
router.post('/author/edit/:id', authorController.updateAuthor);
router.get('/author/add', authorController.renderAddForm);
router.post('/author/add', authorController.addAuthor);
router.get('/author/delete/:id', authorController.deleteAuthor);


router.post('/books/:booksId/assign/', bookController.assignAuthor);
router.get('/books/:booksId/removeAuthor/:authorId', bookController.removeAuthor);
router.post('/author/:authorId/assign/', authorController.assignBook);
router.get('/author/:authorId/removeBooks/:booksId', authorController.removeBook);



router.get('/manga', mangaController.viewAll);
router.get('/manga/profile/:id', mangaController.viewProfile);
router.get('/manga/edit/:id', mangaController.renderEditForm);
router.post('/manga/edit/:id', mangaController.updateManga);
router.get('/manga/add', mangaController.renderAddForm);
router.post('/manga/add', mangaController.addManga);
router.get('/manga/delete/:id', mangaController.deleteManga);


router.get('/mangaka', mangakaController.viewAll);
router.get('/mangaka/profile/:id', mangakaController.viewProfile);
router.get('/mangaka/edit/:id', mangakaController.renderEditForm);
router.post('/mangaka/edit/:id', mangakaController.updateMangaka);
router.get('/mangaka/add', mangakaController.renderAddForm);
router.post('/mangaka/add', mangakaController.addMangaka);
router.get('/mangaka/delete/:id', mangakaController.deleteMangaka);


router.post('/manga/:mangaId/assign/', mangaController.assignMangaka);
router.get('/manga/:mangaId/removeMangaka/:mangaId', mangaController.removeMangaka);
router.post('/mangaka/:mangakaId/assign/', mangakaController.assignManga);
router.get('/mangaka/:mangakaId/removeManga/:mangaId', mangakaController.removeManga);





module.exports = router;
