const mongoose = require('mongoose')


const Transaction = mongoose.model('Transaction', {
    UserID: {
        type: String,
        required: true,
        trim: true
    },
    BookID: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Transaction