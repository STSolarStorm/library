const {Books, Author, AuthorBooks} = require ('../models');
const genres = ["Children's Literature", 'Picture Book', 'Comedy', 'Fiction', 'Sci-Fi', 'Historical Fiction', 'Non-Fiction', 'Poetry', 'Biography', 'Horror', 'Thriller', 'Graphic Novel', 'Mystery'];

module.exports.viewAll = async function(req, res){
    const books = await Books.findAll();
    res.render('book/view_all', {books});
}

module.exports.viewProfile = async function(req, res){
    const book = await Books.findByPk(req.params.id, {
        include: 'author'
    });
    const authors = await Author.findAll();
    let unassignedAuthor = [];
    for(let i = 0; i<authors.length; i++){
        if(!bookHasAuthor(book, authors[i])){
            unassignedAuthor.push(authors[i]);
        }
    }
    res.render('book/profile', {book, unassignedAuthor});
}

module.exports.renderEditForm = async function(req, res){
    const book = await Books.findByPk(req.params.id);
    res.render('book/edit', {book, genres});
}

module.exports.updateBook = async function(req, res){
    const book = await Books.update({
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        num_of_pages: req.body.num_of_pages,
        image_of_cover: req.body.image_of_cover,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/books/profile/${req.params.id}`);
}

module.exports.renderAddForm = async function(req, res){
    const book = {
        title: '',
        publisher: '',
        genre: genres[0],
        num_of_pages: '',
        image_of_cover: '',
        description: ''
    }
    res.render('book/add', {book, genres});
}

module.exports.addBook = async function(req, res){
    const book = await Books.create({
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        num_of_pages: req.body.num_of_pages,
        image_of_cover: req.body.image_of_cover,
        description: req.body.description
    });
    res.redirect(`/books/profile/${book.id}`);
}


module.exports.deleteBook = async function(req, res){
    await Books.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/books');
}

module.exports.assignAuthor = async function(req, res){
    await AuthorBooks.create({
        books_id: req.params.booksId,
        author_id: req.body.author
    });
    res.redirect(`/books/profile/${req.params.booksId}`);
}

module.exports.removeAuthor = async function(req, res){
    await AuthorBooks.destroy({
        where: {
            books_id: req.params.booksId,
            author_id: req.params.authorId
        }
    });
    res.redirect(`/books/profile/${req.params.booksId}`);
}

function bookHasAuthor(books, author){
    for (let i = 0; i<books.author.length; i++){
        if(author.id === books.author[i].id){
            return true
        }
    }
    return false
}
