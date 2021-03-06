const bcrypt = require("bcrypt")
const shortid = require('shortid')
const db = require("../db")
const {sendWelcomeEmail} = require("../emails/account")

const saltRounds  = 10

module.exports.index = ((req, res) => {
    const user  = []
    res.render("./users/show.ejs", { users: db.get("users").value(), user })
})

module.exports.getCreate = ((req, res) => {
    let errors = []
    res.render("./users/create.ejs", { 
        values: req.body,
        users: db.get("users").value() ,
        errors
    })
})

module.exports.postCreate = ((req, res) => {
    
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        sendWelcomeEmail(req.body.email, req.body.name)
        
        db.get("users").push({ 
            name: req.body.name, 
            email: req.body.email,
            password: hash,
            id:  req.body.id = shortid.generate(),
            wrongLogin: 0,
            avatar:  !req.file ? "uploads\\c5664dada7819d91647c490275cf2b36" : req.file.path.split("\\").slice(1).join("\\")
        }).write()
    res.redirect('/users')
    });
    
  })

module.exports.view = ((req, res) => {
    const id = req.params.id

    const users = db.get("users").find({ id }).value()

    res.render("./users/view.ejs", {
        users
    })
})

module.exports.getEdit = ((req, res) => {
    const id = req.params.id
    const users = db.get("users").find({ id }).value()
    res.render('./users/edit.ejs', { users })
})

module.exports.postEdit = ((req, res) => {
    const id = req.params.id
    db.get('users').find({ id }).assign( req.body ).write()
    res.redirect("/users")
})

module.exports.delete = ((req, res) => {
    const id = req.params.id

    db.get('users').remove({ id }).write()
    res.redirect('/users')
    
})

