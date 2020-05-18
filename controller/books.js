
const Book = require("../models/books")

const errors = []

module.exports.index =  async (req, res) => {
    try {
        const books = await Book.find({})
        res.render("index", { books})
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports.getCreate = ((req, res) => {
    
    res.render("create", { values: req.body, errors })
})

module.exports.postCreate =  async (req, res) => {
    const book = new Book(req.body)

    try {
        await book.save()
        res.status(201).redirect("/")
    } catch (e) {
        console.log(e);
        res.status(400).render("create")
    }
}

module.exports.view = async (req, res) => {
    const _id = req.params.id

    const books = await Book.findById({ _id })
    console.log(books);

    res.render("view", {
        books: books
    })
}


module.exports.delete = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)

        if (!book) {
            return res.status(404).redirect("back")
        }

        res.redirect('/')
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports.getEdit = async (req, res) => {
    const _id = req.params.id
    const books = await Book.find({ _id })
    const errors = []
    res.render('edit', { books, errors })
}

module.exports.postEdit =  async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body,
             { new: true, runValidators: true })

        if (!book) {
            return res.status(404).redirect("back")
        }

        res.redirect("/")
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
}