const db = require("../db")

module.exports.postTransaction = function(req, res, next) {
    let errors = []
    const data = db.get("transactions").value()
    data.forEach((e) => {
        if (req.body.userID === e.userID && req.body.bookID === e.bookID) {
            errors.push("You have rented this book already!")
            return
        }
        
    })
    
    if (errors.length > 0) {
        res.render("transaction/create", { 
            errors,
            users: db.get("users").value() ,
            books: db.get("books").value()  
        })
        return
    }

    next()
}