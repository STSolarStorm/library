const {Author, Books, AuthorBooks} = require ('../models');

module.exports.viewAll = async function(req, res){
    const authors = await Author.findAll();
    res.render('author/view_all', {authors});
}

module.exports.viewProfile = async function(req, res){
    const author = await Author.findByPk(req.params.id, {
        include: 'books'
    });
    const books = await Books.findAll();
    let availableBooks = [];
    for (let i = 0; i < books.length; i++) {
        if(!authorHasBook(author, books[i])){
            availableBooks.push(books[i]);
        }
    }

    res.render('author/profile', {author, availableBooks});
}

module.exports.renderEditForm = async function(req, res){
    const author = await Author.findByPk(req.params.id);
    res.render('author/edit', {author});
}

module.exports.updateAuthor = async function(req, res){
    const author = await Author.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        num_of_books_written: req.body.num_of_books_written,
        image: req.body.image
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/author/profile/${req.params.id}`);
}

module.exports.renderAddForm = async function(req, res){
    const author = {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        num_of_books_written: 0,
        image: ''
    }
    res.render('author/add', {author});
}

module.exports.addAuthor = async function(req, res){
    const author = await Author.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        num_of_books_written: req.body.num_of_books_written,
        image: req.body.image
    });
    res.redirect(`/author/profile/${author.id}`);
}

module.exports.deleteAuthor = async function(req, res){
    await Author.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/author');
}


module.exports.assignBook = async function(req, res){
    await AuthorBooks.create({
        author_id: req.params.authorId,
        books_id: req.body.books
    });
    res.redirect(`/author/profile/${req.params.authorId}`);
}

module.exports.removeBook = async function(req, res){
    await AuthorBooks.destroy({
        where: {
            books_id: req.params.booksId,
            author_id: req.params.authorId
        }
    });
    res.redirect(`/author/profile/${req.params.authorId}`);
}

function authorHasBook(author, books){
    for (let i = 0; i<author.books.length; i++){
        if(books.id === author.books[i].id){
            return true
        }
    }
    return false
}

