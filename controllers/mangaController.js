const {Manga, Mangaka, MangakaManga} = require('../models');
const genres = ['Shōnen', 'Seinen', 'Fantasy', 'Action', 'Adventure', 'Mystery', 'Horror', 'Comedy', 'Martial Arts'];

module.exports.viewAll = async function(req, res){
    const mangas = await Manga.findAll();
    res.render('manga/view_all', {mangas});
}

module.exports.viewProfile = async function(req, res){
    const manga = await Manga.findByPk(req.params.id, {
        include: 'mangaka'
    });
    const mangaka = await Mangaka.findAll();
    let unassignedMangaka = [];
    for(let i = 0; i<mangaka.length; i++){
        if(!mangaHasMangaka(manga, mangaka[i])){
            unassignedMangaka.push(mangaka[i]);
        }
    }
    res.render('manga/profile', {manga, unassignedMangaka});
}

module.exports.renderEditForm = async function(req, res){
    const manga = await Manga.findByPk(req.params.id);
    res.render('manga/edit', {manga, genres});
}

module.exports.updateManga = async function(req, res){
    const manga = await Manga.update({
        title: req.body.title,
        publisher_magazine: req.body.publisher_magazine,
        genre: req.body.genre,
        num_of_chapters: req.body.num_of_chapters,
        num_of_volumes: req.body.num_of_volumes,
        image: req.body.image,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/manga/profile/${req.params.id}`);
}

module.exports.renderAddForm = async function(req, res){
    const manga = {
        title: '',
        publisher_magazine: '',
        genre: genres[0],
        num_of_chapters: '',
        num_of_volumes: '',
        image: '',
        description: ''
    }
    res.render('manga/add', {manga, genres});
}

module.exports.addManga = async function(req, res){
    const manga = await Manga.create({
        title: req.body.title,
        publisher_magazine: req.body.publisher_magazine,
        genre: req.body.genre,
        num_of_chapters: req.body.num_of_chapters,
        num_of_volumes: req.body.num_of_volumes,
        image: req.body.image,
        description: req.body.description
    });
    res.redirect(`/manga/profile/${manga.id}`);
}


module.exports.deleteManga = async function(req, res){
    await Manga.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/manga');
}

module.exports.assignMangaka = async function(req, res){
    await MangakaManga.create({
        manga_id: req.params.mangaId,
        mangaka_id: req.body.mangaka
    });
    res.redirect(`/manga/profile/${req.params.mangaId}`);
}

module.exports.removeMangaka = async function(req, res){
    await MangakaManga.destroy({
        where: {
            manga_id: req.params.mangaId,
            mangaka_id: req.params.mangakaId
        }
    });
    res.redirect(`/manga/profile/${req.params.mangaId}`);
}

function mangaHasMangaka(manga, mangaka){
    for (let i = 0; i<manga.mangaka.length; i++){
        if(mangaka.id === manga.mangaka[i].id){
            return true
        }
    }
    return false
}
