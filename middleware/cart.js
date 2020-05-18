// const shortId = require("shortid")
// const db = require("../db")
// const _ = require("lodash")

// module.exports = (req, res, next) => {
//     const sessionId = shortId.generate()
//     if(!req.signedCookies.sessionId) {
//         res.cookie("sessionId", sessionId, {
//             signed: true
//         })
//         db.get("sessions").push({
//             id: sessionId
//         }).write()
//     }
//     const cartId = req.signedCookies.sessionId
//     const find = db.get("sessions").find({id : cartId}).value();

//     let quantity = 0;
//     _.forEach(find.cart, (value) => {
//         return (quantity += value);
//     });
    
//     console.log("this is quantity", quantity);
//     res.locals.quantity = quantity
   
//     next()
// }