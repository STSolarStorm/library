const {Mangaka, Manga, MangakaManga} = require('../models');


module.exports.viewAll = async function(req, res){
    const mangakas = await Mangaka.findAll();
    res.render('mangaka/view_all', {mangakas});
}

module.exports.viewProfile = async function(req, res){
    const mangaka = await Mangaka.findByPk(req.params.id, {
        include: 'manga'
    });
    const manga = await Manga.findAll();
    let availableManga = [];
    for(let i = 0; i<manga.length; i++){
        if(!mangakaHasManga(mangaka, manga[i])){
            availableManga.push(manga[i]);
        }
    }
    res.render('mangaka/profile', {mangaka, availableManga});
}

module.exports.renderEditForm = async function(req, res){
    const mangaka = await Mangaka.findByPk(req.params.id);
    res.render('mangaka/edit', {mangaka});
}

module.exports.updateMangaka = async function(req, res){
    const mangaka = await Mangaka.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        num_of_books: req.body.num_of_books,
        image: req.body.image
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/mangaka/profile/${req.params.id}`);
}

module.exports.renderAddForm = async function(req, res){
    const mangaka = {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        num_of_books: '',
        image: ''
    }
    res.render('mangaka/add', {mangaka});
}

module.exports.addMangaka = async function(req, res){
    const mangaka = await Mangaka.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        num_of_books: req.body.num_of_books,
        image: req.body.image
    });
    res.redirect(`/mangaka/profile/${mangaka.id}`);
}


module.exports.deleteMangaka = async function(req, res){
    await Mangaka.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/mangaka');
}

module.exports.assignManga = async function(req, res){
    await MangakaManga.create({
        mangaka_id: req.params.mangakaId,
        manga_id: req.body.manga
    });
    res.redirect(`/mangaka/profile/${req.params.mangakaId}`);
}

module.exports.removeManga = async function(req, res){
    await MangakaManga.destroy({
        where: {
            manga_id: req.params.mangaId,
            mangaka_id: req.params.mangakaId
        }
    });
    res.redirect(`/mangaka/profile/${req.params.mangakaId}`);
}

function mangakaHasManga(mangaka, manga){
    for (let i = 0; i<mangaka.manga.length; i++){
        if(manga.id === mangaka.manga[i].id){
            return true
        }
    }
    return false
}
