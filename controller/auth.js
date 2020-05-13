const bcrypt = require("bcrypt")
const db = require("../db")

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
                console.log("trc", user.wrongLogin);
               
                let time = Number(user.wrongLogin)
                console.log("sau", time);
                if ( time < 3) {
                   
                    res.render("auth/login", {
                        errors : [ `Wrong password. Your account will be block after ${3 - time } time`],
                        values: req.body
                    })
                    user.wrongLogin++
                    console.log("t2", time);
            
                } else {
                    res.render("auth/login", {
                        errors : [ "Your account has been block"],
                        values: req.body
                    })
                }
            }

        });
    }


}