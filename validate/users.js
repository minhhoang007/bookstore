const db = require("../db")

module.exports.postCreate = function(req, res, next){
    let errors = []
    if (!req.body.name) {
        errors.push("Name is required")
    }

    if (req.body.name.length > 10) {
        errors.push("Charactor must be under 10!")
    }
    
    const data = db.get("users").value()
    data.forEach((e) => {
        if (req.body.email === e.email) {
            errors.push("Email in use! try another one")
        }
    })

    if (errors.length) {
        res.render("users/create", { 
            errors,
            values: req.body
        })
        return
    }
    next()
}