module.exports.postCreate = function(req, res, next) {
    let errors = []
    if (!req.body.title) {
        errors.push("Title is required")
    }
    if (!req.body.description) {
        errors.push("description is required")
    }

    if (errors.length) {
        res.render("create", { 
            errors,
            values: req.body
        })
        return
    }
    next()
}