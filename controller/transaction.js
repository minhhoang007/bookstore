const shortid = require('shortid')
const db = require("../db")

let errors = []
module.exports.index = ((req, res) => {
 
  const myBook = db.get("transactions").value().filter((e) => {
    return e.userID === req.signedCookies.userId
  })
  
  res.render("transaction/show.ejs", {
    transactions: myBook
  })
})

module.exports.getCreate = ((req, res) => {
  res.render("transaction/create.ejs", { 
    users: db.get("users").value() ,
    books: db.get("books").value() ,
    errors
  })
})

module.exports.postCreate = ((req, res) => {
    req.body.id = shortid.generate()
    db.get("transactions").push(req.body).write()
    res.redirect('/transaction')
})


module.exports.delete = ((req, res) => {
  const id = req.params.id

    db.get('transactions').remove({ id }).write()
    res.redirect('/transaction')
})