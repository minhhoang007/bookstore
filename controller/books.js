const shortid = require('shortid')
const db = require("../db")

const errors = []

module.exports.index = ((req, res) => {
    const page = parseInt(req.query.page) || 1

    const perPage = 8

    const start = (page - 1) * perPage
    const end = page * perPage

    res.render("index", { books: db.get("books").slice(start, end).value(),
     user: req.user, page })
})

module.exports.getCreate = ((req, res) => {
    let cookie = req.cookies
    console.log(cookie);
    res.render("create", { values: req.body, errors })
})

module.exports.postCreate = ((req, res) => {
    req.body.id = shortid.generate()

    db.get("books").push(req.body).write()
    res.redirect('/')
  })

module.exports.view = ((req, res) => {
    const id = req.params.id
    console.log(id)
  
    const books = db.get("books").find({ id }).value()
    console.log(books );
    res.render("view", {
        books: books
    })
})


module.exports.delete = ((req, res) => {
    const id = req.params.id

    db.get('books').remove({ id }).write()
    res.redirect('/')
    
})

module.exports.getEdit = ((req, res) => {
    const id = req.params.id
    const books = db.get("books").find({ id }).value()
    res.render('edit', { books })
})

module.exports.postEdit = ((req, res) => {
    const id = req.params.id
    db.get('books').find({ id }).assign( req.body ).write()
    res.redirect("/")
})