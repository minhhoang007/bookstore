const bcrypt = require("bcrypt")
const db = require("../db")
const { sendWarningLogin } = require("../emails/account")

module.exports.login = function(req, res) {
    let values = []
    let errors = []
    res.render("auth/login", { values, errors })
}

module.exports.postLogin = function(req, res) {
    const email = req.body.email
    const password = req.body.password

    const user = db.get("users").find( {email} ).value()

    if (!user) {
        res.render("auth/login", {
            errors: ["User does not exsit."],
            values: req.body
        })
        return
    } else {
        bcrypt.compare(password, user.password, function(err, result) {
            if (result === true) {
                res.cookie("userId", user.id, {signed: true})
                res.redirect("/users")
                console.log(req.user);
            } else {
               
                let time = Number(user.wrongLogin)
                if ( time < 3) {
                   
                    res.render("auth/login", {
                        errors : [ `Wrong password. Your account will be block after ${3 - time } time`],
                        values: req.body
                    })
                    user.wrongLogin++
        
            
                } else {
                    sendWarningLogin(user.email, user.name)
                    res.render("auth/block", {
                        errors : [ "Your account has been block"],
                        values: req.body
                    })
                }
            }

        });
    }


}